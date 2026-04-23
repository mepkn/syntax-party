import type { LanguageId } from '../config/languages'
import type { Feature, Section } from '../content/types'
import SnippetCard from './SnippetCard'

interface Props {
  section: Section
  feature: Feature
  languages: LanguageId[]
}

export default function FeatureRow({ section, feature, languages }: Props) {
  return (
    <div className="mb-8">
      <h3 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-3">
        {feature.title}
      </h3>
      {/*
        Mobile (<640px):  flex-col  — cards stack vertically
        Tablet (640–1024px): flex-row + overflow-x-auto — horizontal scroll with fixed card widths
        Desktop (≥1024px): CSS grid — equal-width columns, count driven by selected languages
      */}
      <div
        className="flex flex-col gap-4 sm:flex-row sm:overflow-x-auto sm:pb-1 lg:grid lg:overflow-x-visible lg:pb-0"
        style={{ gridTemplateColumns: `repeat(${languages.length}, minmax(0, 1fr))` }}
      >
        {languages.map(lang => (
          <div key={lang} className="min-w-0 sm:min-w-[260px] sm:shrink-0 lg:min-w-0">
            <SnippetCard
              sectionId={section.id}
              featureId={feature.id}
              languageId={lang}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
