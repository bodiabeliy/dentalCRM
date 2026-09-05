export interface Lead {
  id: string
  number: number
  name: string
  avatar: string
  status: string
  phoneNumber: string
  executedAmount: string
  paid: string
  plannedAmount: string
  comment: string
  registrationDate: string
  nextVisit: string
  nextReminder: string

  lastName?: string
  firstName?: string
  patronymic?: string
  dateOfBirth?: Date
  phones: Phone[]
  gender?: 'male' | 'female'
  address?: string
  email?: string
  phoneNote?: string
  mainResponsible?: string

  notes?: string
  importantInfo?: string
  tags?: string[]
  isArchived?: boolean
  source?: string
  contactSource?: string
  curator?: string
  discount?: string
  refusalReason?: string
  branch?: string
  insurancePolicies?: LeadInsurancePolicy[]
  createdAt: string
  updatedAt: string
}

export interface Phone {
  id: string
  number: string
  note?: string
  isPrimary: boolean
}

export interface LeadInsurancePolicy {
  id: string
  company: string
  policyNumber: string
  expirationDate: string
  limit: string
  guarantor: string
  note: string
  status: 'active' | 'inactive'
}

export interface LeadStatus {
  id: string
  name: string
  color: string
  order: number
}

export interface LeadSource {
  id: string
  name: string
  description?: string
}

export interface CreateLeadRequest {
  firstName: string
  lastName: string
  patronymic?: string
  phoneNumber: string
  email?: string
  dateOfBirth?: Date
  gender?: 'male' | 'female'
  address?: string
  source?: string
  notes?: string
  importantInfo?: string
  tags?: string[]
}

export interface UpdateLeadRequest extends Partial<CreateLeadRequest> {
  id: string
  status?: string
  isArchived?: boolean
}

export type LeadSortField =
  | 'firstName'
  | 'status'
  | 'phoneNumber'
  | 'executedAmount'
  | 'paid'
  | 'plannedAmount'
  | 'registrationDate'
  | 'nextVisit'
  | 'nextReminder'

export type LeadSortDirection = 'asc' | 'desc'
