import { useEffect, useState } from "react";

/**
 * Which of `ids` (element ids, in document order) is currently being read: the first
 * one inside a band starting `offset` px from the top (below the sticky header) and
 * ending at 30% of the viewport height.
 *
 * One IntersectionObserver, no scroll listeners. The set of visible ids is kept across
 * callbacks (each callback only reports the elements that changed), and the observer
 * is rebuilt whenever `ids` changes, so content that loads or is edited later is tracked.
 */
export function useScrollSpy(ids: readonly string[], offset = 0): string | null {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join("\n");

  useEffect(() => {
    const list = key ? key.split("\n") : [];
    const elements = list.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const first = list.find((id) => visible.has(id));
        if (first) {
          setActive(first);
          return;
        }
        // Nothing in the band (e.g. a tall element spans it): keep the last one
        // whose top has scrolled above the band.
        const above = elements.filter((el) => el.getBoundingClientRect().top < offset).at(-1);
        if (above) setActive(above.id);
      },
      { rootMargin: `-${offset}px 0px -70% 0px` },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [key, offset]);

  return active;
}
