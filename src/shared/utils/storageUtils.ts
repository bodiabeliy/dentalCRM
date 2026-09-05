// Constants for storage keys
const STORAGE_KEYS = {
  TOKEN: 'token',
  LAST_CLINIC_ID: 'lastClinicId',
}

// Get the authentication token
export const getToken = (): string | null => {
  return sessionStorage.getItem(STORAGE_KEYS.TOKEN)
}

// Set the authentication token
export const setToken = (token: string): void => {
  sessionStorage.setItem(STORAGE_KEYS.TOKEN, token)
}

// Save the last selected clinic ID
export const saveLastClinicId = (clinicId: string): void => {
  try {
    sessionStorage.setItem(STORAGE_KEYS.LAST_CLINIC_ID, clinicId)
  } catch (error) {
    console.error('Error saving last clinic ID to sessionStorage:', error)
  }
}

// Get the last selected clinic ID
export const getLastClinicId = (): string | null => {
  try {
    return sessionStorage.getItem(STORAGE_KEYS.LAST_CLINIC_ID)
  } catch (error) {
    console.error('Error getting last clinic ID from sessionStorage:', error)
    return null
  }
}

// remove the last selected clinic ID
export const removeLastClinicId = () => {
  try {
    sessionStorage.removeItem(STORAGE_KEYS.LAST_CLINIC_ID)
  } catch (error) {
    console.error('Error getting last clinic ID from sessionStorage:', error)
    return null
  }
}

// Legacy export for backward compatibility
export const token = getToken()
