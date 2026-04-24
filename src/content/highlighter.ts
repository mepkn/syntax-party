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

export interface RenderedSnippet {
  codeHtml: string
  descriptionHtml?: string
}

export async function renderSnippet(source: string): Promise<RenderedSnippet> {
  const md = await initMd()
  const tokens = md.parse(source, {})

  const fenceIdx = tokens.findIndex(t => t.type === 'fence')

  if (fenceIdx === -1) {
    return { codeHtml: md.render(source) }
  }

  const descriptionTokens = tokens.slice(0, fenceIdx)
  const codeTokens = tokens.slice(fenceIdx)

  const descriptionHtml = descriptionTokens.length > 0
    ? md.renderer.render(descriptionTokens, md.options, {})
    : undefined

  const codeHtml = md.renderer.render(codeTokens, md.options, {})

  return { codeHtml, descriptionHtml }
}
