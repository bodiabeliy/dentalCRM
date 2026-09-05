export interface Clinic {
  id: string
  name: string
  address: string
  phone: string
  email: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateClinicRequest {
  name: string
  address: string
  phone: string
  email: string
}

export interface UpdateClinicRequest extends Partial<CreateClinicRequest> {
  id: string
}
