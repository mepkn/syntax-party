import { useQueryState, parseAsArrayOf, parseAsStringEnum } from 'nuqs'
import { LANGUAGE_IDS } from '../config/languages'

export function useSelectedLanguages() {
  return useQueryState(
    'l',
    parseAsArrayOf(parseAsStringEnum([...LANGUAGE_IDS])).withDefault(['javascript', 'python']),
  )
}
