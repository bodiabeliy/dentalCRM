import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { getUserSettings, updateUserSettings, getAllCabinets, getAllDoctors } from '../../schedule/api/schedule-api'
import type { UserSettings, Cabinet, Doctor } from '../../schedule/api/schedule-api'

interface SettingsContextType {
  settings: UserSettings | null
  cabinets: Cabinet[]
  doctors: Doctor[]
  isLoading: boolean
  error: Error | null
  updateSettings: (newSettings: Partial<UserSettings>) => Promise<void>
  resetSettings: () => Promise<void>
  refetchSettings: () => Promise<void>
}

const SettingsContext = createContext<SettingsContextType | null>(null)

interface SettingsProviderProps {
  children: React.ReactNode
}

export function SettingsProvider({ children }: SettingsProviderProps) {
  const [settings, setSettings] = useState<UserSettings | null>(null)
  const [cabinets, setCabinets] = useState<Cabinet[]>([])
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchSettings = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const [settingsResponse, cabinetsResponse, doctorsResponse] = await Promise.all([
        getUserSettings(),
        getAllCabinets(),
        getAllDoctors(),
      ])

      if (settingsResponse.success && settingsResponse.data) {
        setSettings(settingsResponse.data)
      }

      if (cabinetsResponse.success && cabinetsResponse.data) {
        setCabinets(cabinetsResponse.data)
      }

      if (doctorsResponse.success && doctorsResponse.data) {
        setDoctors(doctorsResponse.data)
      }
    } catch (e) {
      setError(e as Error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const updateSettings = useCallback(
    async (newSettings: Partial<UserSettings>) => {
      if (!settings) return

      const updatedSettings = { ...settings, ...newSettings }

      try {
        const response = await updateUserSettings(updatedSettings)
        if (response.success && response.data) {
          setSettings(response.data)
        } else {
          throw new Error(response.error || 'Failed to update settings')
        }
      } catch (e) {
        setError(e as Error)
        throw e
      }
    },
    [settings]
  )

  const resetSettings = useCallback(async () => {
    if (!settings) return

    const defaultSettings: UserSettings = {
      id: settings.id,
      userId: settings.userId,
      enabledCabinets: [1, 2, 3],
      selectedDoctor: null,
      showOnlySelectedDoctor: false,
      numberOfDays: 5,
      scheduleSize: 'none',
    }

    try {
      const response = await updateUserSettings(defaultSettings)
      if (response.success && response.data) {
        setSettings(response.data)
      } else {
        throw new Error(response.error || 'Failed to reset settings')
      }
    } catch (e) {
      setError(e as Error)
      throw e
    }
  }, [settings])

  const refetchSettings = useCallback(async () => {
    await fetchSettings()
  }, [fetchSettings])

  useEffect(() => {
    fetchSettings()
  }, [fetchSettings])

  const value: SettingsContextType = {
    settings,
    cabinets,
    doctors,
    isLoading,
    error,
    updateSettings,
    resetSettings,
    refetchSettings,
  }

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}
