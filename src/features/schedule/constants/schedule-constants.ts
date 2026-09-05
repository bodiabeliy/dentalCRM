export const DRAWER_WIDTH = 240

export const CABINETS = ['Кабінет 1', 'Кабінет 2', 'Кабінет 3', 'Кабінет 4', 'Кабінет 5']

export const DAYS: Array<{ label: string; date: Date }> = [
  { label: '25.12 Вівторок', date: new Date('2025-12-25') },
  { label: '26.12 Середа', date: new Date('2025-12-26') },
  { label: '27.12 Четвер', date: new Date('2025-12-27') },
]

export const HOUR_SLOTS: string[] = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`)

export const SLOT_HEIGHT = 90
export const COLUMN_WIDTH = 230
export const TIME_COLUMN_WIDTH = 80
export const HEADER_HEIGHT = 68
export const DAY_START_MINUTES = 8 * 60

export const EVENT_STATUSES = [
  { value: 'pending', color: '#0029D9' },
  { value: 'confirmed', color: '#84CC16' },
  { value: 'done', color: '#22C55E' },
  { value: 'no-show', color: '#A855F7' },
  { value: 'rescheduled', color: '#FBBF24' },
  { value: 'unreachable', color: '#F97316' },
  { value: 'late', color: '#EC4899' },
  { value: 'in-clinic', color: '#06B6D4' },
  { value: 'in-office', color: '#7E22CE' },
  { value: 'cancelled', color: '#EF4444' },
] as const

// export type EventStatusType =
