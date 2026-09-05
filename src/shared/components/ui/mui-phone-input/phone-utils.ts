import { getCountryCallingCode } from 'react-phone-number-input'

/** Returns "+<dial>" for a given ISO country (e.g., "US" -> "+1"). */
export const getDialCodeForCountry = (country: string): string => {
  try {
    // @ts-expect-error: Library expects CountryCode union but we pass string
    const dial = getCountryCallingCode(country as string)
    return `+${dial}`
  } catch {
    return ''
  }
}

/**
 * Removes the leading "+<dial>" from a phone string and returns only the national significant number (digits).
 * Works for dial code lengths 1-3.
 */
export const stripDialCode = (phone: string, country: string): string => {
  if (!phone) return ''
  const only = String(phone).replace(/[^\d+]/g, '')
  const dial = getDialCodeForCountry(country).replace('+', '')
  if (!dial) return only.replace(/\D/g, '')
  if (only.startsWith('+' + dial)) {
    return only.slice(dial.length + 1).replace(/\D/g, '')
  }
  if (only.startsWith(dial)) {
    return only.slice(dial.length).replace(/\D/g, '')
  }
  return only.replace(/\D/g, '')
}

/** Builds an E.164 phone string from national number and country (e.g., "232434545", "US" -> "+1232434545"). */
export const buildE164 = (nationalNumber: string, country: string): string => {
  const digits = String(nationalNumber || '').replace(/\D/g, '')
  const dial = getDialCodeForCountry(country).replace('+', '')
  return dial ? `+${dial}${digits}` : `+${digits}`
}
