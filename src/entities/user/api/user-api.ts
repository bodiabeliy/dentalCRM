import { apiClient } from '../../../shared/api/client'
import type {
  User,
  UserSettings,
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  UpdateProfileRequest,
  ChangePasswordRequest,
  UpdateSettingsRequest,
  AuthResponse,
} from '../model/types'

export const userApi = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/login', data)
    return response.data
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/register', data)
    return response.data
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout')
  },

  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/refresh', { refreshToken })
    return response.data
  },

  forgotPassword: async (data: ForgotPasswordRequest): Promise<{ message: string }> => {
    const response = await apiClient.post<{ message: string }>('/auth/forgot-password', data)
    return response.data
  },

  resetPassword: async (data: ResetPasswordRequest): Promise<{ message: string }> => {
    const response = await apiClient.post<{ message: string }>('/auth/reset-password', data)
    return response.data
  },

  getProfile: async (): Promise<User> => {
    const response = await apiClient.get<User>('/users/profile')
    return response.data
  },

  updateProfile: async (data: UpdateProfileRequest): Promise<User> => {
    const response = await apiClient.put<User>('/users/profile', data)
    return response.data
  },

  changePassword: async (data: ChangePasswordRequest): Promise<{ message: string }> => {
    const response = await apiClient.put<{ message: string }>('/users/change-password', data)
    return response.data
  },

  getSettings: async (): Promise<UserSettings> => {
    const response = await apiClient.get<UserSettings>('/users/settings')
    return response.data
  },

  updateSettings: async (data: UpdateSettingsRequest): Promise<UserSettings> => {
    const response = await apiClient.put<UserSettings>('/users/settings', data)
    return response.data
  },

  getUsers: async (): Promise<{ users: User[]; total: number }> => {
    const response = await apiClient.get<{ users: User[]; total: number }>('/users')
    return response.data
  },

  getUser: async (id: string): Promise<User> => {
    const response = await apiClient.get<User>(`/users/${id}`)
    return response.data
  },

  createUser: async (data: Omit<RegisterRequest, 'confirmPassword'> & { role: string }): Promise<User> => {
    const response = await apiClient.post<User>('/users', data)
    return response.data
  },

  updateUser: async (id: string, data: Partial<User>): Promise<User> => {
    const response = await apiClient.put<User>(`/users/${id}`, data)
    return response.data
  },

  deleteUser: async (id: string): Promise<void> => {
    await apiClient.delete(`/users/${id}`)
  },
}
