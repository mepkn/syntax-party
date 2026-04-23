import MarkdownIt from 'markdown-it'
import { fromHighlighter } from '@shikijs/markdown-it'
import { createHighlighter } from 'shiki'
import { LANGUAGES } from '../config/languages'

// Initialized once, shared across all RTK Query calls.
let mdPromise: Promise<MarkdownIt> | null = null

function initMd(): Promise<MarkdownIt> {
  if (!mdPromise) {
    mdPromise = (async () => {
      const langs = Object.values(LANGUAGES).map(l => l.shikiLang)
      const highlighter = await createHighlighter({
        themes: ['github-light', 'github-dark'],
        langs,
      })
      const md = MarkdownIt()
      md.use(fromHighlighter(highlighter, {
        themes: { light: 'github-light', dark: 'github-dark' },
      }))
      return md
    })()
  }
  return mdPromise
}

export async function renderSnippet(source: string): Promise<string> {
  const md = await initMd()
  return md.render(source)
}
