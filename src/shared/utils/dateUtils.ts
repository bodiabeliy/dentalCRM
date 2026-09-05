export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-GB')
}

export function parseTime(time: string): number {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

export function calculateEventPosition(
  eventStart: string,
  eventEnd: string,
  slotHeight: number
): { top: number; height: number } {
  const dayStartMinutes = 0 // 00:00
  const eventStartMinutes = parseTime(eventStart)
  const eventEndMinutes = parseTime(eventEnd)

  const minutesFromDayStart = eventStartMinutes - dayStartMinutes
  const durationMinutes = eventEndMinutes - eventStartMinutes

  const top = (minutesFromDayStart / 60) * slotHeight
  const height = (durationMinutes / 60) * slotHeight

  return { top, height }
}

export function calculateColumnLeft(dayIdx: number, cIdx: number, timeColWidth: number, eventColWidth: number): number {
  return timeColWidth + (dayIdx * 4 + cIdx) * eventColWidth
}

export function getHourLabel(hours: number) {
  if (hours % 10 === 1 && hours % 100 !== 11) return 'година'
  if ([2, 3, 4].includes(hours % 10) && ![12, 13, 14].includes(hours % 100)) return 'години'
  return 'годин'
}
