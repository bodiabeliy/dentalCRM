export interface PricePosition {
  id: string
  name: string
  price: number
  cost: number
}

export interface PriceSection {
  id: string
  name: string
  color: string
  textColor: string
  positions: PricePosition[]
}

export interface PriceAction {
  label: string
  Icon: React.ComponentType<{ sx?: object; style?: object }>
  onClick?: () => void
}

export interface NomenclaturePositionType {
  id: string
  name: string
  color: string
  textColor: string
}

export interface NomenclatureSection {
  id: string
  name: string
  color: string
  textColor: string
  positions: NomenclaturePosition[]
}

export interface NomenclaturePosition {
  id: string
  name: string
  sum: number
  cost: number
  type: string
  quantity: number
  quantityType: 'шт' | 'уп.'
  positionQuantity?: string
}

export interface Nomenclature {
  id: string
  name: string
  color: string
  textColor: string
  positions: NomenclaturePosition[]
}

export interface TemplatePosition {
  id: string
  name: string
  price: number
  cost: number
}

export interface TemplateSection {
  id: string
  name: string
  color: string
  textColor: string
  positions: TemplatePosition[]
}
