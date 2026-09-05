import { useState, useRef, useEffect, useCallback } from 'react'
import type { Event } from '../types/schedule-types'
import { format } from 'date-fns'
import { throttle } from '../../../shared/utils/performance'
import { useSchedule } from '../contexts/schedule-context'
import { useModals } from '../../../shared/contexts/modal-context'
import { mapApiVisitToEvent } from '../api/schedule-api'

export function useScheduleGrid() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState(0)
  const [activeDayIdx, setActiveDayIdx] = useState(0)

  const gridRef = useRef<HTMLDivElement>(null)

  const { selectedDate, setSelectedDate, scheduleData, multiDayScheduleData, isLoading, error, days } = useSchedule()
  const {
    contextMenu,
    openContextMenu,
    openEmptyCellContextMenu,
    closeContextMenus,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    adjustPopupPosition,
    setGetEventsForCell,
  } = useModals()

  const handleScroll = useCallback(
    throttle(() => {
      if (!gridRef.current || !scheduleData) return
      const scrollLeft = gridRef.current.scrollLeft

      const isMobile = window.innerWidth < 600
      const eventColumnWidth = isMobile ? 180 : 230

      const groupWidth = scheduleData.cabinets.length * eventColumnWidth
      const idx = Math.round(scrollLeft / groupWidth)
      setActiveDayIdx(idx)
    }, 16),
    [scheduleData]
  )

  useEffect(() => {
    const grid = gridRef.current
    if (grid) {
      grid.addEventListener('scroll', handleScroll, { passive: true })
      return () => {
        grid.removeEventListener('scroll', handleScroll)
      }
    }
  }, [handleScroll])

  const scrollToSelectedDate = useCallback(() => {
    if (!gridRef.current || !scheduleData || !days.length) return

    const selectedDateIndex = days.findIndex((day) => format(day, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd'))

    if (selectedDateIndex === -1) return

    const isMobile = window.innerWidth < 600
    const eventColumnWidth = isMobile ? 180 : 230

    const groupWidth = scheduleData.cabinets.length * eventColumnWidth
    const scrollLeft = selectedDateIndex * groupWidth

    gridRef.current.scrollTo({
      left: scrollLeft,
      behavior: 'smooth',
    })

    setActiveDayIdx(selectedDateIndex)
  }, [selectedDate, scheduleData, days])

  useEffect(() => {
    scrollToSelectedDate()
  }, [scrollToSelectedDate])

  const getEventsForCell = useCallback(
    (dayIdx: number, cIdx: number, time: string): Event[] => {
      if (!scheduleData || !multiDayScheduleData) {
        return []
      }

      const cabinet = scheduleData.cabinets[cIdx]
      if (!cabinet) return []

      const currentDay = days[dayIdx]
      if (!currentDay) return []

      const timeDate = new Date(`1970-01-01T${time}:00`)
      const dayKey = format(currentDay, 'yyyy-MM-dd')

      const dayScheduleData = multiDayScheduleData[dayKey]
      if (!dayScheduleData) return []

      const dayCabinet = dayScheduleData.cabinets[cIdx]
      if (!dayCabinet) return []

      const allVisits = (dayCabinet.shifts ?? []).flatMap((shift) => shift.visits)

      return allVisits
        .filter((visit) => {
          const visitStart = new Date(visit.visit_start)
          const visitDate = format(visitStart, 'yyyy-MM-dd')
          const currentDayFormatted = format(currentDay, 'yyyy-MM-dd')

          return (
            visitDate === currentDayFormatted &&
            visitStart.getHours() === timeDate.getHours() &&
            visitStart.getMinutes() === timeDate.getMinutes()
          )
        })
        .map((visit) => mapApiVisitToEvent(visit, cabinet.id, format(currentDay, 'yyyy-MM-dd')))
    },
    [scheduleData, multiDayScheduleData, days]
  )

  useEffect(() => {
    setGetEventsForCell(getEventsForCell)
  }, [getEventsForCell, setGetEventsForCell])

  const handleEventClick = useCallback((event: Event) => {
    const { patient, doctor } = event

    if (!patient || !doctor) {
      console.error('Event is missing patient or doctor details')
      return
    }
  }, [])

  const handleEventContextMenu = useCallback(
    (e: React.MouseEvent, eventId: number) => {
      e.preventDefault()
      e.stopPropagation()
      openContextMenu({ x: e.clientX, y: e.clientY, eventId, triggerType: 'mouse' })
    },
    [openContextMenu]
  )

  const handleEmptyCellContextMenu = useCallback(
    (e: React.MouseEvent, dayIdx: number, cIdx: number, time: string) => {
      const cellEvents = getEventsForCell(dayIdx, cIdx, time)
      if (cellEvents.length === 0) {
        e.preventDefault()
        e.stopPropagation()
        openEmptyCellContextMenu({ x: e.clientX, y: e.clientY, dayIdx, cIdx, time, triggerType: 'mouse' })
      }
    },
    [getEventsForCell, openEmptyCellContextMenu]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, eventId?: number, dayIdx?: number, cIdx?: number, time?: string) => {
      if (e.key === 'ContextMenu' || (e.key === 'Enter' && e.ctrlKey)) {
        e.preventDefault()
        const target = e.currentTarget as HTMLElement
        const rect = target.getBoundingClientRect()

        if (eventId !== undefined) {
          openContextMenu({ x: rect.left, y: rect.bottom, eventId, triggerType: 'keyboard' })
        } else if (dayIdx !== undefined && cIdx !== undefined && time !== undefined) {
          const cellEvents = getEventsForCell(dayIdx, cIdx, time)
          if (cellEvents.length === 0) {
            openEmptyCellContextMenu({ x: rect.left, y: rect.bottom, dayIdx, cIdx, time, triggerType: 'keyboard' })
          }
        }
      }
    },
    [getEventsForCell, openContextMenu, openEmptyCellContextMenu]
  )

  return {
    selectedDate,
    setSelectedDate,
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    activeDayIdx,
    popup: contextMenu.popup,
    emptyCellPopup: contextMenu.emptyCellPopup,
    gridRef,
    getEventsForCell,
    handleEventClick,
    handleEventContextMenu,
    handleEmptyCellContextMenu,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleKeyDown,
    clearPopups: closeContextMenus,
    adjustPopupPosition,
    scheduleData,
    multiDayScheduleData,
    isLoading,
    error,
    days,
    refetchScheduleData: () => {},
    scrollToSelectedDate,
  }
}
