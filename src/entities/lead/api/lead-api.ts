import { apiClient } from '../../../shared/api/client'
import type {
  Lead,
  CreateLeadRequest,
  UpdateLeadRequest,
  LeadStatus,
  LeadSource,
  LeadSortField,
  LeadSortDirection,
} from '../model/types'

export interface LeadsApiResponse {
  leads: Lead[]
  total: number
}

export interface LeadStatusesApiResponse {
  statuses: LeadStatus[]
}

export interface LeadSourcesApiResponse {
  sources: LeadSource[]
}

export const leadApi = {
  getLeads: async (params?: {
    status?: string
    source?: string
    search?: string
    sortField?: LeadSortField
    sortDirection?: LeadSortDirection
    page?: number
    limit?: number
  }): Promise<LeadsApiResponse> => {
    const response = await apiClient.get<LeadsApiResponse>('/leads', { params })
    return response.data
  },

  getLead: async (id: string): Promise<Lead> => {
    const response = await apiClient.get<Lead>(`/leads/${id}`)
    return response.data
  },

  createLead: async (data: CreateLeadRequest): Promise<Lead> => {
    const response = await apiClient.post<Lead>('/leads', data)
    return response.data
  },

  updateLead: async (data: UpdateLeadRequest): Promise<Lead> => {
    const response = await apiClient.put<Lead>(`/leads/${data.id}`, data)
    return response.data
  },

  deleteLead: async (id: string): Promise<void> => {
    await apiClient.delete(`/leads/${id}`)
  },

  getLeadStatuses: async (): Promise<LeadStatusesApiResponse> => {
    const response = await apiClient.get<LeadStatusesApiResponse>('/lead-statuses')
    return response.data
  },

  getLeadSources: async (): Promise<LeadSourcesApiResponse> => {
    const response = await apiClient.get<LeadSourcesApiResponse>('/lead-sources')
    return response.data
  },

  convertLeadToPatient: async (leadId: string): Promise<{ patientId: string }> => {
    const response = await apiClient.post<{ patientId: string }>(`/leads/${leadId}/convert`)
    return response.data
  },
}
