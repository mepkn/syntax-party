import { LANGUAGES } from '../config/languages'
import type { LanguageId } from '../config/languages'
import { useGetSnippetHtmlQuery } from '../store/contentApi'
import CodeBlock from './CodeBlock'

interface Props {
  sectionId: string
  featureId: string
  languageId: LanguageId
}

export default function SnippetCard({ sectionId, featureId, languageId }: Props) {
  const lang = LANGUAGES[languageId]
  const { data, isLoading, isError } = useGetSnippetHtmlQuery({ sectionId, featureId, languageId })

  return (
    <div className="flex flex-col min-w-0 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden">
      <div
        className="flex items-center gap-2 px-4 py-2 border-b border-neutral-200 dark:border-neutral-800"
        style={{ borderLeftWidth: 3, borderLeftColor: lang.color }}
      >
        <img src={lang.iconPath} alt={lang.name} width={16} height={16} className="shrink-0" />
        <span className="text-xs font-semibold tracking-wide uppercase text-neutral-600 dark:text-neutral-400">
          {lang.name}
        </span>
      </div>
      <div className="flex-1 min-h-[80px]">
        {isLoading && (
          <div className="p-4 text-xs text-neutral-400 animate-pulse">Loading…</div>
        )}
        {isError && (
          <div className="p-4 text-xs text-red-500">Failed to load snippet.</div>
        )}
        {!isLoading && !isError && data === '' && (
          <div className="p-4 text-neutral-400 text-lg select-none">—</div>
        )}
        {!isLoading && !isError && data !== '' && data !== undefined && (
          <CodeBlock html={data} />
        )}
      </div>
    </div>
  )
}
