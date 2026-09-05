export interface Appointment {
  id: string
  doctorId: string
  patientId: string
  roomId: string
  date: string
  start: string
  end: string
  status: AppointmentStatus
  note?: string
  type: string
  characteristic?: string
  plannedStart?: string
  plannedEnd?: string
  actualStart?: string
  actualEnd?: string
  createdAt: string
  updatedAt: string
}

export interface AppointmentStatus {
  id: string
  value: string
  color: string
  order?: number
}

export interface Doctor {
  id: string
  name: string
  avatar?: string
  color: string
  email: string
  phone?: string
  specialization?: string
}

export interface Room {
  id: string
  name: string
  color: string
  capacity?: number
  equipment?: string[]
}

export interface Visit {
  id: string
  visitStart: string
  visitEnd: string
  patientId: string
  patient: {
    id: string
    name: string
    avatar: string
    age: number
    phone: string
    importantNote: string
    advance: number
  }
  doctor: Doctor
  status: AppointmentStatus
  note: string
  referenceId: string
  characteristic?: string
  type?: string
}

export interface ReservedTime {
  id: string
  type: string
  start: string
  end: string
  comment?: string
  doctorId: string
  date: string
}

export interface Shift {
  id: string
  doctor: Doctor
  cabinetId: string
  date: string
  start: string
  end: string
  visits: Visit[]
  reservedTimes: ReservedTime[]
}

export interface CreateAppointmentRequest {
  doctorId: string
  patientId: string
  roomId: string
  date: string
  start: string
  end: string
  statusId: string
  note?: string
  type?: string
  characteristic?: string
}

export interface UpdateAppointmentRequest extends Partial<CreateAppointmentRequest> {
  id: string
}
