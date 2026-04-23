import LanguageToggle from './LanguageToggle'

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-6 py-3 flex flex-wrap items-center gap-4">
      <a href="/" className="font-bold text-lg tracking-tight shrink-0">
        syntax<span className="text-sky-500">·</span>party
      </a>
      <LanguageToggle />
    </header>
  )
}
