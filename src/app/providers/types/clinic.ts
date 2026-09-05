export interface IClinic {
  id?: string
  name: string
  logo: string
  sub_name: string
  sub_address: string
  utc?: string
  subClinics?: ISubClinicDto[]
  formatDate?: string
  formatTime?: string
  startWeek?: string
  currenciesIso?: string[]
  mainCurrencyIso?: string
  staffCount?: number
  patientsCount?: number
}

export interface ISubClinicDto {
  id: string
  name: string
  address: string
}

export interface IClinicInvite {
  id: number
  email: string
  firstname: string
  surname: string
  lastname: string
  role: string
  roleId?: number
  status?: string
  tenant?: string
  inviter?: Inviter
}

export interface Inviter {
  firstname: string
  surname: string
  lastname: string
}

export interface IClinicReferences {
  roles?: Array<IRole>
  clinicColors?: Array<IClinicColor>
  tags?: Array<ITag>
  refusals?: Array<IRefusal>
  patientStatuses?: Array<IPatientStatus>
  channelsContacts?: Array<IChannelContact>
  currencies?: Array<ICurrency>
  leadSources?: Array<ILeadSource>
  leadStatuses?: Array<ILeadStatus>

  sourceContacts?: Array<ISourceContact>
  subClinics?: Array<ISubClinic>
  visitReferences?: Array<IVisitReference>
  visitStatuses?: Array<IVisitStatus>
}

export interface IRole {
  id: string
  name: string
  // Additional fields as needed
}

export interface IClinicColor {
  id: number
  color: string
  name: string
  order?: number
}

export interface ITag {
  id: string
  name: string
  color?: string
  // Additional fields as needed
}

export interface IRefusal {
  id: string
  name: string
  // Additional fields as needed
}

export interface IPatientStatus {
  id: string
  name: string
  color?: string
  // Additional fields as needed
}

export interface IChannelContact {
  id: string
  name: string
  // Additional fields as needed
}

export interface ICurrency {
  id: string
  code: string
  symbol: string
  name?: string
  // Additional fields as needed
}

export interface ILeadSource {
  id: string
  name: string
  // Additional fields as needed
}

export interface ILeadStatus {
  id: string
  name: string
  color?: string
  // Additional fields as needed
}

export interface ISourceContact {
  id: string
  name: string
  // Additional fields as needed
}

export interface ISubClinic {
  id: string
  name: string
  address?: string
  usersCount?: number
  // Additional fields as needed
}

export interface IVisitReference {
  id: string
  name: string
  color?: string
  // Additional fields as needed
}

export interface IVisitStatus {
  id: string
  name: string
  color?: string
  // Additional fields as needed
}
