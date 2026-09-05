export interface Clinic {
  id: string
  name: string
  isActive?: boolean
}

export interface SidebarItem {
  id: string
  text: string
  icon: React.ComponentType<{ style?: React.CSSProperties }>
  link?: string
  hasSubItems?: boolean
  subItems?: SidebarSubItem[]
}

export interface SidebarSubItem {
  id: string
  text: string
  link?: string
}

export interface SidebarSection {
  id: string
  title?: string
  items: SidebarItem[]
}

export interface SidebarState {
  openSchedule: boolean
  openPatients: boolean
  openPurchases: boolean
  selectedClinic: Clinic
}
