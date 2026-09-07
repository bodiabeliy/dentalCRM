// apiClient is no longer used as we're using mock data
// import { apiClient } from '../../../shared/api/client'
import type { ApiResponse } from '../../../shared/api/client'
import type { PatientsStatuses } from '../../calendar'
import type { Event, Visit, ScheduleData, MultiDayScheduleData } from '../types/schedule-types'
import { format } from 'date-fns'

export interface Cabinet {
  id: number
  name: string
  color: string
}

export interface Doctor {
  id: number
  name: string
  avatar: string
  color: string
}

export interface UserSettings {
  id: number
  userId: number
  enabledCabinets: number[]
  selectedDoctor: number | null
  showOnlySelectedDoctor: boolean
  numberOfDays: number
  scheduleSize: 'none' | 'shrink'
}

export const mapApiVisitToEvent = (
  visit: Visit & {
    patientId?: number
    planned_start?: string
    planned_end?: string
    actual_start?: string
    actual_end?: string
    assistant?: { id: number; name: string; avatar: string }
    doctorId?: number
  },
  cabinetId: number,
  date: string,
  patients?: Visit['patient'][],
  doctors?: Doctor[]
): Event => {
  const visitStart = new Date(visit.visit_start)
  const visitEnd = new Date(visit.visit_end)

  if (visit.type === 'assistant') {
    // @ts-expect-error - TODO: fix this
    return {
      id: visit.id,
      roomId: cabinetId,
      doctorId: 0,
      patientId: 0,
      start: format(visitStart, 'HH:mm'),
      end: format(visitEnd, 'HH:mm'),
      status: visit.status,
      note: visit.note,
      type: 'assistant',
      date: date,
      assistant: visit.assistant || { id: 0, name: '', avatar: '' },
      planned_start: visit.planned_start,
      planned_end: visit.planned_end,
      actual_start: visit.actual_start,
      actual_end: visit.actual_end,
    }
  }

  const patientId = visit.patientId ?? visit.patient?.id
  let patient = visit.patient
  if (!patient && patients && patientId) {
    patient = patients.find((p) => p.id === patientId)
  }

  if (!patient) {
    throw new Error(`Patient not found for visit ${visit.id}`)
  }

  let doctor = visit.doctor
  if (!doctor && doctors && visit.doctorId) {
    const foundDoctor = doctors.find((d) => d.id === visit.doctorId)
    if (foundDoctor) {
      doctor = foundDoctor
    }
  }

  if (!doctor) {
    throw new Error(`Doctor not found for visit ${visit.id}`)
  }

  // Always include doctor.color
  let doctorColor = doctor.color
  if (!doctorColor && doctors) {
    const foundDoctor = doctors.find((d) => d.id === doctor.id)
    if (foundDoctor) doctorColor = foundDoctor.color
  }
  doctor = { ...doctor, color: doctorColor || '' }

  return {
    id: visit.id,
    roomId: cabinetId,
    doctorId: visit.doctorId || doctor.id,
    patientId: patientId ?? 0,
    start: format(visitStart, 'HH:mm'),
    end: format(visitEnd, 'HH:mm'),
    status: visit.status,
    note: visit.note,
    type: 'visit',
    characteristic: visit.characteristic,
    date: date,
    patient: patient as Visit['patient'],
    doctor: doctor as Visit['doctor'],
  }
}

// Event to Visit mapping functionality has been removed
// as it's no longer needed with the mock data approach

export const fetchScheduleData = async (dateKey: string): Promise<ApiResponse<ScheduleData>> => {
  try {
    // Return mock data instead of making API call to non-existent endpoint
    console.info('Using mock schedule data - fetchScheduleData')

    // Create an empty schedule structure for the requested date
    const emptyScheduleData: ScheduleData = {
      date_from: dateKey,
      days: 5,
      cabinets: [
        {
          id: 1,
          name: 'Кабінет 1',
          color: '#FFDDC1',
          shifts: [],
        },
        {
          id: 2,
          name: 'Кабінет 2',
          color: '#C1FFD7',
          shifts: [],
        },
      ],
    }

    return {
      success: true,
      data: emptyScheduleData,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

export const fetchAllScheduleData = async (): Promise<ApiResponse<MultiDayScheduleData>> => {
  try {
    // Return mock data instead of making API call to non-existent endpoint
    console.info('Using mock schedule data - fetchAllScheduleData')

    // Create empty mock data
    const mockScheduleData: MultiDayScheduleData = {}

    // Current date as string in YYYY-MM-DD format
    const today = new Date()
    const dateKey = format(today, 'yyyy-MM-dd')

    // Add empty schedule data for today
    mockScheduleData[dateKey] = {
      date_from: dateKey,
      days: 5,
      cabinets: [
        {
          id: 1,
          name: 'Кабінет 1',
          color: '#FFDDC1',
          shifts: [],
        },
        {
          id: 2,
          name: 'Кабінет 2',
          color: '#C1FFD7',
          shifts: [],
        },
      ],
    }

    return {
      success: true,
      data: mockScheduleData,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

export const updateEvent = async (event: Event): Promise<ApiResponse<Event>> => {
  try {
    console.info('Mock update event called:', event)

    // Just return success since we're not actually updating anything in the API
    return {
      success: true,
      data: event,
    }
  } catch (error) {
    console.error('Error updating event:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

export const deleteEvent = async (eventId: number): Promise<ApiResponse<boolean>> => {
  try {
    console.info('Mock delete event called for ID:', eventId)

    // Just return success since we're not actually deleting anything in the API
    return {
      success: true,
      data: true,
    }
  } catch (error) {
    console.error('Error deleting event:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

export const createEvent = async (event: Omit<Event, 'id'> & { shiftId?: number }): Promise<ApiResponse<Event>> => {
  try {
    const newId = Date.now()
    console.info('Mock create event called:', { ...event, id: newId })

    // Just return success with the new ID since we're not actually creating anything in the API
    return {
      success: true,
      data: { ...event, id: newId },
    }
  } catch (error) {
    console.error('Error creating event:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

export const getAllPatients = async (): Promise<ApiResponse<Visit['patient'][]>> => {
  try {
    // Return mock patient data
    console.info('Using mock patients data')
    const mockPatients = [
      {
        id: 1,
        name: 'Іван Петренко',
        avatar: '',
        age: 35,
        phone: '+380991234567',
        important_note: '',
        advance: 0,
      },
      {
        id: 2,
        name: 'Марія Коваль',
        avatar: '',
        age: 28,
        phone: '+380992345678',
        important_note: 'Алергія на пеніцилін',
        advance: 500,
      },
    ]

    return {
      success: true,
      data: mockPatients,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

export const getAllDoctors = async (): Promise<ApiResponse<Doctor[]>> => {
  try {
    // Return mock doctor data
    console.info('Using mock doctors data')
    const mockDoctors = [
      {
        id: 1,
        name: 'Др. Олександр Мельник',
        avatar: '',
        color: '#4285F4',
      },
      {
        id: 2,
        name: 'Др. Тетяна Шевченко',
        avatar: '',
        color: '#EA4335',
      },
    ]

    return {
      success: true,
      data: mockDoctors,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

export const getAllCabinets = async (): Promise<ApiResponse<Cabinet[]>> => {
  try {
    // Return mock cabinet data
    console.info('Using mock cabinets data')
    const mockCabinets = [
      {
        id: 1,
        name: 'Кабінет 1',
        color: '#FFDDC1',
      },
      {
        id: 2,
        name: 'Кабінет 2',
        color: '#C1FFD7',
      },
      {
        id: 3,
        name: 'Кабінет 3',
        color: '#FFC1C1',
      },
    ]

    return {
      success: true,
      data: mockCabinets,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

export const getUserSettings = async (userId: number = 1): Promise<ApiResponse<UserSettings>> => {
  try {
    // Return mock user settings
    console.info('Using mock user settings data')
    const defaultSettings = {
      id: 1,
      userId,
      enabledCabinets: [1, 2, 3],
      selectedDoctor: null,
      showOnlySelectedDoctor: false,
      numberOfDays: 5,
      scheduleSize: 'none' as const,
    }

    return {
      success: true,
      data: defaultSettings,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

export const updateUserSettings = async (settings: UserSettings): Promise<ApiResponse<UserSettings>> => {
  try {
    // Just log the settings that would be updated
    console.info('Mock update user settings called:', settings)

    return {
      success: true,
      data: settings,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

export const getAllRooms = async (): Promise<ApiResponse<{ id: number; name: string; color: string }[]>> => {
  // Reuse the same mock data from getAllCabinets
  return getAllCabinets()
}

export const getPatientsStatuses = async (): Promise<ApiResponse<{ id: number; value: PatientsStatuses }[]>> => {
  try {
    // Return mock patient statuses
    console.info('Using mock patient statuses data')
    const mockPatientStatuses = [
      {
        id: 1,
        value: 'confirmed' as PatientsStatuses,
      },
      {
        id: 2,
        value: 'arrived' as PatientsStatuses,
      },
      {
        id: 3,
        value: 'in-progress' as PatientsStatuses,
      },
      {
        id: 4,
        value: 'completed' as PatientsStatuses,
      },
      {
        id: 5,
        value: 'canceled' as PatientsStatuses,
      },
    ]

    return {
      success: true,
      data: mockPatientStatuses,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}
