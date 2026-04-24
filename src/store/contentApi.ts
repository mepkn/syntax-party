import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { findLoader } from '../content/loader'
import { renderSnippet } from '../content/highlighter'
import type { RenderedSnippet } from '../content/highlighter'
import type { LanguageId } from '../config/languages'

export interface SnippetArgs {
  sectionId: string
  featureId: string
  languageId: LanguageId
}

export const contentApi = createApi({
  reducerPath: 'content',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getSnippetHtml: builder.query<RenderedSnippet, SnippetArgs>({
      queryFn: async ({ sectionId, featureId, languageId }) => {
        const loader = findLoader(sectionId, featureId, languageId)
        if (!loader) return { data: { codeHtml: '' } }
        try {
          const raw = await loader()
          const data = await renderSnippet(raw)
          return { data }
        } catch (e) {
          return { error: { status: 'CUSTOM_ERROR' as const, error: String(e) } }
        }
      },
    }),
  }),
})

export const { useGetSnippetHtmlQuery } = contentApi
