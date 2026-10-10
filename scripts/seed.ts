/**
 * Imports content/ into Convex, one `seed:importSection` call per section.
 * Idempotent: anything already in the database is left alone.
 *
 *   npm run seed               # the local dev deployment
 *   npm run seed -- --prod     # production (extra args go to `convex run`)
 */
import { readdirSync, readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { LANGUAGE_IDS, isLanguageId } from "../convex/lib/languages.ts";
import { parseOrderedName, parseSnippet, titleFromSlug } from "./lib/content.ts";

const root = path.join(import.meta.dirname, "..", "content");
const passThrough = process.argv.slice(2);
const npx = process.platform === "win32" ? "npx.cmd" : "npx";

const dirs = (dir: string) =>
  readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

for (const sectionDir of dirs(root)) {
  const section = parseOrderedName(sectionDir);
  const features = dirs(path.join(root, sectionDir)).map((featureDir) => {
    const feature = parseOrderedName(featureDir);
    const dir = path.join(root, sectionDir, featureDir);
    const snippets = readdirSync(dir)
      .filter((f) => f.endsWith(".md"))
      .map((file) => {
        const lang = file.replace(/\.md$/, "");
        if (!isLanguageId(lang)) throw new Error(`Unknown language file ${dir}/${file}`);
        return { lang, ...parseSnippet(readFileSync(path.join(dir, file), "utf8")) };
      })
      .sort((a, b) => LANGUAGE_IDS.indexOf(a.lang) - LANGUAGE_IDS.indexOf(b.lang));
    return { ...feature, title: titleFromSlug(feature.slug), snippets };
  });

  const args = JSON.stringify({ ...section, title: titleFromSlug(section.slug), features });
  const out = execFileSync(npx, ["convex", "run", ...passThrough, "seed:importSection", args], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "inherit"],
  });
  process.stdout.write(out.replace(/\s+/g, " ").trim() + "\n");
}
