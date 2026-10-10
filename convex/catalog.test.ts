import { describe, expect, test } from "vitest";
import { api } from "./_generated/api";
import { newTest, signedInUser } from "./test.helpers";

describe("outline editing", () => {
  test("creates sections and features with unique slugs, in order", async () => {
    const t = newTest();
    const alice = await signedInUser(t, "alice@example.com");
    const loops = await alice.mutation(api.catalog.createSection, { title: "  Loops  " });
    await alice.mutation(api.catalog.createSection, { title: "Errors" });
    await alice.mutation(api.catalog.createFeature, { sectionId: loops, title: "For / Of" });
    await alice.mutation(api.catalog.createFeature, { sectionId: loops, title: "For of" });

    const outline = await t.query(api.catalog.outline, {});
    expect(outline.map((s) => s.title)).toEqual(["Loops", "Errors"]);
    expect(outline[0].features.map((f) => f.slug)).toEqual(["for-of", "for-of-2"]);
  });

  test("moves a section and keeps slugs on rename", async () => {
    const t = newTest();
    const alice = await signedInUser(t, "alice@example.com");
    await alice.mutation(api.catalog.createSection, { title: "A" });
    const b = await alice.mutation(api.catalog.createSection, { title: "B" });
    await alice.mutation(api.catalog.moveSection, { id: b, direction: "up" });
    await alice.mutation(api.catalog.moveSection, { id: b, direction: "up" }); // already first: no-op
    await alice.mutation(api.catalog.renameSection, { id: b, title: "Bee" });

    const outline = await t.query(api.catalog.outline, {});
    expect(outline.map((s) => [s.title, s.slug])).toEqual([["Bee", "b"], ["A", "a"]]);
  });

  test("adds a section right after another one", async () => {
    const t = newTest();
    const alice = await signedInUser(t, "alice@example.com");
    const a = await alice.mutation(api.catalog.createSection, { title: "A" });
    await alice.mutation(api.catalog.createSection, { title: "C" });
    await alice.mutation(api.catalog.createSection, { title: "B", after: a });
    const last = (await t.query(api.catalog.outline, {})).at(-1)!._id;
    await alice.mutation(api.catalog.createSection, { title: "D", after: last });

    const outline = await t.query(api.catalog.outline, {});
    expect(outline.map((s) => s.title)).toEqual(["A", "B", "C", "D"]);
    const orders = await t.run(async (ctx) => (await ctx.db.query("sections").withIndex("by_order").collect()).map((s) => s.order));
    expect(orders).toEqual([1, 2, 3, 4]);
  });

  test("rejects empty titles", async () => {
    const t = newTest();
    const alice = await signedInUser(t, "alice@example.com");
    await expect(alice.mutation(api.catalog.createSection, { title: "   " })).rejects.toThrow("empty");
  });

  test("deleting a section deletes its features, snippets and revisions", async () => {
    const t = newTest();
    const alice = await signedInUser(t, "alice@example.com");
    const sectionId = await alice.mutation(api.catalog.createSection, { title: "Loops" });
    const featureId = await alice.mutation(api.catalog.createFeature, { sectionId, title: "For" });
    await alice.mutation(api.snippets.save, { featureId, lang: "go", code: "for {}", baseUpdatedAt: null });

    await alice.mutation(api.catalog.removeSection, { id: sectionId });
    const counts = await t.run(async (ctx) =>
      Promise.all((["sections", "features", "snippets", "revisions"] as const).map(async (table) => (await ctx.db.query(table).collect()).length)),
    );
    expect(counts).toEqual([0, 0, 0, 0]);
  });
});
