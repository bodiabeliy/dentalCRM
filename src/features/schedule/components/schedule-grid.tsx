import React, { useEffect, useCallback, useMemo, useState } from 'react'
import { Box, Typography, useTheme, useMediaQuery, CircularProgress } from '@mui/material'
import { format, addMinutes, parse, differenceInMinutes } from 'date-fns'
import type { Event, ScheduleData, MultiDayScheduleData, Shift } from '../types/schedule-types'
import { HOUR_SLOTS } from '../constants/schedule-constants'
import { useDragAndDrop } from '../hooks/useDragAndDrop'
import { useSchedule } from '../contexts/schedule-context'
import { useScrollDrag } from '../hooks/useScrollDrag'
import { useGridData } from '../model/grid-data'
import {
  GridEvent,
  GridShift,
  CurrentTimeLine,
  GridHeaders,
  GridTimeSlots,
  AssistantGrid,
  AssistantContextMenu,
  AssistantEmptyCellContextMenu,
  AdministratorGrid,
  AdministratorContextMenu,
  AdministratorEmptyCellContextMenu,
} from './ui'
import { ShiftContextMenu } from './ui/shift-context-menu'
import { ConfirmDeleteDialog } from './confirm-delete-dialog'
import CreateShiftModal from './create-shift-modal'
import EditAssistantShiftModal from './edit-assistant-shift-modal'
import CreateAdministratorShiftModal from './create-administrator-shift-modal'
import EditAdministratorShiftModal from './edit-administrator-shift-modal'
import { ConfirmDeleteAdministratorDialog } from './confirm-delete-administrator-dialog'
import CreateAssistantShiftModal from './create-assistant-shift-modal'

interface ScheduleGridProps {
  gridRef: React.RefObject<HTMLDivElement | null>
  onEventClick: (event: Event, dayLabel: string) => void
  onEventDoubleClick: (event: Event) => void
  onEventContextMenu: (e: React.MouseEvent, eventId: number) => void
  onEmptyCellContextMenu: (e: React.MouseEvent, dayIdx: number, cIdx: number, time: string) => void
  onTouchStart: (e: React.TouchEvent, eventId?: number, dayIdx?: number, cIdx?: number, time?: string) => void
  onTouchMove: (e: React.TouchEvent) => void
  onTouchEnd: () => void
  onKeyDown: (e: React.KeyboardEvent, eventId?: number, dayIdx?: number, cIdx?: number, time?: string) => void
  onEventUpdate?: (eventId: number, updates: Partial<Event>) => void
  scheduleData: ScheduleData | null
  multiDayScheduleData: MultiDayScheduleData | null
  isLoading: boolean
  error: Error | null
  days: Date[]
  patients: unknown[]
  assistantsData?: Record<
    string,
    Array<{
      id: number
      name: string
      actualTimeStart: string
      actualTimeEnd: string
      scheduledTimeStart: string
      scheduledTimeEnd: string
      avatar?: string
    }>
  > | null
  administratorsData?: Record<
    string,
    Array<{
      id: number
      name: string
      actualTimeStart: string
      actualTimeEnd: string
      scheduledTimeStart: string
      scheduledTimeEnd: string
      avatar?: string
    }>
  > | null

  activeTab?: number
}

interface AssistantForEdit {
  id: number
  name: string
  surname: string
  scheduledTimeStart: string
  scheduledTimeEnd: string
  actualTimeStart?: string
  actualTimeEnd?: string
  avatarUrl?: string
  cabinetId: number
}

const ADMIN_ROLES = [
  { id: 1, name: 'Адміністратори' },
  { id: 2, name: 'Прибиральниці' },
  { id: 3, name: 'SMM' },
  { id: 4, name: 'Бухгалтер' },
]

export const ScheduleGrid = React.memo(
  ({
    gridRef,
    onEventClick,
    onEventDoubleClick,
    onEventContextMenu,
    onEmptyCellContextMenu,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onKeyDown,
    onEventUpdate,
    scheduleData,
    multiDayScheduleData,
    isLoading,
    error,
    days,
    patients,
    assistantsData,
    administratorsData,
    activeTab,
  }: ScheduleGridProps) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const { doctors, allShifts } = useSchedule()

    const dimensions = useMemo(
      () => ({
        timeColumnWidth: isMobile ? 60 : 80,
        eventColumnWidth: isMobile ? 180 : 230,
        slotHeight: isMobile ? 70 : 90,
        dayHeaderHeight: 32,
        cabinetHeaderHeight: 36,
        totalHeaderHeight: 32 + 36,
      }),
      [isMobile]
    )

    const { timeColumnWidth, eventColumnWidth, slotHeight, dayHeaderHeight, cabinetHeaderHeight, totalHeaderHeight } =
      dimensions

    const { isDragging, draggedEvent, dropTarget, handleDragStart, handleDragOver, handleDragEnd } = useDragAndDrop()

    const { handleMouseDown, handleMouseMove, handleMouseUp, handleTouchStart, handleTouchMove, handleTouchEnd } =
      useScrollDrag(gridRef, isDragging)

    const gridData = useGridData(scheduleData, multiDayScheduleData, days, patients, doctors)

    const handleDrop = useCallback(
      (e: React.DragEvent, dayIdx: number, cIdx: number, time: string) => {
        e.preventDefault()

        if (!draggedEvent || !onEventUpdate) {
          return
        }

        const targetDate = days[dayIdx]
        const targetTime = parse(time, 'HH:mm', new Date())

        const eventStart = parse(draggedEvent.start, 'HH:mm', new Date())
        const eventEnd = parse(draggedEvent.end, 'HH:mm', new Date())
        const duration = differenceInMinutes(eventEnd, eventStart)

        const newStartTime = targetTime
        const newEndTime = addMinutes(targetTime, duration)

        const updates: Partial<Event> = {
          date: format(targetDate, 'yyyy-MM-dd'),
          start: format(newStartTime, 'HH:mm'),
          end: format(newEndTime, 'HH:mm'),
          roomId: scheduleData?.cabinets[cIdx]?.id || draggedEvent.roomId,
        }

        onEventUpdate(draggedEvent.id, updates)

        handleDragEnd()
      },
      [draggedEvent, days, onEventUpdate, scheduleData, handleDragEnd]
    )

    const [assistantContextMenu, setAssistantContextMenu] = useState<{
      x: number
      y: number
      assistantId: number
    } | null>(null)

    const [assistantEmptyCellContextMenu, setAssistantEmptyCellContextMenu] = useState<{
      x: number
      y: number
      dayIdx: number
      cIdx: number
      time: string
    } | null>(null)

    const [administratorContextMenu, setAdministratorContextMenu] = useState<{
      x: number
      y: number
      administratorId: number
    } | null>(null)

    const [administratorEmptyCellContextMenu, setAdministratorEmptyCellContextMenu] = useState<{
      x: number
      y: number
      dayIdx: number
      cIdx: number
      time: string
    } | null>(null)

    const [shiftContextMenu, setShiftContextMenu] = useState<{
      x: number
      y: number
      shift: Shift
    } | null>(null)

    const [editAssistantModal, setEditAssistantModal] = useState<{
      open: boolean
      assistant: AssistantForEdit | null
    }>({ open: false, assistant: null })

    const [createAssistantShiftModal, setCreateAssistantShiftModal] = useState<{
      open: boolean
      dayIdx: number | null
      cIdx: number | null
      time: string | null
    }>({ open: false, dayIdx: null, cIdx: null, time: null })

    const [createDoctorShiftModal, setCreateDoctorShiftModal] = useState<{
      open: boolean
      dayIdx: number | null
      cIdx: number | null
      time: string | null
    }>({ open: false, dayIdx: null, cIdx: null, time: null })

    const handleCreateDoctorShiftModalClose = () => {
      setCreateDoctorShiftModal({ open: false, dayIdx: null, cIdx: null, time: null })
    }

    const [deleteAssistantDialog, setDeleteAssistantDialog] = useState<{
      open: boolean
      assistantId: number | null
    }>({ open: false, assistantId: null })

    const [editAdministratorModal, setEditAdministratorModal] = useState<{
      open: boolean
      administrator: AssistantForEdit | null
    }>({ open: false, administrator: null })
    const [createAdministratorShiftModal, setCreateAdministratorShiftModal] = useState<{
      open: boolean
      dayIdx: number | null
      cIdx: number | null
      time: string | null
    }>({ open: false, dayIdx: null, cIdx: null, time: null })
    const [deleteAdministratorDialog, setDeleteAdministratorDialog] = useState<{
      open: boolean
      administratorId: number | null
    }>({ open: false, administratorId: null })

    const handleAssistantContextMenu = useCallback((e: React.MouseEvent, assistantId: number) => {
      e.preventDefault()
      e.stopPropagation()
      setAssistantContextMenu({ x: e.clientX, y: e.clientY, assistantId })
    }, [])

    const handleAssistantEmptyCellContextMenu = useCallback(
      (e: React.MouseEvent, dayIdx: number, cIdx: number, time: string) => {
        e.preventDefault()
        e.stopPropagation()
        setAssistantEmptyCellContextMenu({ x: e.clientX, y: e.clientY, dayIdx, cIdx, time })
      },
      []
    )

    const closeAssistantContextMenus = useCallback(() => {
      if (document.activeElement) {
        const activeElement = document.activeElement as HTMLElement
        if (
          activeElement.tagName !== 'INPUT' &&
          activeElement.tagName !== 'TEXTAREA' &&
          activeElement.tagName !== 'SELECT'
        ) {
          activeElement.blur()
        }
      }
      setAssistantContextMenu(null)
      setAssistantEmptyCellContextMenu(null)
    }, [])

    const assistantsCabinetsByDay: AssistantCabinet[][] = days.map((day) => {
      const dayKey = format(day, 'yyyy-MM-dd')
      if (!assistantsData || !assistantsData[dayKey]) {
        return []
      }

      const dayData = assistantsData[dayKey]

      if (typeof dayData === 'object' && dayData && 'cabinets' in dayData && Array.isArray(dayData.cabinets)) {
        return dayData.cabinets as AssistantCabinet[]
      }

      console.warn(`assistantsData[${dayKey}] has unexpected structure:`, dayData)
      return []
    })

    const handleAssistantEdit = useCallback(
      (assistantId: number) => {
        // Find the assistant object from the data
        let found = null
        for (const day of assistantsCabinetsByDay) {
          for (const cabinet of day) {
            const assistant = cabinet.assistants.find((a) => a.id === assistantId)
            if (assistant) {
              found = { ...assistant, cabinetId: cabinet.id }
              break
            }
          }
          if (found) break
        }
        setEditAssistantModal({ open: true, assistant: found })
      },
      [assistantsCabinetsByDay]
    )

    const handleAssistantDeleteShift = useCallback((assistantId: number) => {
      setDeleteAssistantDialog({ open: true, assistantId })
    }, [])

    const handleCreateAssistantShiftModalOpen = (dayIdx: number, cIdx: number, time: string) => {
      setCreateAssistantShiftModal({ open: true, dayIdx, cIdx, time })
    }

    const handleCreateAssistantShiftModalClose = () => {
      setCreateAssistantShiftModal({ open: false, dayIdx: null, cIdx: null, time: null })
    }
    const handleDeleteAssistantDialogClose = () => {
      setDeleteAssistantDialog({ open: false, assistantId: null })
    }
    const handleDeleteAssistantConfirm = () => {
      // TODO: Implement actual delete logic here
      setDeleteAssistantDialog({ open: false, assistantId: null })
    }

    const handleEditAssistantModalClose = () => {
      setEditAssistantModal({ open: false, assistant: null })
    }

    const handleAdministratorContextMenu = useCallback((e: React.MouseEvent, administratorId: number) => {
      e.preventDefault()
      e.stopPropagation()
      setAdministratorContextMenu({ x: e.clientX, y: e.clientY, administratorId })
    }, [])

    const administratorsCabinetsByDay: AdministratorCabinet[][] = days.map((day) => {
      const dayKey = format(day, 'yyyy-MM-dd')
      const dayData = administratorsData?.[dayKey]
      if (
        dayData &&
        typeof dayData === 'object' &&
        'cabinets' in dayData &&
        Array.isArray((dayData as { cabinets: unknown }).cabinets)
      ) {
        const cabinets = (dayData as { cabinets: AdministratorCabinet[] }).cabinets
        return ADMIN_ROLES.map(
          (role) => cabinets.find((c: AdministratorCabinet) => c.id === role.id) || { ...role, administrators: [] }
        )
      }
      return ADMIN_ROLES.map((role) => ({ ...role, administrators: [] }))
    })

    const handleAdministratorEmptyCellContextMenu = useCallback(
      (e: React.MouseEvent, dayIdx: number, cIdx: number, time: string) => {
        e.preventDefault()
        e.stopPropagation()
        console.log('ADMIN EMPTY CELL CONTEXT MENU', { x: e.clientX, y: e.clientY, dayIdx, cIdx, time })
        setAdministratorEmptyCellContextMenu({ x: e.clientX, y: e.clientY, dayIdx, cIdx, time })
      },
      []
    )

    const closeAdministratorContextMenus = useCallback(() => {
      if (document.activeElement) {
        const activeElement = document.activeElement as HTMLElement
        if (
          activeElement.tagName !== 'INPUT' &&
          activeElement.tagName !== 'TEXTAREA' &&
          activeElement.tagName !== 'SELECT'
        ) {
          activeElement.blur()
        }
      }
      setAdministratorContextMenu(null)
      setAdministratorEmptyCellContextMenu(null)
    }, [])

    const handleAdministratorEdit = useCallback(
      (administratorId: number) => {
        let found = null
        for (const day of administratorsCabinetsByDay) {
          for (const cabinet of day) {
            const administrator = cabinet.administrators.find((a) => a.id === administratorId)
            if (administrator) {
              found = { ...administrator, cabinetId: cabinet.id }
              break
            }
          }
          if (found) break
        }
        setEditAdministratorModal({ open: true, administrator: found })
      },
      [administratorsCabinetsByDay]
    )

    const handleAdministratorAddShift = useCallback((dayIdx: number, cIdx: number, time: string) => {
      setCreateAdministratorShiftModal({ open: true, dayIdx, cIdx, time })
    }, [])

    const handleAdministratorDeleteShift = useCallback((administratorId: number) => {
      setDeleteAdministratorDialog({ open: true, administratorId })
    }, [])

    const handleCreateAdministratorShiftModalClose = () => {
      setCreateAdministratorShiftModal({ open: false, dayIdx: null, cIdx: null, time: null })
    }

    const handleEditAdministratorModalClose = () => {
      setEditAdministratorModal({ open: false, administrator: null })
    }

    const handleDeleteAdministratorDialogClose = () => {
      setDeleteAdministratorDialog({ open: false, administratorId: null })
    }

    const handleDeleteAdministratorConfirm = () => {
      setDeleteAdministratorDialog({ open: false, administratorId: null })
    }

    const handleShiftHeaderContextMenu = useCallback((e: React.MouseEvent, shift: Shift) => {
      e.preventDefault()
      e.stopPropagation()
      setShiftContextMenu({ x: e.clientX, y: e.clientY, shift })
    }, [])

    const closeShiftContextMenu = useCallback(() => setShiftContextMenu(null), [])

    const handleShiftEdit = useCallback((shift: Shift) => {
      // TODO: Implement edit shift
      console.log('Edit shift:', shift)
    }, [])
    const handleShiftCopy = useCallback((shift: Shift) => {
      // TODO: Implement copy shift
      console.log('Copy shift:', shift)
    }, [])
    const handleShiftCut = useCallback((shift: Shift) => {
      // TODO: Implement cut shift
      console.log('Cut shift:', shift)
    }, [])
    const handleShiftDelete = useCallback((shift: Shift) => {
      // TODO: Implement delete shift
      console.log('Delete shift:', shift)
    }, [])

    const memoizedOnEventClick = useCallback(onEventClick, [onEventClick])
    const memoizedOnEventDoubleClick = useCallback(onEventDoubleClick, [onEventDoubleClick])
    const memoizedOnEventContextMenu = useCallback(onEventContextMenu, [onEventContextMenu])
    const memoizedOnEmptyCellContextMenu = useCallback(onEmptyCellContextMenu, [onEmptyCellContextMenu])
    const memoizedOnTouchStart = useCallback(onTouchStart, [onTouchStart])
    const memoizedOnTouchMove = useCallback(onTouchMove, [onTouchMove])
    const memoizedOnTouchEnd = useCallback(onTouchEnd, [onTouchEnd])
    const memoizedOnKeyDown = useCallback(onKeyDown, [onKeyDown])

    useEffect(() => {
      const handleClickOutside = () => {
        closeAssistantContextMenus()
        closeAdministratorContextMenus()
        closeShiftContextMenu()
      }

      document.addEventListener('click', handleClickOutside)
      return () => {
        document.removeEventListener('click', handleClickOutside)
      }
    }, [closeAssistantContextMenus, closeAdministratorContextMenus, closeShiftContextMenu])

    if (!multiDayScheduleData) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CircularProgress />
        </Box>
      )
    }

    if (isLoading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CircularProgress />
        </Box>
      )
    }

    if (error) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Typography color="error">Error: {error.message}</Typography>
        </Box>
      )
    }

    if (!gridData) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Typography>No schedule data available</Typography>
        </Box>
      )
    }

    const { cabinets: gridCabinets, totalColumns, events } = gridData

    const now = new Date()
    const todayIdx = days.findIndex((day) => format(day, 'yyyy-MM-dd') === format(now, 'yyyy-MM-dd'))

    type AssistantCabinet = {
      id: number
      name: string
      color?: string
      assistants: Array<{
        id: number
        name: string
        surname: string
        actualTimeStart: string
        actualTimeEnd: string
        scheduledTimeStart: string
        scheduledTimeEnd: string
        avatarUrl?: string
      }>
    }

    type AdministratorCabinet = {
      id: number
      name: string
      color?: string
      administrators: Array<{
        id: number
        name: string
        surname: string
        actualTimeStart: string
        actualTimeEnd: string
        scheduledTimeStart: string
        scheduledTimeEnd: string
        avatarUrl?: string
      }>
    }

    return (
      <>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
            overflow: 'auto',
            cursor: 'grab',
            '&:active': { cursor: 'grabbing' },
          }}
          ref={gridRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onDragEnd={() => handleDragEnd()}>
          <CurrentTimeLine
            todayIdx={todayIdx}
            totalHeaderHeight={totalHeaderHeight}
            slotHeight={slotHeight}
            timeColumnWidth={timeColumnWidth}
            totalColumns={totalColumns}
            eventColumnWidth={eventColumnWidth}
            isMobile={isMobile}
          />
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: `${timeColumnWidth}px repeat(${totalColumns}, ${eventColumnWidth}px)`,
              minWidth: `${timeColumnWidth + totalColumns * eventColumnWidth}px`,
              minHeight: `${totalHeaderHeight + HOUR_SLOTS.length * slotHeight}px`,
              position: 'relative',
            }}>
            {activeTab === 2 ? (
              <>
                <GridHeaders
                  days={days}
                  cabinets={ADMIN_ROLES}
                  dayHeaderHeight={dayHeaderHeight}
                  cabinetHeaderHeight={cabinetHeaderHeight}
                  isMobile={isMobile}
                />
                <GridTimeSlots
                  days={days}
                  cabinets={ADMIN_ROLES}
                  slotHeight={slotHeight}
                  isMobile={isMobile}
                  onEmptyCellContextMenu={handleAdministratorEmptyCellContextMenu}
                  onTouchStart={memoizedOnTouchStart}
                  onTouchMove={memoizedOnTouchMove}
                  onTouchEnd={memoizedOnTouchEnd}
                  onKeyDown={memoizedOnKeyDown}
                />
                <AdministratorGrid
                  cabinets={ADMIN_ROLES}
                  administratorsCabinets={administratorsCabinetsByDay}
                  timeColumnWidth={timeColumnWidth}
                  eventColumnWidth={eventColumnWidth}
                  totalHeaderHeight={totalHeaderHeight}
                  slotHeight={slotHeight}
                  onAdministratorContextMenu={handleAdministratorContextMenu}
                  onEdit={handleAdministratorEdit}
                />
              </>
            ) : (
              <>
                <GridHeaders
                  days={days}
                  cabinets={gridCabinets}
                  dayHeaderHeight={dayHeaderHeight}
                  cabinetHeaderHeight={cabinetHeaderHeight}
                  isMobile={isMobile}
                />
                {activeTab === 0 && (
                  <>
                    <GridTimeSlots
                      days={days}
                      cabinets={gridCabinets}
                      slotHeight={slotHeight}
                      isMobile={isMobile}
                      onEmptyCellContextMenu={memoizedOnEmptyCellContextMenu}
                      onTouchStart={memoizedOnTouchStart}
                      onTouchMove={memoizedOnTouchMove}
                      onTouchEnd={memoizedOnTouchEnd}
                      onKeyDown={memoizedOnKeyDown}
                      isDropTarget={(dayIdx, cIdx, time) =>
                        dropTarget?.dayIdx === dayIdx && dropTarget?.cIdx === cIdx && dropTarget?.time === time
                      }
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                    />
                    {allShifts.map((shift) => {
                      const dayIdx = days.findIndex((d) => format(d, 'yyyy-MM-dd') === shift.date)
                      const cIdx = gridCabinets.findIndex((cab) => cab.id === shift.cabinetId)
                      if (dayIdx === -1 || cIdx === -1) return null
                      return (
                        <GridShift
                          key={`shift-${shift.id}-${shift.date}-${shift.cabinetId}`}
                          shift={shift}
                          dayIdx={dayIdx}
                          cIdx={cIdx}
                          timeColumnWidth={timeColumnWidth}
                          eventColumnWidth={eventColumnWidth}
                          totalHeaderHeight={totalHeaderHeight}
                          slotHeight={slotHeight}
                          onShiftHeaderContextMenu={handleShiftHeaderContextMenu}
                        />
                      )
                    })}
                    {events.map(({ event, day, dayIdx, cIdx }) => (
                      <GridEvent
                        key={`event-${dayIdx}-${event.id}`}
                        event={event}
                        day={day}
                        dayIdx={dayIdx}
                        cIdx={cIdx}
                        timeColumnWidth={timeColumnWidth}
                        eventColumnWidth={eventColumnWidth}
                        totalHeaderHeight={totalHeaderHeight}
                        slotHeight={slotHeight}
                        onEventClick={memoizedOnEventClick}
                        onEventDoubleClick={memoizedOnEventDoubleClick}
                        onEventContextMenu={memoizedOnEventContextMenu}
                        onTouchStart={memoizedOnTouchStart}
                        onTouchMove={memoizedOnTouchMove}
                        onTouchEnd={memoizedOnTouchEnd}
                        onKeyDown={memoizedOnKeyDown}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        isDragging={isDragging && draggedEvent?.id === event.id}
                        isMobile={isMobile}
                      />
                    ))}
                  </>
                )}
                {activeTab === 1 && (
                  <>
                    <GridTimeSlots
                      days={days}
                      cabinets={gridCabinets}
                      slotHeight={slotHeight}
                      isMobile={isMobile}
                      onEmptyCellContextMenu={handleAssistantEmptyCellContextMenu}
                      onTouchStart={memoizedOnTouchStart}
                      onTouchMove={memoizedOnTouchMove}
                      onTouchEnd={memoizedOnTouchEnd}
                      onKeyDown={memoizedOnKeyDown}
                    />
                    <AssistantGrid
                      cabinets={gridCabinets}
                      assistantsCabinets={assistantsCabinetsByDay}
                      timeColumnWidth={timeColumnWidth}
                      eventColumnWidth={eventColumnWidth}
                      totalHeaderHeight={totalHeaderHeight}
                      slotHeight={slotHeight}
                      onAssistantContextMenu={handleAssistantContextMenu}
                    />
                  </>
                )}
              </>
            )}
          </Box>
          {assistantContextMenu && (
            <AssistantContextMenu
              x={assistantContextMenu.x}
              y={assistantContextMenu.y}
              assistantId={assistantContextMenu.assistantId}
              onEdit={handleAssistantEdit}
              onClose={closeAssistantContextMenus}
              onDeleteAssistant={handleAssistantDeleteShift}
            />
          )}
          <ConfirmDeleteDialog
            open={deleteAssistantDialog.open}
            onClose={handleDeleteAssistantDialogClose}
            onConfirm={handleDeleteAssistantConfirm}
            title="Видалити зміну асистента"
            description="Ви впевнені, що хочете видалити цю зміну асистента?"
            warning="Цю дію не можна буде скасувати."
            cancelText="Скасувати"
            confirmText="Видалити"
          />
          {assistantEmptyCellContextMenu && (
            <AssistantEmptyCellContextMenu
              x={assistantEmptyCellContextMenu.x}
              y={assistantEmptyCellContextMenu.y}
              dayIdx={assistantEmptyCellContextMenu.dayIdx}
              cIdx={assistantEmptyCellContextMenu.cIdx}
              time={assistantEmptyCellContextMenu.time}
              onAddShift={handleCreateAssistantShiftModalOpen}
              onClose={closeAssistantContextMenus}
            />
          )}
          {administratorContextMenu && (
            <AdministratorContextMenu
              x={administratorContextMenu.x}
              y={administratorContextMenu.y}
              administratorId={administratorContextMenu.administratorId}
              onEdit={handleAdministratorEdit}
              onClose={() => setAdministratorContextMenu(null)}
              onDeleteAdministrator={handleAdministratorDeleteShift}
            />
          )}
          {administratorEmptyCellContextMenu && (
            <AdministratorEmptyCellContextMenu
              x={administratorEmptyCellContextMenu.x}
              y={administratorEmptyCellContextMenu.y}
              dayIdx={administratorEmptyCellContextMenu.dayIdx}
              cIdx={administratorEmptyCellContextMenu.cIdx}
              time={administratorEmptyCellContextMenu.time}
              onAddShift={handleAdministratorAddShift}
              onClose={() => setAdministratorEmptyCellContextMenu(null)}
            />
          )}
          {shiftContextMenu && (
            <ShiftContextMenu
              x={shiftContextMenu.x}
              y={shiftContextMenu.y}
              shift={shiftContextMenu.shift}
              onEdit={handleShiftEdit}
              onCopy={handleShiftCopy}
              onCut={handleShiftCut}
              onDelete={handleShiftDelete}
              onClose={closeShiftContextMenu}
            />
          )}
        </Box>
        <EditAssistantShiftModal
          open={editAssistantModal.open}
          onClose={handleEditAssistantModalClose}
          onSave={() => {
            // TODO: Save logic
            handleEditAssistantModalClose()
          }}
          initialCabinetId={editAssistantModal.assistant?.cabinetId}
          initialDate={undefined}
          initialDoctorId={editAssistantModal.assistant?.id}
          initialScheduledStart={
            editAssistantModal.assistant?.scheduledTimeStart
              ? new Date(`1970-01-01T${editAssistantModal.assistant.scheduledTimeStart}`)
              : undefined
          }
          initialScheduledEnd={
            editAssistantModal.assistant?.scheduledTimeEnd
              ? new Date(`1970-01-01T${editAssistantModal.assistant.scheduledTimeEnd}`)
              : undefined
          }
          initialActualStart={
            editAssistantModal.assistant?.actualTimeStart
              ? new Date(`1970-01-01T${editAssistantModal.assistant.actualTimeStart}`)
              : undefined
          }
          initialActualEnd={
            editAssistantModal.assistant?.actualTimeEnd
              ? new Date(`1970-01-01T${editAssistantModal.assistant.actualTimeEnd}`)
              : undefined
          }
        />
        <CreateAssistantShiftModal
          open={createAssistantShiftModal.open}
          onClose={handleCreateAssistantShiftModalClose}
          onSave={() => {
            // TODO: Save logic
            handleCreateAssistantShiftModalClose()
          }}
        />
        <CreateShiftModal
          open={createDoctorShiftModal.open}
          onClose={handleCreateDoctorShiftModalClose}
          onSave={() => {
            handleCreateDoctorShiftModalClose()
          }}
        />
        <EditAdministratorShiftModal
          open={editAdministratorModal.open}
          onClose={handleEditAdministratorModalClose}
          onSave={() => {
            // TODO: Save logic
            handleEditAdministratorModalClose()
          }}
          initialCabinetId={editAdministratorModal.administrator?.cabinetId}
          initialDate={undefined}
          initialDoctorId={editAdministratorModal.administrator?.id}
          initialScheduledStart={
            editAdministratorModal.administrator?.scheduledTimeStart
              ? new Date(`1970-01-01T${editAdministratorModal.administrator.scheduledTimeStart}`)
              : undefined
          }
          initialScheduledEnd={
            editAdministratorModal.administrator?.scheduledTimeEnd
              ? new Date(`1970-01-01T${editAdministratorModal.administrator.scheduledTimeEnd}`)
              : undefined
          }
          initialActualStart={
            editAdministratorModal.administrator?.actualTimeStart
              ? new Date(`1970-01-01T${editAdministratorModal.administrator.actualTimeStart}`)
              : undefined
          }
          initialActualEnd={
            editAdministratorModal.administrator?.actualTimeEnd
              ? new Date(`1970-01-01T${editAdministratorModal.administrator.actualTimeEnd}`)
              : undefined
          }
        />
        <CreateAdministratorShiftModal
          open={createAdministratorShiftModal.open}
          onClose={handleCreateAdministratorShiftModalClose}
          onSave={() => {
            handleCreateAdministratorShiftModalClose()
          }}
        />
        <ConfirmDeleteAdministratorDialog
          open={deleteAdministratorDialog.open}
          onClose={handleDeleteAdministratorDialogClose}
          onConfirm={handleDeleteAdministratorConfirm}
        />
      </>
    )
  }
)
