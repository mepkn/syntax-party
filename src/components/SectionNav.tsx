import { SECTIONS } from '../content/loader'
import { useAppSelector } from '../store/hooks'

export default function SectionNav() {
  const activeSectionId = useAppSelector(s => s.ui.activeSectionId)

  return (
    <nav
      aria-label="Sections"
      className="hidden lg:flex flex-col w-52 shrink-0 sticky top-14 self-start max-h-[calc(100vh-3.5rem)] overflow-y-auto border-r border-neutral-200 dark:border-neutral-800 py-6"
    >
      <p className="px-4 mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
        Sections
      </p>
      <ul className="space-y-px">
        {SECTIONS.map(section => {
          const active = activeSectionId === section.id
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={[
                  'block px-4 py-1.5 text-sm border-l-2 transition-colors',
                  active
                    ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 font-medium text-sky-700 dark:text-sky-300'
                    : 'border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:border-neutral-300 dark:hover:border-neutral-600',
                ].join(' ')}
              >
                {section.title}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
