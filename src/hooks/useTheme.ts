import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setTheme } from '../store/ui.slice'

export function useTheme() {
  const dispatch = useAppDispatch()
  const theme = useAppSelector(s => s.ui.theme)

  // One-time init: read localStorage or system preference
  useEffect(() => {
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | null
    if (stored === 'light' || stored === 'dark') {
      dispatch(setTheme(stored))
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      dispatch(setTheme('dark'))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Sync .dark class on <html> and persist choice
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  return theme
}
