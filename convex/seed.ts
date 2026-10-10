import { v } from "convex/values";
import { internalMutation } from "./_generated/server";
import { vLanguage } from "./lib/languages";

/**
 * Imports one section (run by scripts/seed.ts, once per section). Idempotent: sections,
 * features and snippets that already exist (matched by slug / language) are left alone,
 * so re-running never overwrites edits made on the site.
 */
export const importSection = internalMutation({
  args: {
    slug: v.string(),
    title: v.string(),
    order: v.number(),
    features: v.array(
      v.object({
        slug: v.string(),
        title: v.string(),
        order: v.number(),
        snippets: v.array(v.object({ lang: vLanguage, code: v.string(), note: v.optional(v.string()) })),
      }),
    ),
  },
  handler: async (ctx, section) => {
    const sections = await ctx.db.query("sections").collect();
    const sectionId =
      sections.find((s) => s.slug === section.slug)?._id ??
      (await ctx.db.insert("sections", { slug: section.slug, title: section.title, order: section.order }));

    let added = 0;
    for (const feature of section.features) {
      const siblings = await ctx.db
        .query("features")
        .withIndex("by_section_order", (q) => q.eq("sectionId", sectionId))
        .collect();
      const featureId =
        siblings.find((f) => f.slug === feature.slug)?._id ??
        (await ctx.db.insert("features", {
          sectionId,
          slug: feature.slug,
          title: feature.title,
          order: feature.order,
        }));

      for (const snippet of feature.snippets) {
        const existing = await ctx.db
          .query("snippets")
          .withIndex("by_feature_lang", (q) => q.eq("featureId", featureId).eq("lang", snippet.lang))
          .unique();
        if (existing) continue;
        await ctx.db.insert("snippets", { featureId, ...snippet, updatedAt: Date.now() });
        added++;
      }
    }
    return { section: section.slug, added };
  },
});
