import { SECTIONS } from '../content/loader'
import { useAppSelector } from '../store/hooks'

export default function SectionNav() {
  const activeSectionId = useAppSelector(s => s.ui.activeSectionId)

  return (
    <nav
      aria-label="Sections"
      className="hidden lg:flex flex-col w-48 shrink-0 sticky top-14 self-start max-h-[calc(100vh-3.5rem)] overflow-y-auto py-6 bg-neutral-100 dark:bg-[#0a0a0a] border-r border-neutral-200 dark:border-neutral-800/60"
    >
      <p className="px-5 mb-3 text-[10px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-600">
        Sections
      </p>
      <ul>
        {SECTIONS.map(section => {
          const active = activeSectionId === section.id
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={[
                  'flex items-center gap-2 px-5 py-1.5 text-[13px] transition-colors border-l-2',
                  active
                    ? 'border-sky-500 text-sky-600 dark:text-sky-400 font-medium bg-sky-50 dark:bg-sky-950/30'
                    : 'border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 hover:border-neutral-300',
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
