import { useMemo } from 'react'
import { format } from 'date-fns'
import type { ScheduleData, MultiDayScheduleData, Visit } from '../types/schedule-types'
import { mapApiVisitToEvent } from '../api/schedule-api'
import type { Doctor } from '../api/schedule-api'

type VisitWithCabinet = Visit & { cabinetId: number }

export const useGridData = (
  scheduleData: ScheduleData | null,
  multiDayScheduleData: MultiDayScheduleData | null,
  days: Date[],
  patients: unknown[],
  doctors: Doctor[]
) => {
  return useMemo(() => {
    if (!scheduleData || scheduleData.cabinets.length === 0) return null

    const allVisits: VisitWithCabinet[] = []
    if (multiDayScheduleData) {
      Object.values(multiDayScheduleData).forEach((dayData) => {
        dayData.cabinets.forEach((cabinet) => {
          ;(cabinet.shifts ?? []).forEach((shift) => {
            shift.visits.forEach((visit) => {
              allVisits.push({
                ...visit,
                cabinetId: (visit as VisitWithCabinet).cabinetId || cabinet.id,
                doctor: { ...visit.doctor, color: shift.doctor.color },
              })
            })
          })
        })
      })
    }

    const cabinets = scheduleData.cabinets
    const totalColumns = days.length * cabinets.length

    const events = days
      .map((day, dayIdx) => {
        const dayKey = format(day, 'yyyy-MM-dd')
        const dayScheduleData = multiDayScheduleData?.[dayKey]
        if (!dayScheduleData) {
          return []
        }
        return cabinets
          .map((cabinet: (typeof cabinets)[number], cIdx: number) => {
            const cabinetVisits = allVisits.filter(
              (visit) =>
                visit.cabinetId === cabinet.id &&
                format(new Date(visit.visit_start), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
            )
            return cabinetVisits.map((visit) => {
              const event = mapApiVisitToEvent(
                visit,
                cabinet.id,
                format(day, 'yyyy-MM-dd'),
                patients as Visit['patient'][],
                doctors
              )
              return { event, day, dayIdx, cIdx }
            })
          })
          .flat()
      })
      .flat()

    return {
      cabinets,
      totalColumns,
      events,
    }
  }, [scheduleData, multiDayScheduleData, days, patients, doctors])
}
