export interface Patient {
  id: string
  number: number
  name: string
  avatar: string
  status: 'did_not_visit' | 'had_visit_no_treatment' | 'being_treated' | 'checkup' | 'partially_treated' | 'refused'
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
  dateOfBirth?: string
  gender?: 'male' | 'female'
  address?: string
  email?: string
  phoneNote?: string
  importantInfo?: string
  tags?: string[]
  isArchived?: boolean
  source?: string
  contactSource?: string
  curator?: string
  discount?: string
  refusalReason?: string
  branch?: string
  notes?: string
  insurancePolicies?: InsurancePolicy[]
}

export interface InsurancePolicy {
  id: string
  company: string
  policyNumber: string
  expirationDate: string
  limit: string
  guarantor: string
  note: string
  status: 'active' | 'inactive'
}

export type SortField =
  | 'name'
  | 'status'
  | 'phoneNumber'
  | 'email'
  | 'executedAmount'
  | 'paid'
  | 'plannedAmount'
  | 'comment'
  | 'registrationDate'
  | 'nextVisit'
  | 'nextReminder'
export type SortDirection = 'asc' | 'desc'
