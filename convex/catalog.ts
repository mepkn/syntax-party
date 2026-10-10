import { ConvexError, v } from "convex/values";
import { mutation, query, type MutationCtx } from "./_generated/server";
import type { Id } from "./_generated/dataModel";
import { requireEditor } from "./lib/requireEditor";
import { slugify, uniqueSlug } from "./lib/slug";
import { cleanTitle } from "./lib/text";

/**
 * The section/feature outline, without any code. Small and rarely changes, so it is
 * cached apart from the snippets and a code edit doesn't re-send it.
 */
export const outline = query({
  args: {},
  handler: async (ctx) => {
    const sections = await ctx.db.query("sections").withIndex("by_order").collect();
    const features = await ctx.db.query("features").collect();
    return sections.map((s) => ({
      _id: s._id,
      slug: s.slug,
      title: s.title,
      features: features
        .filter((f) => f.sectionId === s._id)
        .sort((a, b) => a.order - b.order)
        .map((f) => ({ _id: f._id, slug: f.slug, title: f.title })),
    }));
  },
});

// ---- Sections ---------------------------------------------------------------

export const createSection = mutation({
  args: { title: v.string(), after: v.optional(v.id("sections")) },
  handler: async (ctx, { title, after }) => {
    await requireEditor(ctx);
    const clean = cleanTitle(title);
    const all = await ctx.db.query("sections").withIndex("by_order").collect();
    const slug = uniqueSlug(slugify(clean), all.map((s) => s.slug));
    const ids = all.map((s) => s._id);
    if (after !== undefined && !ids.includes(after)) throw new ConvexError("Section not found.");
    const at = after === undefined ? ids.length : ids.indexOf(after) + 1;
    const id = await ctx.db.insert("sections", { slug, title: clean, order: at + 1 });
    ids.splice(at, 0, id);
    await renumber(ctx, all, ids);
    return id;
  },
});

export const renameSection = mutation({
  args: { id: v.id("sections"), title: v.string() },
  handler: async (ctx, { id, title }) => {
    await requireEditor(ctx);
    // The slug stays put so existing links to #section keep working.
    await ctx.db.patch(id, { title: cleanTitle(title) });
  },
});

export const moveSection = mutation({
  args: { id: v.id("sections"), direction: v.union(v.literal("up"), v.literal("down")) },
  handler: async (ctx, { id, direction }) => {
    await requireEditor(ctx);
    const all = await ctx.db.query("sections").withIndex("by_order").collect();
    await renumber(ctx, all, moved(all, id, direction));
  },
});

export const removeSection = mutation({
  args: { id: v.id("sections") },
  handler: async (ctx, { id }) => {
    await requireEditor(ctx);
    const features = await ctx.db
      .query("features")
      .withIndex("by_section_order", (q) => q.eq("sectionId", id))
      .collect();
    for (const f of features) await deleteFeatureTree(ctx, f._id);
    await ctx.db.delete(id);
  },
});

// ---- Features ---------------------------------------------------------------

export const createFeature = mutation({
  args: { sectionId: v.id("sections"), title: v.string() },
  handler: async (ctx, { sectionId, title }) => {
    await requireEditor(ctx);
    if (!(await ctx.db.get(sectionId))) throw new ConvexError("Section not found.");
    const clean = cleanTitle(title);
    const siblings = await ctx.db
      .query("features")
      .withIndex("by_section_order", (q) => q.eq("sectionId", sectionId))
      .collect();
    const slug = uniqueSlug(slugify(clean), siblings.map((f) => f.slug));
    return await ctx.db.insert("features", { sectionId, slug, title: clean, order: siblings.length + 1 });
  },
});

export const renameFeature = mutation({
  args: { id: v.id("features"), title: v.string() },
  handler: async (ctx, { id, title }) => {
    await requireEditor(ctx);
    await ctx.db.patch(id, { title: cleanTitle(title) });
  },
});

export const moveFeature = mutation({
  args: { id: v.id("features"), direction: v.union(v.literal("up"), v.literal("down")) },
  handler: async (ctx, { id, direction }) => {
    await requireEditor(ctx);
    const feature = await ctx.db.get(id);
    if (!feature) throw new ConvexError("Feature not found.");
    const siblings = await ctx.db
      .query("features")
      .withIndex("by_section_order", (q) => q.eq("sectionId", feature.sectionId))
      .collect();
    await renumber(ctx, siblings, moved(siblings, id, direction));
  },
});

export const removeFeature = mutation({
  args: { id: v.id("features") },
  handler: async (ctx, { id }) => {
    await requireEditor(ctx);
    await deleteFeatureTree(ctx, id);
  },
});

// ---- Helpers ----------------------------------------------------------------

/** The ids of `sorted` with `id` swapped with its previous/next neighbour (unchanged at either end). */
function moved<T extends { _id: string }>(sorted: T[], id: T["_id"], direction: "up" | "down"): T["_id"][] {
  const ids = sorted.map((row) => row._id);
  const i = ids.indexOf(id);
  if (i === -1) throw new ConvexError("Not found.");
  const j = direction === "up" ? i - 1 : i + 1;
  if (j >= 0 && j < ids.length) [ids[i], ids[j]] = [ids[j], ids[i]];
  return ids;
}

/**
 * Sets `order` to 1, 2, 3, … following `ids`. Lists are short (sections, or the features
 * of one section), so rewriting them keeps the numbers readable at no real cost. Rows
 * already at the right number are skipped; `rows` gives the current values.
 */
type Ordered = Id<"sections"> | Id<"features">;

async function renumber(ctx: MutationCtx, rows: { _id: Ordered; order: number }[], ids: Ordered[]) {
  const current = new Map(rows.map((row) => [row._id, row.order]));
  for (const [i, id] of ids.entries()) {
    if (current.get(id) !== i + 1) await ctx.db.patch(id, { order: i + 1 });
  }
}

/** Deletes a feature with all of its snippets and their revisions. */
async function deleteFeatureTree(ctx: MutationCtx, featureId: Id<"features">) {
  const snippets = await ctx.db
    .query("snippets")
    .withIndex("by_feature_lang", (q) => q.eq("featureId", featureId))
    .collect();
  for (const s of snippets) {
    const revisions = await ctx.db
      .query("revisions")
      .withIndex("by_snippet", (q) => q.eq("snippetId", s._id))
      .collect();
    for (const r of revisions) await ctx.db.delete(r._id);
    await ctx.db.delete(s._id);
  }
  await ctx.db.delete(featureId);
}
