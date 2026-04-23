import LanguageToggle from './LanguageToggle'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header className="sticky top-0 z-10 h-14 shrink-0 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-4 flex items-center gap-3">
      <a href="/" className="font-bold text-[17px] tracking-tight shrink-0 text-neutral-900 dark:text-white">
        syntax<span className="text-sky-500">·</span>party
      </a>
      <div className="w-px h-5 bg-neutral-200 dark:bg-neutral-700 shrink-0" />
      <div className="flex-1 min-w-0 overflow-x-auto">
        <LanguageToggle />
      </div>
      <ThemeToggle />
    </header>
  )
}
