import React from 'react'
import { Box, Button } from '@mui/material'
import { useEffect, useRef } from 'react'
import type { PopupState, EmptyCellPopupState } from '../types/schedule-types'
import { useTranslation } from 'react-i18next'
import { useModals } from '../../../shared/contexts/modal-context'
import { useSchedule } from '../contexts/schedule-context'
import { format } from 'date-fns'

import AddPatientIcon from '../../../shared/assets/icons/add-patient.svg?react'
import AddTimeIcon from '../../../shared/assets/icons/add-time.svg?react'
import PencilIcon from '../../../shared/assets/icons/pencil.svg?react'
// import ScissorsIcon from '../../../shared/assets/icons/scissors.svg?react'
import TrashIcon from '../../../shared/assets/icons/trash.svg?react'
import PlusIcon from '../../../shared/assets/icons/plus.svg?react'
import { ConfirmDeleteDialog } from './confirm-delete-dialog'

interface ContextMenusProps {
  popup: PopupState | null
  emptyCellPopup: EmptyCellPopupState | null
  onEditEvent: (eventId: number) => void
  onClosePopups: () => void
  adjustPopupPosition?: (x: number, y: number, width?: number, height?: number) => { x: number; y: number }
  onDeleteEvent: (eventId: number) => void
  onAddPatientVisit?: (dayIdx: number, cIdx: number, time: string) => void
}

export function ContextMenus({
  popup,
  emptyCellPopup,
  onEditEvent,
  onClosePopups,
  adjustPopupPosition,
  onDeleteEvent,
  onAddPatientVisit,
}: ContextMenusProps) {
  const popupRef = useRef<HTMLDivElement>(null)
  const emptyCellPopupRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const { openCreateShiftModal, openReserveTimeModal } = useModals()
  const { scheduleData, days } = useSchedule()

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClosePopups()
      }
    }

    if (popup || emptyCellPopup) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [popup, emptyCellPopup, onClosePopups])

  const getAdjustedPosition = (x: number, y: number, width: number = 240, height: number = 200) => {
    if (adjustPopupPosition) {
      return adjustPopupPosition(x, y, width, height)
    }
    return { x, y }
  }

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      action()
    }
  }

  if (popup) {
    const { x, y } = getAdjustedPosition(popup.x, popup.y, 230, 160)

    return (
      <>
        <Box
          ref={popupRef}
          role="menu"
          aria-label="Event actions"
          tabIndex={-1}
          sx={{
            position: 'fixed',
            top: y,
            left: x,
            background: '#fff',
            boxShadow: '0 4px 24px rgba(44,51,74,0.12)',
            borderRadius: 2,
            zIndex: 1201,
            minWidth: 230,
            outline: 'none',
          }}>
          <Button
            role="menuitem"
            tabIndex={0}
            fullWidth
            sx={{
              p: '8px 16px',
              cursor: 'pointer',
              color: '#000',
              justifyContent: 'flex-start',
              textTransform: 'none',
              '&:hover': { bgcolor: '#f7f7fa' },
              '&:focus': { bgcolor: '#f7f7fa', outline: '2px solid #1976d2' },
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
            onMouseDown={(e) => {
              if (e.button === 0) {
                e.stopPropagation()
                onEditEvent(popup.eventId)
                onClosePopups()
              }
            }}
            onClick={(e) => {
              e.stopPropagation()
              onEditEvent(popup.eventId)
              onClosePopups()
            }}
            onKeyDown={(e) =>
              handleKeyDown(e, () => {
                onEditEvent(popup.eventId)
                onClosePopups()
              })
            }>
            <PencilIcon style={{ width: 20, height: 20 }} />
            <span style={{ fontWeight: 400 }}>{t('edit-visit')}</span>
          </Button>
          <Button
            role="menuitem"
            tabIndex={0}
            fullWidth
            sx={{
              p: '8px 16px',
              cursor: 'pointer',
              color: 'rgba(211, 47, 47, 1)',
              justifyContent: 'flex-start',
              textTransform: 'none',
              '&:hover': { bgcolor: '#fbeaea' },
              '&:focus': { bgcolor: '#fbeaea', outline: '2px solid #d32f2f' },
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
            onClick={(e) => {
              e.stopPropagation()
              setDeleteDialogOpen(true)
            }}
            onKeyDown={(e) => handleKeyDown(e, () => setDeleteDialogOpen(true))}>
            <TrashIcon style={{ width: 20, height: 20 }} />
            <span style={{ fontWeight: 400 }}>{t('delete-visit')}</span>
          </Button>
        </Box>
        <ConfirmDeleteDialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onConfirm={() => {
            if (popup) {
              onDeleteEvent(popup.eventId)
            }
            setDeleteDialogOpen(false)
            onClosePopups()
          }}
        />
      </>
    )
  }

  if (emptyCellPopup) {
    const { x, y } = getAdjustedPosition(emptyCellPopup.x, emptyCellPopup.y, 240, 200)

    return (
      <Box
        ref={emptyCellPopupRef}
        role="menu"
        aria-label="Cell actions"
        tabIndex={-1}
        sx={{
          position: 'fixed',
          top: y,
          left: x,
          background: '#fff',
          boxShadow: '0 4px 24px rgba(44,51,74,0.12)',
          borderRadius: 2,
          zIndex: 1201,
          minWidth: 240,
          p: '8px 0',
          outline: 'none',
        }}>
        <Button
          role="menuitem"
          tabIndex={0}
          fullWidth
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            p: '8px 16px',
            cursor: 'pointer',
            color: '#000',
            justifyContent: 'flex-start',
            textTransform: 'none',
            '&:hover': { bgcolor: '#f7f7fa' },
            '&:focus': { bgcolor: '#f7f7fa', outline: '2px solid #1976d2' },
          }}
          onClick={(e) => {
            e.stopPropagation()
            if (onAddPatientVisit && emptyCellPopup) {
              onAddPatientVisit(emptyCellPopup.dayIdx, emptyCellPopup.cIdx, emptyCellPopup.time)
            }
            onClosePopups()
          }}
          onKeyDown={(e) =>
            handleKeyDown(e, () => {
              if (onAddPatientVisit && emptyCellPopup) {
                onAddPatientVisit(emptyCellPopup.dayIdx, emptyCellPopup.cIdx, emptyCellPopup.time)
              }
              onClosePopups()
            })
          }>
          <AddPatientIcon style={{ width: 20, height: 20 }} />
          <span>{t('add-patient-visit')}</span>
        </Button>
        <Button
          role="menuitem"
          tabIndex={0}
          fullWidth
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            p: '8px 16px',
            cursor: 'pointer',
            color: '#000',
            justifyContent: 'flex-start',
            textTransform: 'none',
            '&:hover': { bgcolor: '#f7f7fa' },
            '&:focus': { bgcolor: '#f7f7fa', outline: '2px solid #1976d2' },
          }}
          onClick={(e) => {
            e.stopPropagation()
            if (emptyCellPopup) {
              // Get the actual cabinet ID from the schedule data
              const cabinet = scheduleData?.cabinets[emptyCellPopup.cIdx]
              if (cabinet) {
                // Get the date for the specific day and cabinet
                const selectedDay = days[emptyCellPopup.dayIdx]
                const dateKey = format(selectedDay, 'yyyy-MM-dd')
                openCreateShiftModal(cabinet.id, dateKey)
              } else {
                openCreateShiftModal()
              }
            } else {
              openCreateShiftModal()
            }
            onClosePopups()
          }}
          onKeyDown={(e) => handleKeyDown(e, onClosePopups)}>
          <PlusIcon style={{ width: 20, height: 20 }} />
          <span>{t('add-doctor-shift')}</span>
        </Button>
        <Button
          role="menuitem"
          tabIndex={0}
          fullWidth
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            p: '8px 16px',
            cursor: 'pointer',
            color: '#000',
            justifyContent: 'flex-start',
            textTransform: 'none',
            '&:hover': { bgcolor: '#f7f7fa' },
            '&:focus': { bgcolor: '#f7f7fa', outline: '2px solid #1976d2' },
          }}
          onClick={(e) => {
            e.stopPropagation()
            if (emptyCellPopup) {
              openReserveTimeModal(emptyCellPopup.dayIdx, emptyCellPopup.time)
            }
            onClosePopups()
          }}
          onKeyDown={(e) => handleKeyDown(e, onClosePopups)}>
          <AddTimeIcon style={{ width: 20, height: 20 }} />
          <span>{t('add-time-reserve')}</span>
        </Button>
      </Box>
    )
  }

  return null
}
