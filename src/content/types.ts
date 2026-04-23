import type { LanguageId } from '../config/languages'

export interface Feature {
  id: string
  title: string
  order: number
  snippets: Partial<Record<LanguageId, () => Promise<string>>>
}

export interface Section {
  id: string
  title: string
  order: number
  features: Feature[]
}
