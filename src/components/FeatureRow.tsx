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
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: `repeat(${languages.length}, minmax(0, 1fr))` }}
      >
        {languages.map(lang => (
          <SnippetCard
            key={lang}
            sectionId={section.id}
            featureId={feature.id}
            languageId={lang}
          />
        ))}
      </div>
    </div>
  )
}
