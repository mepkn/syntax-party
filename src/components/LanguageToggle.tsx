import { LANGUAGE_IDS, LANGUAGES } from '../config/languages'
import { useSelectedLanguages } from '../hooks/useSelectedLanguages'

export default function LanguageToggle() {
  const [selected, setSelected] = useSelectedLanguages()

  function toggle(id: (typeof LANGUAGE_IDS)[number]) {
    const next = selected.includes(id)
      ? selected.filter(l => l !== id)
      : [...selected, id]
    // keep at least one language selected
    if (next.length > 0) setSelected(next)
  }

  return (
    <div className="flex flex-wrap gap-2">
      {LANGUAGE_IDS.map(id => {
        const lang = LANGUAGES[id]
        const active = selected.includes(id)
        return (
          <button
            key={id}
            onClick={() => toggle(id)}
            style={active ? { borderColor: lang.color, backgroundColor: lang.color + '22' } : undefined}
            className={[
              'flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-medium transition-colors',
              active
                ? 'border-current'
                : 'border-neutral-300 dark:border-neutral-600 text-neutral-500 dark:text-neutral-400 hover:border-neutral-400',
            ].join(' ')}
          >
            <img
              src={lang.iconPath}
              alt={lang.name}
              width={16}
              height={16}
              className="shrink-0"
            />
            {lang.name}
          </button>
        )
      })}
    </div>
  )
}
