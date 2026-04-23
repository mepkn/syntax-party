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
    <div className="flex flex-col w-full min-w-0 h-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-sm">
      {/* Thin language-color accent bar */}
      <div style={{ height: 3, backgroundColor: lang.color }} />

      {/* Language label */}
      <div className="flex items-center gap-2 px-3 py-2 bg-neutral-50 dark:bg-neutral-800/60 border-b border-neutral-100 dark:border-neutral-800">
        <img src={lang.iconPath} alt={lang.name} width={14} height={14} className="shrink-0" />
        <span className="text-[11px] font-semibold tracking-widest uppercase text-neutral-400 dark:text-neutral-500 select-none">
          {lang.name}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 min-h-[72px]">
        {isLoading && (
          <div className="p-4 text-xs text-neutral-400 dark:text-neutral-600 animate-pulse">
            Loading…
          </div>
        )}
        {isError && (
          <div className="p-4 text-xs text-red-500">Failed to load snippet.</div>
        )}
        {!isLoading && !isError && data === '' && (
          <div className="flex items-center justify-center h-full min-h-[72px] text-neutral-300 dark:text-neutral-700 text-2xl select-none">
            —
          </div>
        )}
        {!isLoading && !isError && data !== '' && data !== undefined && (
          <CodeBlock html={data} />
        )}
      </div>
    </div>
  )
}
