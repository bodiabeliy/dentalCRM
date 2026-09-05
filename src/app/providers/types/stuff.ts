import type { IClinicColor } from './clinic'

export interface IStaff {
  id: number
  firstname: string
  lastname: string
  surname: string
  email: string
  role?: string
  photo?: string
  phone?: string
  roles?: IStaffRole
  subclinics?: IStaffSub
  items?: IStaff[]
  subclinic?: string
  status?: string
  subId?: number
  colors?: IClinicColor
  color?: string
  hourlyRate?: number
  hourlyRate2?: number

  //
  value?: string
}

export interface IStaffInvited {
  email: string
  roleId?: number
  subClinicId?: number
  colorId?: number
}

export interface IStaffRole {
  id: number
  name: string
}

export interface IStaffSub {
  id: number
  name: string
}
