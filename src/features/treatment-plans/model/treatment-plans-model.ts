export interface TreatmentProcedure {
  id: string
  name: string
  price: number
  completed: boolean
}

export interface TreatmentVisit {
  id: string
  number: number
  procedures: TreatmentProcedure[]
  totalPrice: number
}

export interface TreatmentPlan {
  id: string
  date: string
  doctorName: string
  visits: TreatmentVisit[]
  totalPrice: number
  completedStages: number
  totalStages: number
  isAgreed: boolean
}

export const mockTreatmentPlans: TreatmentPlan[] = [
  {
    id: '1',
    date: '07.09.2024',
    doctorName: 'Олекса Олексій Ігорович',
    completedStages: 3,
    totalStages: 8,
    isAgreed: true,
    visits: [
      {
        id: '1',
        number: 1,
        totalPrice: 2250,
        procedures: [
          { id: '1', name: 'Профілактична гігієна / Лікування пародонту', price: 250, completed: true },
          { id: '2', name: 'Лікування карієсу', price: 300, completed: true },
          { id: '3', name: 'Ендодонтичне лікування', price: 1500, completed: true },
          { id: '4', name: 'Видалення зубів', price: 600, completed: false },
        ],
      },
      {
        id: '2',
        number: 2,
        totalPrice: 2250,
        procedures: [
          { id: '5', name: 'Ортодонтичне лікування', price: 250, completed: false },
          { id: '6', name: 'Синусліфтинг / Кісткова аугментація', price: 250, completed: false },
          { id: '7', name: 'Ортодонтичне лікування', price: 250, completed: false },
        ],
      },
      {
        id: '3',
        number: 3,
        totalPrice: 2250,
        procedures: [{ id: '8', name: 'Ортодонтичне лікування', price: 250, completed: false }],
      },
    ],
    totalPrice: 256287,
  },
  {
    id: '2',
    date: '07.09.2024',
    doctorName: 'Олекса Олексій Ігорович',
    completedStages: 0,
    totalStages: 8,
    isAgreed: false,
    visits: [
      {
        id: '1',
        number: 1,
        totalPrice: 2250,
        procedures: [
          { id: '1', name: 'Профілактична гігієна / Лікування пародо', price: 250, completed: false },
          { id: '2', name: 'Лікування карієсу', price: 300, completed: false },
          { id: '3', name: 'Ендодонтичне лікування', price: 1500, completed: false },
          { id: '4', name: 'Видалення зубів', price: 600, completed: false },
        ],
      },
      {
        id: '2',
        number: 2,
        totalPrice: 2250,
        procedures: [
          { id: '5', name: 'Ортодонтичне лікування', price: 250, completed: false },
          { id: '6', name: 'Синусліфтинг / Кісткова аугментація', price: 250, completed: false },
          { id: '7', name: 'Ортодонтичне лікування', price: 250, completed: false },
        ],
      },
      {
        id: '3',
        number: 3,
        totalPrice: 2250,
        procedures: [{ id: '8', name: 'Ортодонтичне лікування', price: 250, completed: false }],
      },
    ],
    totalPrice: 256287,
  },
  {
    id: '3',
    date: '07.09.2024',
    doctorName: 'Олекса Олексій Ігорович',
    completedStages: 0,
    totalStages: 8,
    isAgreed: false,
    visits: [
      {
        id: '1',
        number: 1,
        totalPrice: 2250,
        procedures: [
          { id: '1', name: 'Профілактична гігієна / Лікування пародо', price: 250, completed: false },
          { id: '2', name: 'Лікування карієсу', price: 300, completed: false },
          { id: '3', name: 'Ендодонтичне лікування', price: 1500, completed: false },
          { id: '4', name: 'Видалення зубів', price: 600, completed: false },
        ],
      },
      {
        id: '2',
        number: 2,
        totalPrice: 2250,
        procedures: [
          { id: '5', name: 'Ортодонтичне лікування', price: 250, completed: false },
          { id: '6', name: 'Синусліфтинг / Кісткова аугментація', price: 250, completed: false },
          { id: '7', name: 'Ортодонтичне лікування', price: 250, completed: false },
        ],
      },
      {
        id: '3',
        number: 3,
        totalPrice: 2250,
        procedures: [{ id: '8', name: 'Ортодонтичне лікування', price: 250, completed: false }],
      },
    ],
    totalPrice: 256287,
  },
]

export const treatmentPlansModel = {
  getAllPlans: () => mockTreatmentPlans,
  getAgreedPlan: () => mockTreatmentPlans.find((plan) => plan.isAgreed),
  getTreatmentPlans: () => mockTreatmentPlans.filter((plan) => !plan.isAgreed),
}
