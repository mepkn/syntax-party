# syntax-party

The same programming concepts side by side in JavaScript, Python, Go, Ruby, Rust, Kotlin
and Swift. Pick up to four languages and compare them feature by feature. Inspired by
[component-party.dev](https://component-party.dev/), but for languages.

Live: https://syntax-party.pknspace.com

## Features

- **Compare 1–4 languages.** The choice lives in the URL (`?langs=go,rust`), so links
  share the same view, and in `localStorage`, so the next visit remembers it.
- **Contents sidebar with scroll spy.** The current section expands to its features. On
  phones the sidebar becomes a drawer, and the header shows "Section › Feature" to open it.
- **⌘K search** to jump to any feature. Every feature has a linkable anchor (`#loops--for`).
- **Light and dark themes**, and a copy button on every snippet.
- **Edit on the site.** Allowlisted editors sign in with email and password, then edit
  snippets in a code editor. They can also mark a snippet "not applicable" with a reason,
  view history and restore old versions, and add, rename, reorder or delete sections and
  features. Changes appear live in every open tab.

## Stack

React 19 · TypeScript · Vite · Tailwind CSS v4 · shadcn/ui (Base UI) · Convex ·
`@convex-dev/auth` (Password provider) · Shiki (in the browser) · CodeMirror 6 · Vitest.

## Development

Development uses a **Convex local deployment**: the open-source backend runs on your machine
with SQLite. You don't need a Convex account. Requires Node 22.18+ (`.nvmrc` pins 22).

```bash
npm install
npm run web:install          # the web app in web/ has its own install
npx convex dev            # choose "start without an account" (local). Keep it running.
npm run setup:auth && npx convex env set SITE_URL http://localhost:5173 && npx convex env set ALLOWED_EMAILS you@example.com
npm run dev               # second terminal → http://localhost:5173
```

For non-interactive runs (CI or agents), use `CONVEX_AGENT_MODE=anonymous npx convex dev`.

### Becoming an editor

1. Add your email to the allowlist: `npx convex env set ALLOWED_EMAILS you@example.com`
   (comma-separate multiple editors).
2. Click the sign-in icon at the top right, choose **"First time? Create your editor
   account"**, and enter that email and a password of at least 8 characters.

### Content for local development

A new local deployment starts empty. To work with the real content, copy production into it
(this replaces everything in the local deployment, editor accounts included):

```bash
CONVEX_DEPLOY_KEY=<key from .env.prod.local> npx convex export --path prod.zip
npx convex import --replace-all prod.zip    # with `npx convex dev` running locally
rm prod.zip
```

The same export is also a full backup of the site.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Vite dev server (http://localhost:5173) |
| `npx convex dev` | Local Convex backend and function hot-reload |
| `npm run build` | Typecheck and production build into `web/dist/` |
| `npm run web:install` | Install the web app's dependencies |
| `npm run typecheck` | `convex/` typecheck (the web app's runs in `check`) |
| `npm run setup:auth` | Generate and set `JWT_PRIVATE_KEY` + `JWKS` |
| `npm run lint` | ESLint |
| `npm test` | Convex function tests (Vitest): permissions, saving, conflicts, history, outline editing; the web app's run in `check` |
| `npm run check` | Typecheck, lint and tests for the backend, then the web app |
| `npm run deploy` | Deploys the backend, builds and uploads the site |
| `npm run deploy:dry` | Same checks, but only previews the deploy and upload |

## Deployment

Production runs on a Convex cloud deployment (backend) plus a VPS where Caddy serves the
static `web/dist/` (no restart needed). `npm run deploy` does both.

One-time setup:

1. Create a Convex cloud project and generate a **production deploy key** in the dashboard.
2. Copy the production section of `.env.example` into `.env.prod.local` (git-ignored) and
   fill in `CONVEX_DEPLOY_KEY`, `DEPLOY_HOST`, `DEPLOY_PORT` and `DEPLOY_DIR`. You also need
   SSH key access to the server.
3. Set the Convex-side env vars on the **production** deployment:
   ```bash
   node scripts/setup-auth-keys.ts --apply --prod
   npx convex env set --prod SITE_URL https://syntax-party.pknspace.com
   npx convex env set --prod ALLOWED_EMAILS you@example.com
   ```
4. Deploy once (below), then create your editor account at `/edit`.

Deploy:

```bash
npm run deploy:dry   # checks, then preview the backend push and the upload
npm run deploy       # checks, deploy convex/, build with the production URL, upload
```

## How it works

- **Convex is the source of truth.** The tables are `sections` → `features` → `snippets`
  (one per feature × language), plus `revisions`. Everything is edited on the site; there
  are no content files in the repo.
- **Small reads.** `catalog:outline` (titles only) and `snippets:forLanguage` (one
  subscription per selected language) are separate queries. A code edit therefore only
  re-sends that one language, and adding a language column fetches only that language.
- **Highlighting happens in the browser.** Convex stores only the code. The browser loads
  Shiki's core, the JavaScript regex engine, and only the grammars on screen, all lazily.
  Code shows unstyled first, then gets colours. Ruby's grammar is the heaviest (about
  170 KB gzipped) because it embeds other languages, and it loads only when Ruby is selected.
- **History.** Every save adds a revision, and only the latest 20 per snippet are kept. The
  first edit of an imported snippet also stores the original, so it can be restored.
  Restoring a version creates a new revision, so a restore can be undone too.
- **Conflicts.** The editor sends the `updatedAt` it started from. If someone saved in
  between, the save is refused and the editor offers "Overwrite" or "Discard mine".
- **Security.** Sign-up and sign-in are rejected for emails not in `ALLOWED_EMAILS`, and
  every write calls `requireEditor(ctx)`. Removing an email from the list removes the
  editing UI and makes every write throw for that user.
- **Scroll spy** (`web/src/hooks/use-scroll-spy.ts`) uses one IntersectionObserver and no
  scroll listeners. It is rebuilt whenever the outline changes, so content that loads or is
  edited later is still tracked.

### Free-plan notes

- Reads are split by language and the outline is cached separately, so database bandwidth
  stays low.
- Convex stores no highlighted HTML and runs no actions.
- History is capped at 20 revisions per snippet, and code and notes have length limits.
