import { Box } from '@mui/material'
import { ScheduleHeader, ScheduleGrid, ContextMenus, SchedulePopups } from './index'
import { useScheduleGrid } from '../hooks/use-schedule-grid'
import { useSchedule } from '../contexts/schedule-context'
import { useModals } from '../../../shared/contexts/modal-context'
import type { Event, Patient, Visit } from '../types/schedule-types'
import { updateEvent } from '../api/schedule-api'
import { useCallback, useEffect, useState, useMemo, useRef } from 'react'
import { getAllPatients } from '../../calendar/api/patients'
import { format } from 'date-fns'
import { ASSISTANTS, ADMINISTRATORS } from '../../calendar/data/mock-data'

export function ScheduleMain() {
  const {
    selectedDate,
    setSelectedDate,
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    popup,
    emptyCellPopup,
    gridRef,
    handleEventContextMenu,
    handleEmptyCellContextMenu,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleKeyDown,
    clearPopups,
    adjustPopupPosition,
    isLoading,
    error,
    days,
    multiDayScheduleData,
  } = useScheduleGrid()

  const {
    handleEditEvent,
    handleDeleteEvent: contextDeleteEvent,
    refetchScheduleData, // This now uses mock data instead of real API
    filteredScheduleData,
  } = useSchedule()
  const { openAppointmentModal, openEditModal, openAddEventModal } = useModals()

  const [patients, setPatients] = useState<(Visit['patient'] & Patient)[]>([])
  const lastFocusedCellRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    async function fetchPatients() {
      const res = await getAllPatients()
      if (res.success) setPatients(res.data)
    }
    fetchPatients()
  }, [])

  const getPatientById = (id: number): Visit['patient'] | undefined => {
    const p = patients.find((p) => p.id === id)
    if (!p) return undefined
    return {
      id: p.id,
      name: p.name,
      avatar: p.avatar,
      age: p.age ?? 0,
      phone: p.phone ?? '',
      important_note: p.important_note ?? '',
      advance: p.advance ?? 0,
    }
  }

  const handleEventClick = (event: Event, dayLabel: string) => {
    const { patient, doctor } = event

    if (!patient || !doctor) {
      console.error('Event is missing patient or doctor details')
      return
    }

    const selectedEvent = {
      eventId: event.id,
      patient,
      doctor,
      date: dayLabel,
      time: `${event.start} - ${event.end}`,
      status: event.status,
      note: event.note,
    }

    openAppointmentModal(selectedEvent)
  }

  const handleEventDoubleClick = (event: Event) => {
    openEditModal(event)
  }

  const handleContextMenuEdit = (eventId: number) => {
    const eventToEdit = handleEditEvent(eventId, filteredScheduleData)
    if (eventToEdit) {
      openEditModal(eventToEdit)
    }
  }

  const handleEventUpdate = useCallback(
    async (eventId: number, updates: Partial<Event>) => {
      try {
        if (!filteredScheduleData) {
          console.error('No schedule data available')
          return
        }

        const eventToUpdate = filteredScheduleData.cabinets
          .flatMap((cabinet) => cabinet.shifts.flatMap((shift) => shift.visits))
          .find((visit) => visit.id === eventId)

        if (!eventToUpdate) {
          return
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const patientId: number = (eventToUpdate as any).patientId ?? eventToUpdate.patient?.id ?? 0
        const patient = patientId ? getPatientById(patientId) : undefined

        const updatedEvent: Event = {
          id: eventId,
          doctorId: eventToUpdate.doctor.id,
          patientId,
          roomId: updates.roomId || eventToUpdate.reference_id,
          date: updates.date || new Date(eventToUpdate.visit_start).toISOString().split('T')[0],
          start: updates.start || new Date(eventToUpdate.visit_start).toTimeString().slice(0, 5),
          end: updates.end || new Date(eventToUpdate.visit_end).toTimeString().slice(0, 5),
          status: eventToUpdate.status,
          note: eventToUpdate.note,
          type: 'visit',
          characteristic: eventToUpdate.characteristic,
          patient,
          doctor: eventToUpdate.doctor,
        }

        const response = await updateEvent(updatedEvent)

        if (response.success) {
          await refetchScheduleData()
        } else {
          console.error('Failed to update event:', response.error)
        }
      } catch (error) {
        console.error('Error updating event:', error)
      }
    },
    [filteredScheduleData, refetchScheduleData, getPatientById]
  )

  const handleDeleteEvent = async (eventId: number) => {
    try {
      await contextDeleteEvent(eventId)
      await refetchScheduleData()
    } catch {
      alert('Failed to delete event')
    }
  }

  const handleAddPatientVisit = (dayIdx: number, cIdx: number, time: string) => {
    const selectedDay = days[dayIdx]
    const cabinet = searchFilteredData?.cabinets[cIdx]

    if (!selectedDay || !cabinet) {
      console.error('Invalid day or cabinet selection')
      return
    }

    const dateKey = format(selectedDay, 'yyyy-MM-dd')

    openAddEventModal(dateKey, time, cabinet.id)
  }

  const searchFilteredData = useMemo(() => {
    if (!filteredScheduleData || !searchQuery.trim()) {
      return filteredScheduleData
    }

    const query = searchQuery.toLowerCase()
    const filteredCabinets = filteredScheduleData.cabinets?.map((cabinet) => ({
      ...cabinet,
      shifts: cabinet.shifts?.map((shift) => ({
        ...shift,
        visits: shift.visits.filter((visit) => {
          const patientName = visit.patient?.name?.toLowerCase() || ''
          const doctorName = visit.doctor?.name?.toLowerCase() || ''
          const note = visit.note?.toLowerCase() || ''
          return patientName.includes(query) || doctorName.includes(query) || note.includes(query)
        }),
      })),
    }))

    return {
      ...filteredScheduleData,
      cabinets: filteredCabinets,
    }
  }, [filteredScheduleData, searchQuery])

  const clearSearchQuery = () => setSearchQuery('')

  // Unified handler for all tabs
  const handleEmptyCellContextMenuWithFocus = (
    e: React.MouseEvent<Element>,
    dayIdx: number,
    cIdx: number,
    time: string,
    tab: 'doctor' | 'assistant' | 'administrator'
  ) => {
    lastFocusedCellRef.current = e.currentTarget as HTMLElement
    if (tab === 'doctor') {
      handleEmptyCellContextMenu(e as React.MouseEvent, dayIdx, cIdx, time)
    }
  }

  const getOnEmptyCellContextMenu = (tab: number) => {
    if (tab === 0) {
      return (e: React.MouseEvent<Element>, dayIdx: number, cIdx: number, time: string) =>
        handleEmptyCellContextMenuWithFocus(e, dayIdx, cIdx, time, 'doctor')
    } else if (tab === 1) {
      return (e: React.MouseEvent<Element>, dayIdx: number, cIdx: number, time: string) =>
        handleEmptyCellContextMenuWithFocus(e, dayIdx, cIdx, time, 'assistant')
    } else if (tab === 2) {
      return (e: React.MouseEvent<Element>, dayIdx: number, cIdx: number, time: string) =>
        handleEmptyCellContextMenuWithFocus(e, dayIdx, cIdx, time, 'administrator')
    }
    return () => {}
  }

  const clearPopupsWithBlur = () => {
    if (lastFocusedCellRef.current) {
      lastFocusedCellRef.current.blur()
      lastFocusedCellRef.current = null
    }
    clearPopups()
  }

  return (
    <>
      <ScheduleHeader
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <Box
        sx={{
          flexGrow: 1,
          p: { xs: '0 16px 16px 16px', md: '0 24px 24px 24px' },
          position: 'relative',
          width: '100%',
          overflowX: 'hidden',
          overflowY: 'auto',
        }}
        onClick={clearPopupsWithBlur}
        onContextMenu={clearPopupsWithBlur}>
        <ScheduleGrid
          gridRef={gridRef}
          onEventClick={handleEventClick}
          onEventDoubleClick={handleEventDoubleClick}
          onEventContextMenu={handleEventContextMenu}
          onEmptyCellContextMenu={getOnEmptyCellContextMenu(activeTab)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onKeyDown={handleKeyDown}
          onEventUpdate={handleEventUpdate}
          scheduleData={searchFilteredData}
          multiDayScheduleData={multiDayScheduleData}
          isLoading={isLoading}
          error={error}
          days={days}
          patients={patients}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          assistantsData={ASSISTANTS as any}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          administratorsData={ADMINISTRATORS as any}
          activeTab={activeTab}
        />
        <SchedulePopups clearSearchQuery={clearSearchQuery} />
        {activeTab !== 2 && (
          <ContextMenus
            popup={popup}
            emptyCellPopup={emptyCellPopup}
            onEditEvent={handleContextMenuEdit}
            onClosePopups={clearPopupsWithBlur}
            adjustPopupPosition={adjustPopupPosition}
            onDeleteEvent={handleDeleteEvent}
            onAddPatientVisit={handleAddPatientVisit}
          />
        )}
      </Box>
    </>
  )
}
