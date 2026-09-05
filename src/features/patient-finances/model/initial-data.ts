import type { Act, Detail, Payment, Order, WriteOff } from './types'

export const initialActs: Act[] = [
  {
    id: 1,
    date: '21.23.2024',
    number: 265,
    amount: 200,
    tags: [],
    expanded: false,
    statusIcon: null,
  },
  {
    id: 2,
    date: '22.23.2024',
    number: 270,
    amount: 300,
    tags: ['Акт для страхової'],
    expanded: false,
    statusIcon: 'failed',
  },
  {
    id: 3,
    date: '23.23.2024',
    number: 275,
    amount: 150,
    tags: ['Акт для страхової'],
    expanded: false,
    statusIcon: 'success',
  },
  {
    id: 4,
    date: '24.23.2024',
    number: 280,
    amount: 220,
    tags: [],
    expanded: true,
    statusIcon: null,
  },
]

export const initialDetails: Detail[] = [
  {
    id: 1,
    zone: 'Зона 1',
    work: 'Консультація',
    price: 500,
    discount: '0%',
    qty: 1,
    sum: 500,
    paid: 500,
    checked: true,
  },
  {
    id: 2,
    zone: 'Зона 2',
    work: 'Лікування',
    price: 1000,
    discount: '10%',
    qty: 2,
    sum: 1800,
    paid: 1800,
    checked: false,
  },
  {
    id: 3,
    zone: 'Зона 3',
    work: 'Протезування',
    price: 2000,
    discount: '5%',
    qty: 1,
    sum: 1900,
    paid: 1900,
    checked: false,
  },
]

export const initialPayments: Payment[] = [
  {
    id: 1,
    date: '21.23.2024',
    amount: 200,
    type: 'Готівка',
    balance: 200,
    icon: 'receipt',
  },
  {
    id: 2,
    date: '22.23.2024',
    amount: 300,
    type: 'Карта',
    balance: 500,
    icon: 'check',
  },
  {
    id: 3,
    date: '23.23.2024',
    amount: 150,
    type: 'Готівка',
    balance: 650,
    icon: 'add',
  },
]

export const initialOrders: Order[] = [
  {
    id: 1,
    date: '21.23.2024',
    supplier: 'Постачальник',
    actNumber: 270,
    amount: 250.0,
    status: 'in_clinic',
    expanded: false,
    items: [
      { id: 1, name: 'Назва позиції', quantity: 2, amount: 1000 },
      { id: 2, name: 'Назва позиції', quantity: 2, amount: 1000 },
      { id: 3, name: 'Назва позиції', quantity: 2, amount: 1000 },
    ],
  },
  {
    id: 2,
    date: '22.23.2024',
    supplier: 'Постачальник',
    actNumber: 270,
    amount: 250.0,
    status: 'ordered',
    expanded: false,
    items: [
      { id: 4, name: 'Назва позиції', quantity: 2, amount: 1000 },
      { id: 5, name: 'Назва позиції', quantity: 2, amount: 1000 },
      { id: 6, name: 'Назва позиції', quantity: 2, amount: 1000 },
    ],
  },
  {
    id: 3,
    date: '23.23.2024',
    supplier: 'Постачальник',
    actNumber: 270,
    amount: 250.0,
    status: 'ordered',
    expanded: false,
    items: [
      { id: 7, name: 'Назва позиції', quantity: 2, amount: 1000 },
      { id: 8, name: 'Назва позиції', quantity: 2, amount: 1000 },
      { id: 9, name: 'Назва позиції', quantity: 2, amount: 1000 },
    ],
  },
  {
    id: 4,
    date: '24.23.2024',
    supplier: 'Постачальник',
    actNumber: 270,
    amount: 250.0,
    status: 'ordered',
    expanded: true,
    items: [
      { id: 10, name: 'Назва позиції', quantity: 2, amount: 1000 },
      { id: 11, name: 'Назва позиції', quantity: 2, amount: 1000 },
      { id: 12, name: 'Назва позиції', quantity: 2, amount: 1000 },
    ],
  },
]

export const initialWriteOffs: WriteOff[] = [
  {
    id: 1,
    date: '21.23.2024',
    amount: 200.0,
    actNumber: 270,
    source: 'main_warehouse',
  },
  {
    id: 2,
    date: '21.23.2024',
    amount: 200.0,
    actNumber: 270,
    source: 'cash_register',
  },
  {
    id: 3,
    date: '21.23.2024',
    amount: 150.0,
    actNumber: 270,
    source: 'cash_register',
  },
  {
    id: 4,
    date: '21.23.2024',
    amount: 300.0,
    actNumber: 270,
    source: 'cash_register',
  },
]
