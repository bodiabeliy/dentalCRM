import { apiClient } from '../../../shared/api/client'
import type { Patient } from '../model/types'

export interface PatientsApiResponse {
  patients: Patient[]
  total: number
}

export interface CreatePatientRequest {
  name: string
  phoneNumber: string
  email?: string
  dateOfBirth?: string
  gender?: 'male' | 'female'
  address?: string
  comment?: string
}

export interface UpdatePatientRequest extends Partial<CreatePatientRequest> {
  id: string
}

export const patientsApi = {
  getPatients: async (): Promise<PatientsApiResponse> => {
    const response = await apiClient.get<PatientsApiResponse>('/patients')
    return response.data
  },

  getPatient: async (id: string): Promise<Patient> => {
    const response = await apiClient.get<Patient>(`/patients/${id}`)
    return response.data
  },

  createPatient: async (data: CreatePatientRequest): Promise<Patient> => {
    const response = await apiClient.post<Patient>('/patients', data)
    return response.data
  },

  updatePatient: async (data: UpdatePatientRequest): Promise<Patient> => {
    const response = await apiClient.put<Patient>(`/patients/${data.id}`, data)
    return response.data
  },

  deletePatient: async (id: string): Promise<void> => {
    await apiClient.delete(`/patients/${id}`)
  },
}
