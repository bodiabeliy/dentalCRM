import { apiClient } from '../../../shared/api/client'
import type {
  Appointment,
  CreateAppointmentRequest,
  UpdateAppointmentRequest,
  Doctor,
  Room,
  AppointmentStatus,
  Shift,
} from '../model/types'

export interface AppointmentsApiResponse {
  appointments: Appointment[]
  total: number
}

export interface DoctorsApiResponse {
  doctors: Doctor[]
}

export interface RoomsApiResponse {
  rooms: Room[]
}

export interface StatusesApiResponse {
  statuses: AppointmentStatus[]
}

export interface ShiftsApiResponse {
  shifts: Shift[]
}

export const appointmentApi = {
  getAppointments: async (params?: {
    date?: string
    doctorId?: string
    patientId?: string
  }): Promise<AppointmentsApiResponse> => {
    const response = await apiClient.get<AppointmentsApiResponse>('/appointments', { params })
    return response.data
  },

  getAppointment: async (id: string): Promise<Appointment> => {
    const response = await apiClient.get<Appointment>(`/appointments/${id}`)
    return response.data
  },

  createAppointment: async (data: CreateAppointmentRequest): Promise<Appointment> => {
    const response = await apiClient.post<Appointment>('/appointments', data)
    return response.data
  },

  updateAppointment: async (data: UpdateAppointmentRequest): Promise<Appointment> => {
    const response = await apiClient.put<Appointment>(`/appointments/${data.id}`, data)
    return response.data
  },

  deleteAppointment: async (id: string): Promise<void> => {
    await apiClient.delete(`/appointments/${id}`)
  },

  getDoctors: async (): Promise<DoctorsApiResponse> => {
    const response = await apiClient.get<DoctorsApiResponse>('/doctors')
    return response.data
  },

  getRooms: async (): Promise<RoomsApiResponse> => {
    const response = await apiClient.get<RoomsApiResponse>('/rooms')
    return response.data
  },

  getStatuses: async (): Promise<StatusesApiResponse> => {
    const response = await apiClient.get<StatusesApiResponse>('/appointment-statuses')
    return response.data
  },

  getShifts: async (params?: { date?: string; doctorId?: string }): Promise<ShiftsApiResponse> => {
    const response = await apiClient.get<ShiftsApiResponse>('/shifts', { params })
    return response.data
  },
}
