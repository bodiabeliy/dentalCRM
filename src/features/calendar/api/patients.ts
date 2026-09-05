import { apiClient } from '../../../shared'

export interface NewPatient {
  lastName: string
  firstName: string
  phone: string
  birthDate: string
  referral: string
  sex: string
  patronymic: string
}

export async function addPatient(patient: NewPatient) {
  const response = await apiClient.post('/patients', patient)
  return response.data
}

export async function getAllPatients() {
  const response = await apiClient.get('/patients')
  return { success: true, data: response.data }
}
