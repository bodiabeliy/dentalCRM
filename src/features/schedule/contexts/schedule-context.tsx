import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import { updateEvent, deleteEvent, createEvent, mapApiVisitToEvent, fetchAllScheduleData, getAllDoctors } from '../api'
import type { Event, ScheduleData, MultiDayScheduleData } from '../types/schedule-types'
import type { Doctor } from '../api/schedule-api'
import type { Shift } from '../types/schedule-types'
import { format, addDays } from 'date-fns'
import { useSettings } from '../../settings/contexts/settings-context'

interface ScheduleContextType {
  selectedDate: Date
  setSelectedDate: (date: Date) => void
  scheduleData: ScheduleData | null
  multiDayScheduleData: MultiDayScheduleData | null
  filteredScheduleData: ScheduleData | null
  isLoading: boolean
  error: Error | null
  doctors: Doctor[]
  refetchScheduleData: () => Promise<void>
  handleEditEvent: (eventId: number, scheduleData: ScheduleData | null) => Event | null
  handleSaveEvent: (updatedEvent: Event) => Promise<Event | undefined>
  handleDeleteEvent: (eventId: number) => Promise<boolean | undefined>
  handleCreateEvent: (newEvent: Omit<Event, 'id'>) => Promise<Event | undefined>
  days: Date[]
  allShifts: Shift[]
  refetchShifts: () => Promise<void>
}

const ScheduleContext = createContext<ScheduleContextType | null>(null)

interface ScheduleProviderProps {
  children: React.ReactNode
}

const generateEmptyScheduleData = (startDate: Date): ScheduleData => {
  return {
    date_from: format(startDate, 'yyyy-MM-dd'),
    days: 5,
    cabinets: [
      {
        id: 1,
        name: 'Кабінет 1',
        color: '#FFDDC1',
        shifts: [],
      },
      {
        id: 2,
        name: 'Кабінет 2',
        color: '#C1FFD7',
        shifts: [],
      },
      {
        id: 3,
        name: 'Кабінет 3',
        color: '#FFC1C1',
        shifts: [],
      },
      {
        id: 4,
        name: 'Кабінет 4',
        color: '#C1FFD7',
        shifts: [],
      },
    ],
  }
}

export function ScheduleProvider({ children }: ScheduleProviderProps) {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [scheduleData, setScheduleData] = useState<ScheduleData | null>(null)
  const [multiDayScheduleData, setMultiDayScheduleData] = useState<MultiDayScheduleData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [allShifts, setAllShifts] = useState<Shift[]>([])

  const { settings } = useSettings()

  const numberOfDays = settings?.numberOfDays || 5

  const days = useMemo(() => {
    const generatedDays = Array.from({ length: numberOfDays }, (_, i) => addDays(selectedDate, i))

    return generatedDays
  }, [selectedDate, numberOfDays])

  const fetchSchedule = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const [scheduleResponse, doctorsResponse] = await Promise.all([fetchAllScheduleData(), getAllDoctors()])

      if (doctorsResponse.success && doctorsResponse.data) {
        setDoctors(doctorsResponse.data)
      }

      if (scheduleResponse.success && scheduleResponse.data) {
        const currentWeekData: MultiDayScheduleData = {}

        const allDaysInRange = Array.from({ length: numberOfDays }, (_, i) => addDays(selectedDate, i))

        for (const date of allDaysInRange) {
          const dateKey = format(date, 'yyyy-MM-dd')

          if (scheduleResponse.data[dateKey]) {
            currentWeekData[dateKey] = scheduleResponse.data[dateKey]
          } else {
            currentWeekData[dateKey] = generateEmptyScheduleData(date)
          }
        }

        setMultiDayScheduleData(currentWeekData)
        const selectedDateKey = format(selectedDate, 'yyyy-MM-dd')
        setScheduleData(currentWeekData[selectedDateKey] || generateEmptyScheduleData(selectedDate))
      } else {
        const emptyData = generateEmptyScheduleData(selectedDate)
        setScheduleData(emptyData)
        setMultiDayScheduleData({ [format(selectedDate, 'yyyy-MM-dd')]: emptyData })
      }
    } catch (e) {
      setError(e as Error)
      const emptyData = generateEmptyScheduleData(selectedDate)
      setScheduleData(emptyData)
      setMultiDayScheduleData({ [format(selectedDate, 'yyyy-MM-dd')]: emptyData })
    } finally {
      setIsLoading(false)
    }
  }, [selectedDate, numberOfDays])

  const fetchShifts = useCallback(async () => {
    // Extract shifts from the schedule data instead of fetching from a separate endpoint
    if (multiDayScheduleData) {
      const allShiftsFromSchedule: Shift[] = []
      Object.values(multiDayScheduleData).forEach((dayData) => {
        dayData.cabinets.forEach((cabinet) => {
          if (cabinet.shifts) {
            allShiftsFromSchedule.push(...cabinet.shifts)
          }
        })
      })
      setAllShifts(allShiftsFromSchedule)
    }
  }, [multiDayScheduleData])

  const refetchScheduleData = useCallback(async () => {
    await fetchSchedule()
  }, [fetchSchedule])

  useEffect(() => {
    fetchSchedule()
  }, [fetchSchedule])

  useEffect(() => {
    fetchShifts()
  }, [fetchShifts])

  const filteredScheduleData = useMemo(() => {
    if (!scheduleData || !settings) return scheduleData

    const filteredCabinets = scheduleData.cabinets
      .filter((cabinet) => settings.enabledCabinets.includes(cabinet.id))
      .map((cabinet) => {
        // Aggregate all visits from all shifts
        let allVisits = (cabinet.shifts ?? []).flatMap((shift) => shift.visits)

        if (settings.selectedDoctor && settings.showOnlySelectedDoctor) {
          function hasDoctorId(v: unknown): v is { doctorId: number } {
            return (
              typeof v === 'object' &&
              v !== null &&
              'doctorId' in v &&
              typeof (v as { doctorId: unknown }).doctorId === 'number'
            )
          }
          allVisits = allVisits.filter(
            (visit) =>
              visit.doctor?.id === settings.selectedDoctor ||
              (hasDoctorId(visit) && visit.doctorId === settings.selectedDoctor)
          )
        }

        return {
          ...cabinet,
          // Provide a virtual visits property for compatibility (if needed elsewhere)
          visits: allVisits,
        }
      })

    return {
      ...scheduleData,
      cabinets: filteredCabinets,
    }
  }, [scheduleData, settings])

  const handleEditEvent = useCallback(
    (eventId: number, scheduleData: ScheduleData | null): Event | null => {
      if (!scheduleData) return null

      for (const cabinet of scheduleData.cabinets) {
        for (const shift of cabinet.shifts ?? []) {
          const visit = shift.visits.find((v) => v.id === eventId)
          if (visit) {
            const eventToEdit = mapApiVisitToEvent(
              visit,
              cabinet.id,
              format(new Date(visit.visit_start), 'yyyy-MM-dd'),
              undefined,
              doctors
            )
            return eventToEdit
          }
        }
      }
      return null
    },
    [doctors]
  )

  const handleSaveEvent = useCallback(
    async (updatedEvent: Event) => {
      const response = await updateEvent(updatedEvent)
      if (response.success) {
        await refetchScheduleData()
        return response.data
      } else {
        throw new Error(response.error || 'Failed to save event')
      }
    },
    [refetchScheduleData]
  )

  const handleDeleteEvent = useCallback(
    async (eventId: number) => {
      const response = await deleteEvent(eventId)
      if (response.success) {
        await refetchScheduleData()
        return response.data
      } else {
        throw new Error(response.error || 'Failed to delete event')
      }
    },
    [refetchScheduleData]
  )

  const handleCreateEvent = useCallback(
    async (newEvent: Omit<Event, 'id'>) => {
      const response = await createEvent(newEvent)
      if (response.success) {
        await refetchScheduleData()
        return response.data
      } else {
        throw new Error(response.error || 'Failed to create event')
      }
    },
    [refetchScheduleData]
  )

  const value: ScheduleContextType = {
    selectedDate,
    setSelectedDate,
    scheduleData,
    multiDayScheduleData,
    filteredScheduleData,
    isLoading,
    error,
    doctors,
    refetchScheduleData,
    handleEditEvent,
    handleSaveEvent,
    handleDeleteEvent,
    handleCreateEvent,
    days,
    allShifts,
    refetchShifts: fetchShifts,
  }

  return <ScheduleContext.Provider value={value}>{children}</ScheduleContext.Provider>
}

export function useSchedule() {
  const context = useContext(ScheduleContext)
  if (!context) {
    throw new Error('useSchedule must be used within a ScheduleProvider')
  }
  return context
}
