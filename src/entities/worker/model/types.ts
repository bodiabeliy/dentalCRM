export interface Worker {
  id: string
  name: string
  email: string
  branch: string
  role: string
  apiId: string
  color: string
  firstName?: string
  lastName?: string
  middleName?: string
  phone?: string
  rate1?: string
  rate2?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Role {
  id: string
  value: string
  label: string
  permissions: Permission[]
}

export interface Permission {
  id: string
  label: string
  values: boolean[]
}

export interface Branch {
  id: string
  name: string
  address: string
  usersCount: number
  isActive: boolean
}

export interface CreateWorkerRequest {
  firstName: string
  lastName: string
  middleName: string
  email: string
  phone: string
  role: string
  branch: string
  rate1: string
  rate2: string
  color: string
}

export interface UpdateWorkerRequest extends Partial<CreateWorkerRequest> {
  id: string
}
