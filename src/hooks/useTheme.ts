import { useEffect } from 'react'
import { useAppSelector } from '../store/hooks'

export function useTheme() {
  const theme = useAppSelector(s => s.ui.theme)

  // Sync .dark class on <html> and persist to localStorage whenever theme changes.
  // Initial state comes from localStorage via getInitialTheme() in ui.slice, so
  // this effect on first render writes the already-correct value — no extra render needed.
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  return theme
}
