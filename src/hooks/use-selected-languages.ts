import { useSyncExternalStore } from "react";
import {
  DEFAULT_SELECTED,
  MAX_SELECTED,
  MIN_SELECTED,
  normalizeSelection,
  type LanguageId,
} from "@/lib/languages";
import { storage } from "@/lib/storage";

/**
 * The compared languages. Lives in the URL (?langs=go,rust) so a link shows the same
 * comparison, and in localStorage so a plain visit remembers the last choice.
 */
const KEY = "langs";
const listeners = new Set<() => void>();

let selected: LanguageId[] = initial();

function initial(): LanguageId[] {
  const fromUrl = normalizeSelection(new URLSearchParams(location.search).get(KEY)?.split(",") ?? []);
  if (fromUrl.length) return fromUrl;
  const fromStorage = normalizeSelection(storage.get(KEY)?.split(",") ?? []);
  return fromStorage.length ? fromStorage : DEFAULT_SELECTED;
}

function persist() {
  const value = selected.join(",");
  storage.set(KEY, value);
  const url = new URL(location.href);
  url.searchParams.set(KEY, value);
  history.replaceState(history.state, "", url);
}
persist();

function set(next: LanguageId[]) {
  const clean = normalizeSelection(next);
  if (clean.length < MIN_SELECTED) return;
  selected = clean;
  persist();
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useSelectedLanguages() {
  const value = useSyncExternalStore(subscribe, () => selected);
  return {
    selected: value,
    setSelected: set,
    /** Adds or removes one language, respecting MIN/MAX_SELECTED. */
    toggle(id: LanguageId) {
      if (value.includes(id)) set(value.filter((l) => l !== id));
      else if (value.length < MAX_SELECTED) set([...value, id]);
    },
    isFull: value.length >= MAX_SELECTED,
  };
}
