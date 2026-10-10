import { describe, expect, test } from "vitest";
import { api } from "./_generated/api";
import { MAX_REVISIONS } from "./lib/limits";
import { newTest, seedFeature, signedInUser } from "./test.helpers";

describe("allowlist", () => {
  test("a non-allowlisted email can't sign up", async () => {
    const t = newTest();
    await expect(
      t.action(api.auth.signIn, {
        provider: "password",
        params: { email: "mallory@example.com", password: "password123", flow: "signUp" },
      }),
    ).rejects.toThrow("allowlist");
    expect(await t.run((ctx) => ctx.db.query("users").collect())).toEqual([]);
  });

  test("an allowlisted email can sign up, case-insensitively", async () => {
    const t = newTest();
    // Token minting needs JWT_PRIVATE_KEY, which tests don't set; the account is stored first.
    await t
      .action(api.auth.signIn, {
        provider: "password",
        params: { email: " BOB@example.com ", password: "password123", flow: "signUp" },
      })
      .catch(() => {});
    const users = await t.run((ctx) => ctx.db.query("users").collect());
    expect(users.map((u) => u.email)).toEqual(["bob@example.com"]);
  });

  test("viewers and non-editors can't write", async () => {
    const t = newTest();
    const featureId = await seedFeature(t);
    const args = { featureId, lang: "go" as const, code: "x", baseUpdatedAt: null };
    await expect(t.mutation(api.snippets.save, args)).rejects.toThrow("Not signed in");
    const mallory = await signedInUser(t, "mallory@example.com");
    await expect(mallory.mutation(api.snippets.save, args)).rejects.toThrow("editors only");
    await expect(mallory.mutation(api.catalog.createSection, { title: "X" })).rejects.toThrow("editors only");
  });

  test("me reports whether the user can edit", async () => {
    const t = newTest();
    expect(await t.query(api.auth.me, {})).toBeNull();
    const alice = await signedInUser(t, "alice@example.com");
    expect(await alice.query(api.auth.me, {})).toEqual({ email: "alice@example.com", canEdit: true });
  });
});

describe("save", () => {
  test("creates, then updates, recording each save as a revision", async () => {
    const t = newTest();
    const featureId = await seedFeature(t);
    const alice = await signedInUser(t, "alice@example.com");

    const first = await alice.mutation(api.snippets.save, {
      featureId, lang: "go", code: "for {}\n\n", note: "  Only loop.  ", baseUpdatedAt: null,
    });
    await alice.mutation(api.snippets.save, {
      featureId, lang: "go", code: "for i := 0; i < 3; i++ {}", note: "", baseUpdatedAt: first.updatedAt,
    });

    const [snippet] = await t.query(api.snippets.forLanguage, { lang: "go" });
    expect(snippet.code).toBe("for i := 0; i < 3; i++ {}");
    expect(snippet.note).toBeUndefined(); // cleared, not kept
    const history = await alice.query(api.snippets.history, { snippetId: snippet._id });
    expect(history.map((r) => r.code)).toEqual(["for i := 0; i < 3; i++ {}", "for {}"]);
    expect(history[1].note).toBe("Only loop.");
  });

  test("refuses a stale save unless forced", async () => {
    const t = newTest();
    const featureId = await seedFeature(t);
    const alice = await signedInUser(t, "alice@example.com");
    const { updatedAt } = await alice.mutation(api.snippets.save, { featureId, lang: "go", code: "a", baseUpdatedAt: null });
    await alice.mutation(api.snippets.save, { featureId, lang: "go", code: "b", baseUpdatedAt: updatedAt });

    const stale = { featureId, lang: "go" as const, code: "c", baseUpdatedAt: updatedAt };
    await expect(alice.mutation(api.snippets.save, stale)).rejects.toThrow("conflict");
    await alice.mutation(api.snippets.save, { ...stale, force: true });
    expect((await t.query(api.snippets.forLanguage, { lang: "go" }))[0].code).toBe("c");
  });

  test("keeps the imported original in history on the first edit", async () => {
    const t = newTest();
    const featureId = await seedFeature(t);
    const updatedAt = await t.run(async (ctx) => {
      await ctx.db.insert("snippets", { featureId, lang: "go", code: "original", updatedAt: 1 });
      return 1;
    });
    const alice = await signedInUser(t, "alice@example.com");
    await alice.mutation(api.snippets.save, { featureId, lang: "go", code: "edited", baseUpdatedAt: updatedAt });
    const [snippet] = await t.query(api.snippets.forLanguage, { lang: "go" });
    const history = await alice.query(api.snippets.history, { snippetId: snippet._id });
    expect(history.map((r) => [r.code, r.editedBy])).toEqual([
      ["edited", "alice@example.com"],
      ["original", "original import"],
    ]);
  });

  test(`trims history to ${MAX_REVISIONS} revisions`, async () => {
    const t = newTest();
    const featureId = await seedFeature(t);
    const alice = await signedInUser(t, "alice@example.com");
    let base: number | null = null;
    for (let i = 0; i < MAX_REVISIONS + 5; i++) {
      ({ updatedAt: base } = await alice.mutation(api.snippets.save, { featureId, lang: "go", code: `v${i}`, baseUpdatedAt: base }));
    }
    const revisions = await t.run((ctx) => ctx.db.query("revisions").collect());
    expect(revisions).toHaveLength(MAX_REVISIONS);
    expect(revisions.at(-1)?.code).toBe(`v${MAX_REVISIONS + 4}`);
  });

  test("not applicable is stored with its reason", async () => {
    const t = newTest();
    const featureId = await seedFeature(t);
    const alice = await signedInUser(t, "alice@example.com");
    await alice.mutation(api.snippets.save, { featureId, lang: "go", code: "", na: "No classes in Go.", baseUpdatedAt: null });
    expect((await t.query(api.snippets.forLanguage, { lang: "go" }))[0].na).toBe("No classes in Go.");
  });
});

describe("revert", () => {
  test("restores an old version as a new revision", async () => {
    const t = newTest();
    const featureId = await seedFeature(t);
    const alice = await signedInUser(t, "alice@example.com");
    const a = await alice.mutation(api.snippets.save, { featureId, lang: "go", code: "a", baseUpdatedAt: null });
    await alice.mutation(api.snippets.save, { featureId, lang: "go", code: "b", baseUpdatedAt: a.updatedAt });

    const history = await alice.query(api.snippets.history, { snippetId: a.snippetId });
    await alice.mutation(api.snippets.revert, { revisionId: history[1]._id });

    expect((await t.query(api.snippets.forLanguage, { lang: "go" }))[0].code).toBe("a");
    const after = await alice.query(api.snippets.history, { snippetId: a.snippetId });
    expect(after.map((r) => r.code)).toEqual(["a", "b", "a"]);
  });
});
