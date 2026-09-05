import type { NomenclatureSection, PriceSection, TemplateSection } from './types'

export const mockSections: PriceSection[] = [
  {
    id: '1',
    name: 'ПІДГОТОВКА ДО ПРОТЕЗУВАННЯ',
    color: '#fbe9e7',
    textColor: '#bf360c',
    positions: [
      { id: '25634', name: 'Ортодонтичне лікування', price: 400, cost: 100 },
      { id: '25634', name: 'Ортодонтичне лікування', price: 500, cost: 100 },
      { id: '25634', name: 'Ортодонтичне лікування', price: 200, cost: 100 },
      { id: '25634', name: 'Ортодонтичне лікування', price: 100, cost: 100 },
    ],
  },
  {
    id: '2',
    name: 'ОБСТЕЖЕННЯ',
    color: '#efe6fa',
    textColor: '#3200b2',
    positions: [
      { id: '25634', name: 'Ортодонтичне лікування', price: 200, cost: 100 },
      { id: '25634', name: 'Ортодонтичне лікування', price: 200, cost: 100 },
      { id: '25634', name: 'Ортодонтичне лікування', price: 200, cost: 100 },
      { id: '25634', name: 'Ортодонтичне лікування', price: 200, cost: 100 },
    ],
  },
  {
    id: '3',
    name: 'ПРОФІЛАКТИКА',
    color: '#e8f5e9',
    textColor: '#1b5e20',
    positions: [],
  },
  {
    id: '4',
    name: 'ЛІКУВАННЯ КАРІЄСУ/РЕСТАВРАЦІЇ',
    color: '#e8eaf6',
    textColor: '#1a237e',
    positions: [],
  },
]

export const mockNomenclature: NomenclatureSection[] = [
  {
    id: '1',
    name: 'ПІДГОТОВКА ДО ПРОТЕЗУВАННЯ',
    color: '#fbe9e7',
    textColor: '#bf360c',
    positions: [
      {
        id: '25634',
        name: 'Рукавички нітрилові',
        positionQuantity: '50 шт в 1 уп',
        sum: 100,
        cost: 200,
        type: 'Продукт',
        quantity: 1,
        quantityType: 'уп.',
      },
      {
        id: '25634',
        name: 'Платки для коффердама (Sanctuary Dental dam)',
        positionQuantity: '36 шт в 1 уп',
        sum: 100,
        cost: 200,
        type: 'service',
        quantity: 200,
        quantityType: 'шт',
      },
      {
        id: '25634',
        name: 'OptraGate (Оптрагейт)',
        sum: 100,
        cost: 200,
        type: 'Продукт',
        quantity: 100,
        quantityType: 'уп.',
      },
    ],
  },
  {
    id: '2',
    name: 'ОБСТЕЖЕННЯ',
    color: '#efe6fa',
    textColor: '#3200b2',
    positions: [
      {
        id: '25634',
        name: 'Септанест Septanest з адреналіном 1/100 000',
        positionQuantity: '50 шт в 1 уп',
        sum: 100,
        cost: 200,
        type: 'Продукт',
        quantity: 1,
        quantityType: 'уп.',
      },
      {
        id: '25634',
        name: 'Серветки для пацієнтів (нагрудники)',
        positionQuantity: '50 шт в 1 уп',
        sum: 100,
        cost: 200,
        type: 'service',
        quantity: 200,
        quantityType: 'уп.',
      },
      {
        id: '25634',
        name: 'OptraGate (Оптрагейт)',
        sum: 100,
        cost: 200,
        type: 'Продукт',
        quantity: 100,
        quantityType: 'уп.',
      },
    ],
  },
  {
    id: '3',
    name: 'ПРОФІЛАКТИКА',
    color: '#e8f5e9',
    textColor: '#1b5e20',
    positions: [],
  },
  {
    id: '4',
    name: 'ЛІКУВАННЯ КАРІЄСУ/РЕСТАВРАЦІЇ',
    color: '#e8eaf6',
    textColor: '#1a237e',
    positions: [],
  },
]

export const mockTemplates: TemplateSection[] = [
  {
    id: '1',
    name: 'ПІДГОТОВКА ДО ПРОТЕЗУВАННЯ',
    color: '#fbe9e7',
    textColor: '#bf360c',
    positions: [
      { id: '25634', name: 'Ортодонтичне лікування', price: 100, cost: 100 },
      { id: '25635', name: 'Ортодонтичне лікування', price: 400, cost: 100 },
      { id: '25636', name: 'Ортодонтичне лікування', price: 500, cost: 100 },
      { id: '25637', name: 'Ортодонтичне лікування', price: 600, cost: 100 },
    ],
  },
  {
    id: '2',
    name: 'ОБСТЕЖЕННЯ',
    color: '#efe6fa',
    textColor: '#3200b2',
    positions: [
      { id: '25638', name: 'Ортодонтичне лікування', price: 200, cost: 100 },
      { id: '25639', name: 'Ортодонтичне лікування', price: 200, cost: 100 },
      { id: '25640', name: 'Ортодонтичне лікування', price: 200, cost: 100 },
      { id: '25641', name: 'Ортодонтичне лікування', price: 200, cost: 100 },
    ],
  },
  {
    id: '3',
    name: 'ПРОФІЛАКТИКА',
    color: '#e8f5e9',
    textColor: '#1b5e20',
    positions: [],
  },
  {
    id: '4',
    name: 'ЛІКУВАННЯ КАРІЄСУ/РЕСТАВРАЦІЇ',
    color: '#e8eaf6',
    textColor: '#1a237e',
    positions: [],
  },
]

export const mockTemplatesRightSide: TemplateSection[] = [
  {
    id: '1',
    name: 'ПІДГОТОВКА ДО ПРОТЕЗУВАННЯ',
    color: '#fbe9e7',
    textColor: '#bf360c',
    positions: [{ id: '25634', name: 'Ортодонтичне лікування', price: 200, cost: 100 }],
  },
  {
    id: '2',
    name: 'ОБСТЕЖЕННЯ',
    color: '#efe6fa',
    textColor: '#3200b2',
    positions: [
      { id: '25638', name: 'Ортодонтичне лікування', price: 200, cost: 100 },
      { id: '25639', name: 'Ортодонтичне лікування', price: 200, cost: 100 },
      { id: '25640', name: 'Ортодонтичне лікування', price: 200, cost: 100 },
      { id: '25641', name: 'Ортодонтичне лікування', price: 200, cost: 100 },
    ],
  },
]
