import type { FunctionComponent, SVGProps } from 'react'

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
  // insurancePolicies?: InsurancePolicy[]
}

export interface Phone {
  number: string
  note?: string
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

export interface LeadFilter {
  id: string
  name: string
  isActive?: boolean
  startIcon?: FunctionComponent<SVGProps<SVGSVGElement>>
}

export type SortField =
  | 'firstName'
  | 'status'
  | 'phoneNumber'
  // | 'email'
  | 'executedAmount'
  | 'paid'
  | 'plannedAmount'
  // | 'comment'
  | 'registrationDate'
  | 'nextVisit'
  | 'nextReminder'
export type SortDirection = 'asc' | 'desc'
