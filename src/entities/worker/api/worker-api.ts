import { apiClient } from '../../../shared/api/client'
import type { Worker, CreateWorkerRequest, UpdateWorkerRequest, Role, Branch } from '../model/types'

export interface WorkersApiResponse {
  workers: Worker[]
  total: number
}

export interface RolesApiResponse {
  roles: Role[]
}

export interface BranchesApiResponse {
  branches: Branch[]
}

export const workerApi = {
  getWorkers: async (): Promise<WorkersApiResponse> => {
    const response = await apiClient.get<WorkersApiResponse>('/workers')
    return response.data
  },

  getWorker: async (id: string): Promise<Worker> => {
    const response = await apiClient.get<Worker>(`/workers/${id}`)
    return response.data
  },

  createWorker: async (data: CreateWorkerRequest): Promise<Worker> => {
    const response = await apiClient.post<Worker>('/workers', data)
    return response.data
  },

  updateWorker: async (data: UpdateWorkerRequest): Promise<Worker> => {
    const response = await apiClient.put<Worker>(`/workers/${data.id}`, data)
    return response.data
  },

  deleteWorker: async (id: string): Promise<void> => {
    await apiClient.delete(`/workers/${id}`)
  },

  getRoles: async (): Promise<RolesApiResponse> => {
    const response = await apiClient.get<RolesApiResponse>('/roles')
    return response.data
  },

  getBranches: async (): Promise<BranchesApiResponse> => {
    const response = await apiClient.get<BranchesApiResponse>('/branches')
    return response.data
  },
}
