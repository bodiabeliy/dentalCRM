export interface IPricing {
  id: number
  name: string
  price?: number
  order: number
  color?: number // Color ID from clinic colors
  items?: IPricingItem[]
}

export interface IPricingPosition {
  name: string
  price: number
  cost: number
  executionTime: number
  photo: boolean
  order: number
  color: number
  priceQuestions: number[]
}

export interface IPricingItem {
  id: number
  name: string
  price: number
  cost: number
  executionTime?: number
  photo?: boolean
  order?: number
  color?: number
  priceQuestions?: number[]
}

export interface PricePosition {
  id: string
  name: string
  price: number
  cost: number
}

export interface PriceSection {
  id: string
  name: string
  color?: string
  textColor: string
  positions: PricePosition[]
}

export interface PriceAction {
  label: string
  Icon: React.ComponentType<{ sx?: object; style?: object }>
  onClick?: () => void
}

export interface IPricings {
  items: IPricing[]
}
