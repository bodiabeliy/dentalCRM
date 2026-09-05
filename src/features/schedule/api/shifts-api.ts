import { apiClient } from '../../../shared/api/client'
import type { ApiResponse } from '../../../shared/api/client'
import type { Shift, ReservedTime, Cabinet } from '../types/schedule-types'

export const getShifts = async (): Promise<ApiResponse<Shift[]>> => {
  try {
    const res = await apiClient.get<Shift[]>('/shifts')
    return { success: true, data: res.data }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export const createShift = async (
  shift: Omit<Shift, 'id' | 'visits' | 'reservedTimes'>
): Promise<ApiResponse<Shift>> => {
  try {
    const scheduleRes = await apiClient.get('/clinics/1/schedule')
    const allScheduleData = scheduleRes.data
    if (!allScheduleData) return { success: false, error: 'Schedule data not found' }

    const dayData = allScheduleData[shift.date]
    if (!dayData) return { success: false, error: 'Day not found' }

    const cabinet: Cabinet | undefined = dayData.cabinets.find((c: Cabinet) => c.id === shift.cabinetId)
    if (!cabinet) return { success: false, error: 'Cabinet not found' }

    if (!cabinet.shifts) cabinet.shifts = []
    const newId = cabinet.shifts.length > 0 ? Math.max(...cabinet.shifts.map((s: Shift) => s.id || 0)) + 1 : 1
    const newShift: Shift = {
      ...shift,
      id: newId,
      visits: [],
      reservedTimes: [],
    }
    cabinet.shifts.push(newShift)

    await apiClient.put('/clinics/1/schedule', allScheduleData)
    return { success: true, data: newShift }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export const updateShift = async (id: number, updates: Partial<Shift>): Promise<ApiResponse<Shift>> => {
  try {
    const res = await apiClient.patch<Shift>(`/shifts/${id}`, updates)
    return { success: true, data: res.data }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export const deleteShift = async (id: number): Promise<ApiResponse<null>> => {
  try {
    await apiClient.delete(`/shifts/${id}`)
    return { success: true, data: null }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export const addReservedTimeToShift = async (
  shiftId: number,
  reservedTime: Omit<ReservedTime, 'id'>
): Promise<ApiResponse<Shift>> => {
  try {
    const shiftRes = await apiClient.get<Shift>(`/shifts/${shiftId}`)
    const reservedTimes = shiftRes.data.reservedTimes || []
    const newId = reservedTimes.length > 0 ? Math.max(...reservedTimes.map((r) => r.id)) + 1 : 1
    const newReservedTime = { ...reservedTime, id: newId }
    const updated = await apiClient.patch<Shift>(`/shifts/${shiftId}`, {
      reservedTimes: [...reservedTimes, newReservedTime],
    })
    return { success: true, data: updated.data }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export const removeReservedTimeFromShift = async (
  shiftId: number,
  reservedTimeId: number
): Promise<ApiResponse<Shift>> => {
  try {
    const shiftRes = await apiClient.get<Shift>(`/shifts/${shiftId}`)
    const reservedTimes = shiftRes.data.reservedTimes || []
    const updated = await apiClient.patch<Shift>(`/shifts/${shiftId}`, {
      reservedTimes: reservedTimes.filter((r) => r.id !== reservedTimeId),
    })
    return { success: true, data: updated.data }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}
