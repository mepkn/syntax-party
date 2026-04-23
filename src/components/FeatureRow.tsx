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
    <div>
      <p className="text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-2">
        {feature.title}
      </p>
      {/*
        Mobile (<640px):  flex-col  — cards stack vertically, full width
        Tablet (640–1024px): flex-row + overflow-x-auto — horizontal scroll
        Desktop (≥1024px): CSS grid — equal-width columns
      */}
      <div
        className="flex flex-col gap-3 sm:flex-row sm:overflow-x-auto sm:pb-1 lg:grid lg:overflow-x-visible lg:pb-0 items-stretch"
        style={{ gridTemplateColumns: `repeat(${languages.length}, minmax(0, 1fr))` }}
      >
        {languages.map(lang => (
          <div key={lang} className="flex flex-col sm:w-[280px] sm:shrink-0 lg:w-auto">
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
