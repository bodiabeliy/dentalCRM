import { apiClient } from '../../../shared/api/client'
import type { ApiResponse } from '../../../shared/api/client'

interface CalendarEvent {
  id: number
  title: string
  start: string
  end: string
}

export const getCalendarEvents = async (startDate: string, endDate: string): Promise<ApiResponse<CalendarEvent[]>> => {
  try {
    const response = await apiClient.get(`/calendar/events?start=${startDate}&end=${endDate}`)
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

export const createCalendarEvent = async (
  eventData: Omit<CalendarEvent, 'id'>
): Promise<ApiResponse<CalendarEvent>> => {
  try {
    const response = await apiClient.post('/calendar/events', eventData)
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
