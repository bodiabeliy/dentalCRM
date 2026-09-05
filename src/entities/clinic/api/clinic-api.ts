import { apiClient } from '../../../shared/api/client'
import type { Clinic, CreateClinicRequest, UpdateClinicRequest } from '../model/types'

export interface ClinicsApiResponse {
  clinics: Clinic[]
  total: number
}

export const clinicApi = {
  getClinics: async (): Promise<ClinicsApiResponse> => {
    const response = await apiClient.get<ClinicsApiResponse>('/clinics')
    return response.data
  },

  getClinic: async (id: string): Promise<Clinic> => {
    const response = await apiClient.get<Clinic>(`/clinics/${id}`)
    return response.data
  },

  createClinic: async (data: CreateClinicRequest): Promise<Clinic> => {
    const response = await apiClient.post<Clinic>('/clinics', data)
    return response.data
  },

  updateClinic: async (data: UpdateClinicRequest): Promise<Clinic> => {
    const response = await apiClient.put<Clinic>(`/clinics/${data.id}`, data)
    return response.data
  },

  deleteClinic: async (id: string): Promise<void> => {
    await apiClient.delete(`/clinics/${id}`)
  },
}
