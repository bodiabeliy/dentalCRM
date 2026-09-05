export interface Doctor {
  id: number
  name: string
  avatar?: string
  color: string
}

export interface Patient {
  id: number
  name: string
  avatar: string
}

export interface Status {
  id: number
  value: string
  color: string
  order?: number
}

export interface Event {
  id: number
  doctorId: number
  patientId: number
  roomId: number
  date: string
  start: string
  end: string
  status: Status
  note?: string
  type: string
  characteristic?: string
  patient?: Visit['patient']
  doctor: Visit['doctor']
  assistant?: {
    id: number
    name: string
    avatar: string
  }
  planned_start?: string
  planned_end?: string
  actual_start?: string
  actual_end?: string
}

export interface Day {
  label: string
  date: Date
}

export interface PopupState {
  x: number
  y: number
  eventId: number
  triggerType?: 'mouse' | 'touch' | 'keyboard'
}

export interface EmptyCellPopupState {
  x: number
  y: number
  dayIdx: number
  cIdx: number
  time: string
  triggerType?: 'mouse' | 'touch' | 'keyboard'
}

export interface SelectedEvent {
  eventId: number
  patient: Patient
  doctor: Doctor
  date: string
  time: string
  status: Status
  note?: string
}

export interface AppointmentModalProps {
  open: boolean
  onClose: () => void
  patient: {
    name: string
    avatar: string
    age: number
    phone: string
  }
  doctor: {
    name: string
  }
  date: string
  time: string
  status: Status
  note?: string
  advance: number
}

export interface TouchContextState {
  isLongPressing: boolean
  longPressTimer: number | null
  touchStartTime: number
  touchStartPosition: { x: number; y: number }
  currentTarget: HTMLElement | null
}

export interface ContextMenuOptions {
  onEdit?: () => void
  onCopy?: () => void
  onCut?: () => void
  onDelete?: () => void
  onAddPatient?: () => void
  onAddShift?: () => void
  onAddReserve?: () => void
  onPaste?: () => void
}

export interface Visit {
  id: number
  visit_start: string
  visit_end: string
  patientId?: number
  patient: {
    id: number
    name: string
    avatar: string
    age: number
    phone: string
    important_note: string
    advance: number
  }
  doctor: Doctor
  status: {
    id: number
    value: string
    color: string
    order: number
  }
  note: string
  reference_id: number
  characteristic?: string
  type?: string
}

export interface ReservedTime {
  id: number
  type: string // e.g., 'Lunch', 'Meeting', etc.
  start: string
  end: string
  comment?: string
}

export interface Shift {
  id: number
  doctor: Doctor
  cabinetId: number
  date: string
  start: string
  end: string
  visits: Visit[]
  reservedTimes: ReservedTime[]
}

export interface Cabinet {
  id: number
  name: string
  color: string
  shifts: Shift[]
  assistants?: unknown[]
}

export interface ScheduleData {
  date_from: string
  days: number
  cabinets: Cabinet[]
}

export interface MultiDayScheduleData {
  [dateKey: string]: ScheduleData
}
