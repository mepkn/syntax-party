import { describe, expect, it } from "vitest";
import { MAX_SELECTED, normalizeSelection } from "./languages";

describe("normalizeSelection", () => {
  it("drops unknown ids and duplicates", () => {
    expect(normalizeSelection(["go", "cobol", "go", "PYTHON"])).toEqual(["python", "go"]);
  });
  it("sorts into display order", () => {
    expect(normalizeSelection(["swift", "javascript"])).toEqual(["javascript", "swift"]);
  });
  it("caps the selection", () => {
    expect(normalizeSelection(["javascript", "python", "go", "ruby", "rust", "swift"])).toHaveLength(MAX_SELECTED);
  });
  it("returns empty for nothing usable", () => {
    expect(normalizeSelection(["", "x"])).toEqual([]);
  });
});
