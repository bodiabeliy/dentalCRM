import { apiClient } from '../../../shared/api/client'
import type { ApiResponse } from '../../../shared/api/client'

interface UserSettings {
  id: number
  theme: 'light' | 'dark'
  language: string
  notifications: boolean
  // Add more settings as needed
}

export const getUserSettings = async (): Promise<ApiResponse<UserSettings>> => {
  try {
    const response = await apiClient.get('/settings/user')
    return {
      success: true,
      data: response.data,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

export const updateUserSettings = async (settings: Partial<UserSettings>): Promise<ApiResponse<UserSettings>> => {
  try {
    const response = await apiClient.put('/settings/user', settings)
    return {
      success: true,
      data: response.data,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

export const getSystemSettings = async (): Promise<ApiResponse<Record<string, unknown>>> => {
  try {
    const response = await apiClient.get('/settings/system')
    return {
      success: true,
      data: response.data,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}
