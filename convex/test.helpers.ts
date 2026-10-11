/// <reference types="vite/client" />
import { convexTest } from "convex-test";
import { vi } from "vitest";
import schema from "./schema";

export const modules = import.meta.glob("./**/*.ts");

export function newTest() {
  vi.stubEnv("ALLOWED_EMAILS", "alice@example.com, Bob@Example.com");
  return convexTest(schema, modules);
}

export type TestConvex = ReturnType<typeof newTest>;

export async function signedInUser(t: TestConvex, email: string) {
  const userId = await t.run((ctx) => ctx.db.insert("users", { email }));
  return t.withIdentity({ subject: `${userId}|session-${email}` });
}

/** One section with one feature; returns the feature id. */
export async function seedFeature(t: TestConvex) {
  return await t.run(async (ctx) => {
    const sectionId = await ctx.db.insert("sections", { slug: "loops", title: "Loops", order: 1 });
    return await ctx.db.insert("features", { sectionId, slug: "for", title: "For", order: 1 });
  });
}
