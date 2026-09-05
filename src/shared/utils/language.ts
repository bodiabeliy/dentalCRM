import i18n from './i18n'
import { systemLanguage } from '../../app/constants'

// Map UI names (UKR/UK), ISO codes (uk/en), and localized titles to ISO code
export function normalizeToLangCode(name?: string): string {
  const original = (name || '').trim()
  const upper = original.toUpperCase()
  const norm = original.toLowerCase()
  if (upper === 'UKR') return 'uk'
  if (upper === 'UK') return 'en'
  if (norm === 'uk' || norm === 'українська' || norm === 'ukrainian') return 'uk'
  if (norm === 'en' || norm === 'english') return 'en'
  const match = systemLanguage.find((l) => l.title.toLowerCase() === norm || l.name.toLowerCase() === norm)
  if (match) return match.name.toUpperCase() === 'UKR' ? 'uk' : 'en'
  return norm
}

// Map ISO code or title/name to UI option name (UKR/UK)
export function codeToUiName(code?: string): 'UKR' | 'UK' | string {
  const norm = (code || '').toLowerCase().trim()
  if (norm === 'uk') return 'UKR'
  if (norm === 'en') return 'UK'
  if (norm === 'ukr' || norm === 'uk') return norm.toUpperCase() as 'UKR' | 'UK'
  if (norm === 'українська' || norm === 'ukrainian') return 'UKR'
  if (norm === 'english') return 'UK'
  const match = systemLanguage.find((l) => l.title.toLowerCase() === norm || l.name.toLowerCase() === norm)
  if (match) return match.name
  return (code || '').toUpperCase()
}

// Decide which language should be shown in the Select on page entry
export function resolveInitialUiLangName(userLang?: string): 'UKR' | 'UK' | string {
  let stored: string | null = null
  try {
    stored = sessionStorage.getItem('appLanguage')
  } catch {
    // ignore
  }
  const i18nCode = (i18n.language || '').split('-')[0]
  const preferredCode = stored || i18nCode || userLang
  return codeToUiName(preferredCode)
}

// Change app language and persist; accepts UI name or code
export function changeAppLanguage(lang: string): string {
  const code = normalizeToLangCode(lang)
  i18n.changeLanguage(code)
  try {
    sessionStorage.setItem('appLanguage', code)
  } catch {
    // ignore
  }
  return code
}
