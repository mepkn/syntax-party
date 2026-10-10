import { ConvexError, v } from "convex/values";
import { mutation, query, type MutationCtx } from "./_generated/server";
import type { Doc, Id } from "./_generated/dataModel";
import { vLanguage, type LanguageId } from "./lib/languages";
import { MAX_CODE_LENGTH, MAX_NOTE_LENGTH, MAX_REVISIONS } from "./lib/limits";
import { requireEditor } from "./lib/requireEditor";
import { optionalText } from "./lib/text";

/**
 * Every snippet in one language. The client subscribes once per selected language,
 * so each language is cached on its own and an edit only re-sends that language.
 */
export const forLanguage = query({
  args: { lang: vLanguage },
  handler: async (ctx, { lang }) => {
    const rows = await ctx.db
      .query("snippets")
      .withIndex("by_lang", (q) => q.eq("lang", lang))
      .collect();
    return rows.map((s) => ({
      _id: s._id,
      featureId: s.featureId,
      code: s.code,
      note: s.note,
      na: s.na,
      updatedAt: s.updatedAt,
    }));
  },
});

/** Past versions of a snippet, newest first. Editors only. */
export const history = query({
  args: { snippetId: v.id("snippets") },
  handler: async (ctx, { snippetId }) => {
    await requireEditor(ctx);
    const rows = await ctx.db
      .query("revisions")
      .withIndex("by_snippet", (q) => q.eq("snippetId", snippetId))
      .order("desc")
      .collect();
    return rows.map((r) => ({
      _id: r._id,
      _creationTime: r._creationTime,
      code: r.code,
      note: r.note,
      na: r.na,
      editedBy: r.editedBy,
    }));
  },
});

/**
 * Creates or updates the snippet for (feature, lang).
 *
 * `baseUpdatedAt` is the `updatedAt` the editor started from (null for a new snippet).
 * If someone saved in between, the save is refused with "conflict" unless `force`.
 */
export const save = mutation({
  args: {
    featureId: v.id("features"),
    lang: vLanguage,
    code: v.string(),
    note: v.optional(v.string()),
    na: v.optional(v.string()),
    baseUpdatedAt: v.union(v.number(), v.null()),
    force: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const user = await requireEditor(ctx);
    if (!(await ctx.db.get(args.featureId))) throw new ConvexError("Feature not found.");
    if (args.code.length > MAX_CODE_LENGTH) {
      throw new ConvexError(`Code must be at most ${MAX_CODE_LENGTH} characters.`);
    }
    const content = {
      code: args.code.replace(/\s+$/, ""),
      note: optionalText(args.note, MAX_NOTE_LENGTH, "Note"),
      na: optionalText(args.na, MAX_NOTE_LENGTH, "Reason"),
    };
    const existing = await findSnippet(ctx, args.featureId, args.lang);
    if (!args.force && (existing?.updatedAt ?? null) !== args.baseUpdatedAt) {
      throw new ConvexError("conflict");
    }
    return await write(ctx, existing, args.featureId, args.lang, content, user.email);
  },
});

/** Restores an old revision. It becomes the newest revision, so a revert can be undone. */
export const revert = mutation({
  args: { revisionId: v.id("revisions") },
  handler: async (ctx, { revisionId }) => {
    const user = await requireEditor(ctx);
    const revision = await ctx.db.get(revisionId);
    if (!revision) throw new ConvexError("Revision not found.");
    const snippet = await ctx.db.get(revision.snippetId);
    if (!snippet) throw new ConvexError("Snippet not found.");
    const { code, note, na } = revision;
    return await write(ctx, snippet, snippet.featureId, snippet.lang, { code, note, na }, user.email);
  },
});

/** Deletes a snippet and its history, leaving the cell empty. */
export const remove = mutation({
  args: { snippetId: v.id("snippets") },
  handler: async (ctx, { snippetId }) => {
    await requireEditor(ctx);
    const revisions = await ctx.db
      .query("revisions")
      .withIndex("by_snippet", (q) => q.eq("snippetId", snippetId))
      .collect();
    for (const r of revisions) await ctx.db.delete(r._id);
    await ctx.db.delete(snippetId);
  },
});

type Content = { code: string; note?: string; na?: string };

async function findSnippet(ctx: MutationCtx, featureId: Id<"features">, lang: LanguageId) {
  return await ctx.db
    .query("snippets")
    .withIndex("by_feature_lang", (q) => q.eq("featureId", featureId).eq("lang", lang))
    .unique();
}

/** Writes the snippet, records a revision, and trims history to MAX_REVISIONS. */
async function write(
  ctx: MutationCtx,
  existing: Doc<"snippets"> | null,
  featureId: Id<"features">,
  lang: LanguageId,
  content: Content,
  editedBy: string | undefined,
) {
  // Strictly increasing, so two saves within one millisecond still differ (conflict check).
  const updatedAt = Math.max(Date.now(), (existing?.updatedAt ?? 0) + 1);
  let snippetId: Id<"snippets">;
  if (existing) {
    snippetId = existing._id;
    // Imported snippets have no history yet: keep the original so it can be restored.
    const hasHistory = await ctx.db
      .query("revisions")
      .withIndex("by_snippet", (q) => q.eq("snippetId", snippetId))
      .first();
    if (!hasHistory) {
      const { code, note, na, updatedBy } = existing;
      await ctx.db.insert("revisions", { snippetId, code, note, na, editedBy: updatedBy ?? "original import" });
    }
    // replace() so a cleared note/na is removed rather than kept.
    await ctx.db.replace(snippetId, { featureId, lang, ...content, updatedAt, updatedBy: editedBy });
  } else {
    snippetId = await ctx.db.insert("snippets", { featureId, lang, ...content, updatedAt, updatedBy: editedBy });
  }
  await ctx.db.insert("revisions", { snippetId, ...content, editedBy });

  const revisions = await ctx.db
    .query("revisions")
    .withIndex("by_snippet", (q) => q.eq("snippetId", snippetId))
    .order("desc")
    .collect();
  for (const old of revisions.slice(MAX_REVISIONS)) await ctx.db.delete(old._id);
  return { snippetId, updatedAt };
}
