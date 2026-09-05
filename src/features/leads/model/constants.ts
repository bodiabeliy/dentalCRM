import type { Lead, LeadFilter } from './types'
import ChartViewIcon from '../../../shared/assets/icons/chart-view.svg?react'
import ListViewIcon from '../../../shared/assets/icons/list-view.svg?react'

const baseLeads: Lead[] = [
  {
    id: '1',
    name: 'Марія Іванівна',
    status: 'did_not_appear',
    comment: 'Коментар',
    nextReminder: '21.12.2024',
    nextVisit: '21.12.2024',
    plannedAmount: '20 000.00 грн',
    number: 0,
    avatar: '',
    phoneNumber: '',
    executedAmount: '',
    paid: '',
    registrationDate: '',
    phones: [],
  },
  {
    id: '2',
    name: 'Петро Васильович',
    status: 'did_not_appear',
    comment: 'Коментар',
    nextReminder: '21.12.2024',
    nextVisit: '21.12.2024',
    plannedAmount: '20 000.00 грн',
    number: 0,
    avatar: '',
    phoneNumber: '',
    executedAmount: '',
    paid: '',
    registrationDate: '',
    phones: [],
  },
  {
    id: '3',
    name: 'Олена Сергіївна',
    status: 'did_not_appear',
    comment: 'Коментар',
    nextReminder: '21.12.2024',
    nextVisit: '21.12.2024',
    plannedAmount: '20 000.00 грн',
    number: 0,
    avatar: '',
    phoneNumber: '',
    executedAmount: '',
    paid: '',
    registrationDate: '',
    phones: [],
  },
  {
    id: '4',
    name: 'Іван Петрович',
    status: 'did_not_appear',
    comment: 'Коментар',
    nextReminder: '21.12.2024',
    nextVisit: '21.12.2024',
    plannedAmount: '20 000.00 грн',
    number: 0,
    avatar: '',
    phoneNumber: '',
    executedAmount: '',
    paid: '',
    registrationDate: '',
    phones: [],
  },
  {
    id: '5',
    name: 'Софія Андріївна',
    status: 'did_not_appear',
    comment: 'Коментар',
    nextReminder: '22.12.2024',
    nextVisit: '22.12.2024',
    plannedAmount: '15 000.00 грн',
    number: 0,
    avatar: '',
    phoneNumber: '',
    executedAmount: '',
    paid: '',
    registrationDate: '',
    phones: [],
  },
  {
    id: '6',
    name: 'Олег Іванович',
    status: 'did_not_appear',
    comment: 'Коментар',
    nextReminder: '23.12.2024',
    nextVisit: '23.12.2024',
    plannedAmount: '25 000.00 грн',
    number: 0,
    avatar: '',
    phoneNumber: '',
    executedAmount: '',
    paid: '',
    registrationDate: '',
    phones: [],
  },
  {
    id: '7',
    name: 'Анна Володимирівна',
    status: 'did_not_appear',
    comment: 'Коментар',
    nextReminder: '24.12.2024',
    nextVisit: '24.12.2024',
    plannedAmount: '18 000.00 грн',
    number: 0,
    avatar: '',
    phoneNumber: '',
    executedAmount: '',
    paid: '',
    registrationDate: '',
    phones: [],
  },
  {
    id: '8',
    name: 'Дмитро Миколайович',
    status: 'did_not_appear',
    comment: 'Коментар',
    nextReminder: '25.12.2024',
    nextVisit: '25.12.2024',
    plannedAmount: '30 000.00 грн',
    number: 0,
    avatar: '',
    phoneNumber: '',
    executedAmount: '',
    paid: '',
    registrationDate: '',
    phones: [],
  },
  {
    id: '9',
    name: 'Давид Олександрович',
    status: 'did_not_appear',
    comment: 'Коментар',
    nextReminder: '25.12.2024',
    nextVisit: '25.12.2024',
    plannedAmount: '30 000.00 грн',
    number: 0,
    avatar: '',
    phoneNumber: '',
    executedAmount: '',
    paid: '',
    registrationDate: '',
    phones: [],
  },
]

// Generate additional leads to reach ~30 total
const additionalNames = [
  'Наталія Олександрівна',
  'Віктор Сергійович',
  'Людмила Іванівна',
  'Андрій Петрович',
  'Тетяна Миколаївна',
  'Юлія Дмитрівна',
  'Олександр Андрійович',
  'Галина Сергіївна',
  'Володимир Іванович',
  'Світлана Петрівна',
  'Роман Миколайович',
  'Лариса Володимирівна',
  'Василь Олександрович',
  'Ніна Сергіївна',
  'Борис Іванович',
  'Зінаїда Петрівна',
  'Геннадій Миколайович',
  'Валентина Володимирівна',
  'Ігор Олександрович',
  'Раїса Сергіївна',
  'Леонід Іванович',
  'Маргарита Петрівна',
  'Віталій Миколайович',
  'Алла Володимирівна',
  'Станіслав Олександрович',
  'Римма Сергіївна',
  'Валерій Іванович',
  'Лідія Петрівна',
]

const additionalLeads: Lead[] = additionalNames.map((name, index) => {
  const baseDate = new Date(2024, 2, 21) // March 21, 2024
  const registrationDate = new Date(baseDate)
  registrationDate.setDate(baseDate.getDate() + index)

  const nextVisit = new Date(registrationDate)
  nextVisit.setDate(registrationDate.getDate() + 4)

  const nextReminder = new Date(registrationDate)
  nextReminder.setDate(registrationDate.getDate() + 3)

  return {
    id: (index + 10).toString(),
    number: index + 10,
    name,
    avatar: `/avatars/leads${index + 10}.jpg`,
    status: 'did_not_appear' as const,
    phoneNumber: `+380${(index + 10).toString().padStart(7, '0')}`,
    executedAmount: '-',
    paid: '-',
    plannedAmount: '-',
    comment: `Коментар для ${name}`,
    registrationDate: registrationDate.toLocaleDateString('uk-UA'),
    nextVisit: nextVisit.toLocaleDateString('uk-UA'),
    nextReminder: nextReminder.toLocaleDateString('uk-UA'),
    phones: [{ number: `+380${(index + 10).toString().padStart(7, '0')}`, note: '' }],
  }
})

export const mockLeads: Lead[] = [...baseLeads, ...additionalLeads]

export const LEADS_OPTIONS: LeadFilter[] = [
  {
    id: '1',
    name: 'Сьогодні',
    isActive: true,
  },
  {
    id: '2',
    name: 'Вчора',
    isActive: false,
  },
  {
    id: '3',
    name: 'Цей тиждень',
    isActive: false,
  },
  {
    id: '4',
    name: 'Цей місяць',
    isActive: false,
  },
]

export const LEADS_MOBILE_OPTIONS: LeadFilter[] = [
  {
    id: '1',
    name: 'Дошка',
    isActive: true,
    startIcon: ChartViewIcon,
  },
  {
    id: '2',
    name: 'Таблиця',
    isActive: false,
    startIcon: ListViewIcon,
  },
]

export const STATUS_LABELS = {
  did_not_appear: "Не з'явився",
  visited: 'Був візит',
  scheduled: 'Заплановано',
} as const

export const STATUS_COLORS = {
  error: '#D32F2F',
  pending: '#FFB300',
  success: '#2E7D32',
} as const

// export const STATUS_COLORS = {
//   did_not_appear: '#D32F2F',
//   visited: '#FFB300',
//   scheduled: '#2E7D32',
// } as const

export const TAB_LABELS = ['Головна', 'Нотатки', 'Дзвінки', 'Задачі']

export const LEAD_STATUS_TAG = [{ title: 'Work', year: 1994, color: '#4caf50' }]

export const LEAD_TAG = [
  { title: '#тег', color: '#EF6C00' },
  { title: '#тег2', color: '#0031BF' },
  { title: '#тег3', color: '#4caf50' },
  { title: '#тег4', color: '#8f00bfff' },
  { title: '#тег5', color: '#afef00ff' },
  { title: '#тег6', color: '#00bfbfff' },
]
