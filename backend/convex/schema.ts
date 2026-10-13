import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { vLanguage } from "./lib/languages";

export default defineSchema({
  ...authTables,

  /** Top-level groups, e.g. "Loops". `order` is 1, 2, 3, …, renumbered on insert and move. */
  sections: defineTable({
    slug: v.string(),
    title: v.string(),
    order: v.number(),
  }).index("by_order", ["order"]),

  /** One concept compared across languages, e.g. "For". `order` is 1, 2, 3, … within its section. */
  features: defineTable({
    sectionId: v.id("sections"),
    slug: v.string(),
    title: v.string(),
    order: v.number(),
  }).index("by_section_order", ["sectionId", "order"]),

  /**
   * One feature in one language. Only the code is stored; the browser highlights it.
   * `na` set means the concept doesn't exist in this language; its value says why.
   */
  snippets: defineTable({
    featureId: v.id("features"),
    lang: vLanguage,
    code: v.string(),
    note: v.optional(v.string()),
    na: v.optional(v.string()),
    updatedAt: v.number(),
    updatedBy: v.optional(v.string()),
  })
    .index("by_lang", ["lang"])
    .index("by_feature_lang", ["featureId", "lang"]),

  /** Past states of a snippet, newest last. Trimmed to MAX_REVISIONS on every save. */
  revisions: defineTable({
    snippetId: v.id("snippets"),
    code: v.string(),
    note: v.optional(v.string()),
    na: v.optional(v.string()),
    editedBy: v.optional(v.string()),
  }).index("by_snippet", ["snippetId"]),
});
