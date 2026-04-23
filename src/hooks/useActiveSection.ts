import { useEffect } from 'react'
import { useAppDispatch } from '../store/hooks'
import { setActiveSectionId } from '../store/ui.slice'
import { SECTIONS } from '../content/loader'

export function useActiveSection() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const ids = SECTIONS.map(s => s.id)
    const visible = new Set<string>()

    function report() {
      // Pick the topmost section that is currently intersecting
      dispatch(setActiveSectionId(ids.find(id => visible.has(id)) ?? null))
    }

    const observers = ids.flatMap(id => {
      const el = document.getElementById(id)
      if (!el) return []
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) visible.add(id)
          else visible.delete(id)
          report()
        },
        // top offset = sticky header (56px); bottom crop = 55% of viewport
        { rootMargin: '-56px 0px -55% 0px' },
      )
      obs.observe(el)
      return [obs]
    })

    return () => observers.forEach(o => o.disconnect())
  }, [dispatch])
}
