import { LANGUAGE_IDS, LANGUAGES } from '../config/languages'
import { useSelectedLanguages } from '../hooks/useSelectedLanguages'

export default function LanguageToggle() {
  const [selected, setSelected] = useSelectedLanguages()

  function toggle(id: (typeof LANGUAGE_IDS)[number]) {
    const next = selected.includes(id)
      ? selected.filter(l => l !== id)
      : [...selected, id]
    if (next.length > 0) setSelected(next)
  }

  return (
    <div className="flex items-center gap-1.5 whitespace-nowrap">
      {LANGUAGE_IDS.map(id => {
        const lang = LANGUAGES[id]
        const active = selected.includes(id)
        return (
          <button
            key={id}
            onClick={() => toggle(id)}
            style={active ? { borderColor: lang.color, color: lang.color, backgroundColor: lang.color + '18' } : undefined}
            className={[
              'flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[13px] font-medium transition-all',
              active
                ? ''
                : 'border-neutral-200 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400 hover:border-neutral-300 dark:hover:border-neutral-600 hover:text-neutral-700 dark:hover:text-neutral-300',
            ].join(' ')}
          >
            <img
              src={lang.iconPath}
              alt={lang.name}
              width={14}
              height={14}
              className="shrink-0"
            />
            {lang.name}
          </button>
        )
      })}
    </div>
  )
}
