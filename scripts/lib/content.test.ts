import { describe, expect, it } from "vitest";
import { parseOrderedName, parseSnippet, titleFromSlug } from "./content";

describe("parseOrderedName", () => {
  it("splits the order prefix from the slug", () => {
    expect(parseOrderedName("12-async")).toEqual({ order: 12, slug: "async" });
    expect(parseOrderedName("6-null-undefined")).toEqual({ order: 6, slug: "null-undefined" });
  });
  it("rejects names without a prefix", () => {
    expect(() => parseOrderedName("async")).toThrow();
  });
});

describe("titleFromSlug", () => {
  it("title-cases each word", () => {
    expect(titleFromSlug("break-continue")).toBe("Break Continue");
  });
});

describe("parseSnippet", () => {
  it("returns the code inside the fence", () => {
    expect(parseSnippet('```js\nconsole.log("hi")\n```\n')).toEqual({ code: 'console.log("hi")' });
  });
  it("keeps prose before the fence as the note", () => {
    const md = "No ownership here.\n\n```js\nconst a = 1\n```\n";
    expect(parseSnippet(md)).toEqual({ code: "const a = 1", note: "No ownership here." });
  });
  it("keeps blank lines and indentation inside the code", () => {
    const md = "```py\ndef f():\n    pass\n\nf()\n```";
    expect(parseSnippet(md).code).toBe("def f():\n    pass\n\nf()");
  });
  it("throws without a fence", () => {
    expect(() => parseSnippet("just text")).toThrow();
  });
});
