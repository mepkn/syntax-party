import type { LanguageId } from '../config/languages'
import { SECTIONS } from '../content/loader'
import FeatureRow from './FeatureRow'

interface Props {
  languages: LanguageId[]
}

export default function ComparisonView({ languages }: Props) {
  if (languages.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-neutral-400">
        Select at least one language above.
      </div>
    )
  }

  return (
    <div className="px-6 py-8 max-w-screen-2xl mx-auto">
      {SECTIONS.map(section => (
        <section key={section.id} id={section.id} className="mb-12">
          <h2 className="text-xl font-bold mb-6 pb-2 border-b border-neutral-200 dark:border-neutral-800">
            {section.title}
          </h2>
          {section.features.map(feature => (
            <FeatureRow
              key={feature.id}
              section={section}
              feature={feature}
              languages={languages}
            />
          ))}
        </section>
      ))}
    </div>
  )
}
