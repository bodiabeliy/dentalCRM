export interface Act {
  id: number
  date: string
  number: number
  amount: number
  tags: string[]
  expanded: boolean
  statusIcon: 'failed' | 'success' | null
}

export interface Detail {
  id: number
  zone: string
  work: string
  price: number
  discount: string
  qty: number
  sum: number
  paid: number
  checked: boolean
}

export interface Payment {
  id: number
  date: string
  amount: number
  type: string
  balance: number
  icon: 'receipt' | 'check' | 'add'
}

export interface Order {
  id: number
  date: string
  supplier: string
  actNumber: number
  amount: number
  status: 'in_clinic' | 'ordered'
  expanded: boolean
  items: OrderItem[]
}

export interface OrderItem {
  id: number
  name: string
  quantity: number
  amount: number
}

export interface WriteOff {
  id: number
  date: string
  amount: number
  actNumber: number
  source: 'main_warehouse' | 'cash_register'
}

export interface PatientFinancesState {
  selectedDetails: number[]
  toggle: boolean
  tabValue: number
  expandedActs: number[]
}

export interface PatientFinancesSummary {
  totalCompleted: number
  totalPaid: number
  balance: number
  profit: number
  expenses: number
  doctorSalary: number
}
