import React, { createContext, useContext, useState, useCallback, useRef } from 'react'
import type {
  Event,
  PopupState,
  EmptyCellPopupState,
  TouchContextState,
  SelectedEvent,
} from '../../features/schedule/types/schedule-types'

interface ModalState {
  appointmentModal: {
    isOpen: boolean
    event: SelectedEvent | null
  }
  editModal: {
    isOpen: boolean
    event: Event | null
  }
  addEventModal: {
    isOpen: boolean
    initialDate?: string
    initialTime?: string
    initialCabinetId?: number
  }
  createShiftModal: {
    isOpen: boolean
    initialCabinetId?: number
    initialDate?: string
  }
  reserveTimeModal: {
    isOpen: boolean
    shiftId?: number
    initialDate?: string
  }
  contextMenu: {
    popup: PopupState | null
    emptyCellPopup: EmptyCellPopupState | null
  }
  touchContext: TouchContextState
}

interface ModalContextType extends ModalState {
  openAppointmentModal: (event: SelectedEvent) => void
  closeAppointmentModal: () => void
  openEditModal: (event: Event) => void
  closeEditModal: () => void
  openAddEventModal: (initialDate?: string, initialTime?: string, initialCabinetId?: number) => void
  closeAddEventModal: () => void
  openCreateShiftModal: (initialCabinetId?: number, initialDate?: string) => void
  closeCreateShiftModal: () => void
  openReserveTimeModal: (shiftId?: number, initialDate?: string) => void
  closeReserveTimeModal: () => void
  openContextMenu: (popup: PopupState) => void
  openEmptyCellContextMenu: (popup: EmptyCellPopupState) => void
  closeContextMenus: () => void
  handleTouchStart: (e: React.TouchEvent, eventId?: number, dayIdx?: number, cIdx?: number, time?: string) => void
  handleTouchMove: (e: React.TouchEvent) => void
  handleTouchEnd: () => void
  adjustPopupPosition: (x: number, y: number, width?: number, height?: number) => { x: number; y: number }
  setGetEventsForCell: (fn: (dayIdx: number, cIdx: number, time: string) => Event[]) => void
}

const ModalContext = createContext<ModalContextType | null>(null)

interface ModalProviderProps {
  children: React.ReactNode
}

const LONG_PRESS_DURATION = 500

export function ModalProvider({ children }: ModalProviderProps) {
  const [modalState, setModalState] = useState<ModalState>({
    appointmentModal: {
      isOpen: false,
      event: null,
    },
    editModal: {
      isOpen: false,
      event: null,
    },
    addEventModal: {
      isOpen: false,
    },
    createShiftModal: {
      isOpen: false,
    },
    reserveTimeModal: {
      isOpen: false,
    },
    contextMenu: {
      popup: null,
      emptyCellPopup: null,
    },
    touchContext: {
      isLongPressing: false,
      longPressTimer: null,
      touchStartTime: 0,
      touchStartPosition: { x: 0, y: 0 },
      currentTarget: null,
    },
  })

  const getEventsForCellRef = useRef<((dayIdx: number, cIdx: number, time: string) => Event[]) | null>(null)

  const openAppointmentModal = useCallback((event: SelectedEvent) => {
    setModalState((prev) => ({
      ...prev,
      appointmentModal: {
        isOpen: true,
        event,
      },
      contextMenu: {
        popup: null,
        emptyCellPopup: null,
      },
    }))
  }, [])

  const closeAppointmentModal = useCallback(() => {
    setModalState((prev) => ({
      ...prev,
      appointmentModal: {
        isOpen: false,
        event: null,
      },
    }))
  }, [])

  const openEditModal = useCallback((event: Event) => {
    setModalState((prev) => ({
      ...prev,
      editModal: {
        isOpen: true,
        event,
      },
      contextMenu: {
        popup: null,
        emptyCellPopup: null,
      },
    }))
  }, [])

  const closeEditModal = useCallback(() => {
    setModalState((prev) => ({
      ...prev,
      editModal: {
        isOpen: false,
        event: null,
      },
    }))
  }, [])

  const openAddEventModal = useCallback((initialDate?: string, initialTime?: string, initialCabinetId?: number) => {
    setModalState((prev) => ({
      ...prev,
      addEventModal: {
        isOpen: true,
        initialDate,
        initialTime,
        initialCabinetId,
      },
    }))
  }, [])

  const closeAddEventModal = useCallback(() => {
    setModalState((prev) => ({
      ...prev,
      addEventModal: {
        isOpen: false,
      },
    }))
  }, [])

  const openCreateShiftModal = useCallback((initialCabinetId?: number, initialDate?: string) => {
    setModalState((prev) => ({
      ...prev,
      createShiftModal: {
        isOpen: true,
        initialCabinetId,
        initialDate,
      },
      contextMenu: {
        popup: null,
        emptyCellPopup: null,
      },
    }))
  }, [])

  const closeCreateShiftModal = useCallback(() => {
    setModalState((prev) => ({
      ...prev,
      createShiftModal: {
        isOpen: false,
      },
    }))
  }, [])

  const openReserveTimeModal = useCallback((shiftId?: number, initialDate?: string) => {
    setModalState((prev) => ({
      ...prev,
      reserveTimeModal: {
        isOpen: true,
        shiftId,
        initialDate,
      },
      contextMenu: {
        popup: null,
        emptyCellPopup: null,
      },
    }))
  }, [])

  const closeReserveTimeModal = useCallback(() => {
    setModalState((prev) => ({
      ...prev,
      reserveTimeModal: {
        isOpen: false,
      },
    }))
  }, [])

  const openContextMenu = useCallback((popup: PopupState) => {
    setModalState((prev) => ({
      ...prev,
      contextMenu: {
        popup,
        emptyCellPopup: null,
      },
    }))
  }, [])

  const openEmptyCellContextMenu = useCallback((popup: EmptyCellPopupState) => {
    setModalState((prev) => ({
      ...prev,
      contextMenu: {
        popup: null,
        emptyCellPopup: popup,
      },
    }))
  }, [])

  const closeContextMenus = useCallback(() => {
    setModalState((prev) => ({
      ...prev,
      contextMenu: {
        popup: null,
        emptyCellPopup: null,
      },
    }))
  }, [])

  const handleTouchStart = useCallback(
    (e: React.TouchEvent, eventId?: number, dayIdx?: number, cIdx?: number, time?: string) => {
      const touch = e.touches[0]
      const target = e.currentTarget as HTMLElement

      const longPressTimer = window.setTimeout(() => {
        const x = touch.clientX
        const y = touch.clientY

        if (eventId !== undefined) {
          openContextMenu({ x, y, eventId, triggerType: 'touch' })
        } else if (dayIdx !== undefined && cIdx !== undefined && time !== undefined) {
          const getEventsForCell = getEventsForCellRef.current
          if (getEventsForCell) {
            const cellEvents = getEventsForCell(dayIdx, cIdx, time)
            if (cellEvents.length === 0) {
              openEmptyCellContextMenu({ x, y, dayIdx, cIdx, time, triggerType: 'touch' })
            }
          }
        }

        setModalState((prev) => ({
          ...prev,
          touchContext: { ...prev.touchContext, isLongPressing: true },
        }))
      }, LONG_PRESS_DURATION)

      setModalState((prev) => ({
        ...prev,
        touchContext: {
          isLongPressing: false,
          longPressTimer,
          touchStartTime: Date.now(),
          touchStartPosition: { x: touch.clientX, y: touch.clientY },
          currentTarget: target,
        },
      }))
    },
    [openContextMenu, openEmptyCellContextMenu]
  )

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      const touch = e.touches[0]
      const deltaX = Math.abs(touch.clientX - modalState.touchContext.touchStartPosition.x)
      const deltaY = Math.abs(touch.clientY - modalState.touchContext.touchStartPosition.y)

      if (deltaX > 10 || deltaY > 10) {
        if (modalState.touchContext.longPressTimer) {
          clearTimeout(modalState.touchContext.longPressTimer)
        }
        setModalState((prev) => ({
          ...prev,
          touchContext: { ...prev.touchContext, longPressTimer: null },
        }))
      }
    },
    [
      modalState.touchContext.touchStartPosition.x,
      modalState.touchContext.touchStartPosition.y,
      modalState.touchContext.longPressTimer,
    ]
  )

  const handleTouchEnd = useCallback(() => {
    if (modalState.touchContext.longPressTimer) {
      clearTimeout(modalState.touchContext.longPressTimer)
    }

    setModalState((prev) => ({
      ...prev,
      touchContext: {
        isLongPressing: false,
        longPressTimer: null,
        touchStartTime: 0,
        touchStartPosition: { x: 0, y: 0 },
        currentTarget: null,
      },
    }))
  }, [modalState.touchContext.longPressTimer])

  const adjustPopupPosition = useCallback((x: number, y: number, width: number = 240, height: number = 200) => {
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    let adjustedX = x
    let adjustedY = y

    if (x + width > viewportWidth) {
      adjustedX = x - width
    }

    if (y + height > viewportHeight) {
      adjustedY = y - height
    }

    return { x: adjustedX, y: adjustedY }
  }, [])

  const setGetEventsForCell = useCallback((fn: (dayIdx: number, cIdx: number, time: string) => Event[]) => {
    getEventsForCellRef.current = fn
  }, [])

  const value: ModalContextType = {
    appointmentModal: modalState.appointmentModal,
    editModal: modalState.editModal,
    addEventModal: modalState.addEventModal,
    createShiftModal: modalState.createShiftModal,
    reserveTimeModal: modalState.reserveTimeModal,
    contextMenu: modalState.contextMenu,
    touchContext: modalState.touchContext,
    openAppointmentModal,
    closeAppointmentModal,
    openEditModal,
    closeEditModal,
    openAddEventModal,
    closeAddEventModal,
    openCreateShiftModal,
    closeCreateShiftModal,
    openReserveTimeModal,
    closeReserveTimeModal,
    openContextMenu,
    openEmptyCellContextMenu,
    closeContextMenus,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    adjustPopupPosition,
    setGetEventsForCell,
  }

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}

export function useModals() {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModals must be used within a ModalProvider')
  }
  return context
}
