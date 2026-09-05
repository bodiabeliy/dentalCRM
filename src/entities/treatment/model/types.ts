export interface TreatmentProcedure {
  id: string
  name: string
  price: number
  completed: boolean
  description?: string
  category?: string
  duration?: number
}

export interface TreatmentVisit {
  id: string
  number: number
  procedures: TreatmentProcedure[]
  totalPrice: number
  scheduledDate?: string
  completedDate?: string
  notes?: string
}

export interface TreatmentPlan {
  id: string
  patientId: string
  doctorId: string
  date: string
  doctorName: string
  visits: TreatmentVisit[]
  totalPrice: number
  completedStages: number
  totalStages: number
  isAgreed: boolean
  status: 'draft' | 'agreed' | 'in_progress' | 'completed' | 'cancelled'
  createdAt: string
  updatedAt: string
}

export interface MedicalRecordSection {
  complaints?: string
  anamnesis?: string
  objective?: string
  diagnosis?: string
  treatment?: string
  recommendations?: string
}

export interface CreateTreatmentPlanRequest {
  patientId: string
  doctorId: string
  visits: Omit<TreatmentVisit, 'id' | 'totalPrice'>[]
  notes?: string
}

export interface UpdateTreatmentPlanRequest extends Partial<CreateTreatmentPlanRequest> {
  id: string
  status?: TreatmentPlan['status']
}

export interface CreateProcedureRequest {
  name: string
  price: number
  description?: string
  category?: string
  duration?: number
}

export interface UpdateProcedureRequest extends Partial<CreateProcedureRequest> {
  id: string
}
