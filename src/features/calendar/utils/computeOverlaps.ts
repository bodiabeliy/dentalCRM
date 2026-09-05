export interface Event {
  scheduledTimeStart: string
  scheduledTimeEnd: string
  [key: string]: unknown
}

export function getTimeInMinutes(time: string) {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

export function computeOverlaps<T extends Event>(
  events: Array<T>
): Array<T & { overlapGroupSize: number; overlapGroupIndex: number }> {
  const sorted = [...events].sort(
    (a, b) => getTimeInMinutes(a.scheduledTimeStart) - getTimeInMinutes(b.scheduledTimeStart)
  )
  const result: Array<T & { overlapGroupSize: number; overlapGroupIndex: number }> = []
  const active: { event: T; index: number }[] = []
  for (const event of sorted) {
    const start = getTimeInMinutes(event.scheduledTimeStart)
    for (let i = active.length - 1; i >= 0; i--) {
      if (getTimeInMinutes(active[i].event.scheduledTimeEnd) <= start) {
        active.splice(i, 1)
      }
    }
    let col = 0
    while (active.some((a) => a.index === col)) col++
    active.push({ event, index: col })
    const end = getTimeInMinutes(event.scheduledTimeEnd)
    const group = sorted.filter(
      (e) => getTimeInMinutes(e.scheduledTimeStart) < end && getTimeInMinutes(e.scheduledTimeEnd) > start
    )
    const maxCols = Math.max(...group.map((e) => active.find((a) => a.event === e)?.index ?? 0)) + 1
    result.push({ ...event, overlapGroupSize: maxCols, overlapGroupIndex: col })
  }
  return result
}

export function groupByOverlapIntervals<T extends Event & { overlapGroupSize: number; overlapGroupIndex: number }>(
  events: Array<T>
): Array<Array<T>> {
  if (events.length === 0) return []

  const sorted = [...events].sort((a, b) => a.scheduledTimeStart.localeCompare(b.scheduledTimeStart))
  const groups: Array<Array<T>> = []
  let currentGroup: Array<T> = []
  let currentEnd = ''
  for (const event of sorted) {
    if (currentGroup.length === 0 || event.scheduledTimeStart < currentEnd) {
      currentGroup.push(event)
      if (event.scheduledTimeEnd > currentEnd) currentEnd = event.scheduledTimeEnd
    } else {
      groups.push(currentGroup)
      currentGroup = [event]
      currentEnd = event.scheduledTimeEnd
    }
  }
  if (currentGroup.length > 0) groups.push(currentGroup)
  return groups
}

export function partitionIntervals<T extends Event>(
  events: Array<T>
): Array<{ start: string; end: string; assistants: Array<T> }> {
  if (events.length === 0) return []

  const timePoints = Array.from(
    new Set([...events.map((a) => a.scheduledTimeStart), ...events.map((a) => a.scheduledTimeEnd)])
  ).sort()

  const result: Array<{ start: string; end: string; assistants: Array<T> }> = []
  for (let i = 0; i < timePoints.length - 1; i++) {
    const start = timePoints[i]
    const end = timePoints[i + 1]
    const active = events.filter((a) => a.scheduledTimeStart < end && a.scheduledTimeEnd > start)
    if (active.length > 0) {
      result.push({ start, end, assistants: active })
    }
  }
  return result
}

export function getMaxOverlapCount<T extends Event>(events: Array<T>): Array<T & { maxOverlap: number }> {
  return events.map((a) => {
    let max = 1
    const start = a.scheduledTimeStart
    const end = a.scheduledTimeEnd
    events.forEach((b) => {
      if (a === b) return

      if (b.scheduledTimeStart < end && b.scheduledTimeEnd > start) {
        const overlapCount = events.filter(
          (c) =>
            c.scheduledTimeStart < end &&
            c.scheduledTimeEnd > start &&
            !(c.scheduledTimeEnd <= b.scheduledTimeStart || c.scheduledTimeStart >= b.scheduledTimeEnd)
        ).length
        if (overlapCount > max) max = overlapCount
      }
    })
    return { ...a, maxOverlap: max }
  })
}
