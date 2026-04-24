import type { LanguageId } from '../config/languages'
import { SECTIONS } from '../content/loader'
import FeatureRow from './FeatureRow'

interface Props {
  languages: LanguageId[]
}

export default function ComparisonView({ languages }: Props) {
  if (languages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-2 text-neutral-400">
        <span className="text-3xl">←</span>
        <span className="text-sm">Select at least one language above.</span>
      </div>
    )
  }

  return (
    <div className="px-6 py-8 max-w-screen-xl mx-auto w-full">
      {SECTIONS.map(section => (
        <section key={section.id} id={section.id} className="mb-14">
          <div className="flex items-center gap-2.5 mb-6">
            <span className="inline-block w-1 h-5 rounded-full bg-sky-500 shrink-0" />
            <h2 className="text-lg font-bold text-neutral-800 dark:text-neutral-100 tracking-tight">
              {section.title}
            </h2>
          </div>
          <div className="space-y-6">
            {section.features.map(feature => (
              <FeatureRow
                key={feature.id}
                section={section}
                feature={feature}
                languages={languages}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
