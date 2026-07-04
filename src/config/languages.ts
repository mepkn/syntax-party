export const LANGUAGE_IDS = ['javascript', 'python', 'go', 'ruby'] as const
export type LanguageId = typeof LANGUAGE_IDS[number]

export interface Language {
  id: LanguageId
  name: string
  shikiLang: string
  iconPath: string
  color: string
  docsUrl: string
  order: number
}

export const LANGUAGES: Record<LanguageId, Language> = {
  javascript: {
    id: 'javascript',
    name: 'JavaScript',
    shikiLang: 'javascript',
    iconPath: '/icons/javascript.svg',
    color: '#F7DF1E',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    order: 1,
  },
  python: {
    id: 'python',
    name: 'Python',
    shikiLang: 'python',
    iconPath: '/icons/python.svg',
    color: '#3776AB',
    docsUrl: 'https://docs.python.org/3/',
    order: 2,
  },
  go: {
    id: 'go',
    name: 'Go',
    shikiLang: 'go',
    iconPath: '/icons/go.svg',
    color: '#00ADD8',
    docsUrl: 'https://go.dev/doc/',
    order: 3,
  },
  ruby: {
    id: 'ruby',
    name: 'Ruby',
    shikiLang: 'ruby',
    iconPath: '/icons/ruby.svg',
    color: '#CC342D',
    docsUrl: 'https://docs.ruby-lang.org/en/',
    order: 4,
  },
}
