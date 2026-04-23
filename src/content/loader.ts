import { LANGUAGE_IDS } from '../config/languages'
import type { LanguageId } from '../config/languages'
import type { Section } from './types'

const loaders = import.meta.glob('/content/**/*.md', {
  query: '?raw',
  import: 'default',
}) as Record<string, () => Promise<string>>

function toTitle(slug: string): string {
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
}

function parseKey(key: string) {
  // key shape: '/content/2-variables/1-declare/javascript.md'
  const parts = key.split('/')
  const sectionFolder = parts[2]
  const featureFolder = parts[3]
  const langFile      = parts[4]

  const [sectionOrderStr, ...sectionSlugParts] = sectionFolder.split('-')
  const sectionId    = sectionSlugParts.join('-')

  const [featureOrderStr, ...featureSlugParts] = featureFolder.split('-')
  const featureId    = featureSlugParts.join('-')

  return {
    sectionOrder: parseInt(sectionOrderStr, 10),
    sectionId,
    sectionTitle: toTitle(sectionId),
    featureOrder: parseInt(featureOrderStr, 10),
    featureId,
    featureTitle: toTitle(featureId),
    languageId: langFile.replace('.md', ''),
  }
}

function buildTree(): Section[] {
  const sectionsMap = new Map<string, Section>()

  for (const [key, loader] of Object.entries(loaders)) {
    const { sectionOrder, sectionId, sectionTitle, featureOrder, featureId, featureTitle, languageId } = parseKey(key)

    if (!(LANGUAGE_IDS as readonly string[]).includes(languageId)) continue

    if (!sectionsMap.has(sectionId)) {
      sectionsMap.set(sectionId, { id: sectionId, title: sectionTitle, order: sectionOrder, features: [] })
    }

    const section = sectionsMap.get(sectionId)!
    let feature = section.features.find(f => f.id === featureId)
    if (!feature) {
      feature = { id: featureId, title: featureTitle, order: featureOrder, snippets: {} }
      section.features.push(feature)
    }

    feature.snippets[languageId as LanguageId] = loader
  }

  return [...sectionsMap.values()]
    .sort((a, b) => a.order - b.order)
    .map(section => ({
      ...section,
      features: [...section.features].sort((a, b) => a.order - b.order),
    }))
}

export const SECTIONS: Section[] = buildTree()

export function findLoader(
  sectionId: string,
  featureId: string,
  languageId: LanguageId,
): (() => Promise<string>) | undefined {
  return SECTIONS
    .find(s => s.id === sectionId)
    ?.features.find(f => f.id === featureId)
    ?.snippets[languageId]
}
