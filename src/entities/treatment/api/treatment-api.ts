import { apiClient } from '../../../shared/api/client'
import type {
  TreatmentPlan,
  CreateTreatmentPlanRequest,
  UpdateTreatmentPlanRequest,
  TreatmentProcedure,
  CreateProcedureRequest,
  UpdateProcedureRequest,
} from '../model/types'

export interface TreatmentPlansApiResponse {
  treatmentPlans: TreatmentPlan[]
  total: number
}

export interface ProceduresApiResponse {
  procedures: TreatmentProcedure[]
  total: number
}

export const treatmentApi = {
  getTreatmentPlans: async (params?: {
    patientId?: string
    doctorId?: string
    status?: string
  }): Promise<TreatmentPlansApiResponse> => {
    const response = await apiClient.get<TreatmentPlansApiResponse>('/treatment-plans', { params })
    return response.data
  },

  getTreatmentPlan: async (id: string): Promise<TreatmentPlan> => {
    const response = await apiClient.get<TreatmentPlan>(`/treatment-plans/${id}`)
    return response.data
  },

  createTreatmentPlan: async (data: CreateTreatmentPlanRequest): Promise<TreatmentPlan> => {
    const response = await apiClient.post<TreatmentPlan>('/treatment-plans', data)
    return response.data
  },

  updateTreatmentPlan: async (data: UpdateTreatmentPlanRequest): Promise<TreatmentPlan> => {
    const response = await apiClient.put<TreatmentPlan>(`/treatment-plans/${data.id}`, data)
    return response.data
  },

  deleteTreatmentPlan: async (id: string): Promise<void> => {
    await apiClient.delete(`/treatment-plans/${id}`)
  },

  getProcedures: async (params?: { category?: string; search?: string }): Promise<ProceduresApiResponse> => {
    const response = await apiClient.get<ProceduresApiResponse>('/procedures', { params })
    return response.data
  },

  getProcedure: async (id: string): Promise<TreatmentProcedure> => {
    const response = await apiClient.get<TreatmentProcedure>(`/procedures/${id}`)
    return response.data
  },

  createProcedure: async (data: CreateProcedureRequest): Promise<TreatmentProcedure> => {
    const response = await apiClient.post<TreatmentProcedure>('/procedures', data)
    return response.data
  },

  updateProcedure: async (data: UpdateProcedureRequest): Promise<TreatmentProcedure> => {
    const response = await apiClient.put<TreatmentProcedure>(`/procedures/${data.id}`, data)
    return response.data
  },

  deleteProcedure: async (id: string): Promise<void> => {
    await apiClient.delete(`/procedures/${id}`)
  },
}
