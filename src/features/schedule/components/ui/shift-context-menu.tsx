import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import PencilIcon from '../../../../shared/assets/icons/pencil.svg?react'
import CopyIcon from '../../../../shared/assets/icons/copy.svg?react'
import ScissorsIcon from '../../../../shared/assets/icons/scissors.svg?react'
import TrashIcon from '../../../../shared/assets/icons/trash.svg?react'
import type { Shift } from '../../types/schedule-types'

interface ShiftContextMenuProps {
  x: number
  y: number
  shift: Shift
  onEdit: (shift: Shift) => void
  onCopy: (shift: Shift) => void
  onCut: (shift: Shift) => void
  onDelete: (shift: Shift) => void
  onClose: () => void
}

export const ShiftContextMenu = React.memo(
  ({ x, y, shift, onEdit, onCopy, onCut, onDelete, onClose }: ShiftContextMenuProps) => {
    const handleEdit = () => {
      onEdit(shift)
      onClose()
    }
    const handleCopy = () => {
      onCopy(shift)
      onClose()
    }
    const handleCut = () => {
      onCut(shift)
      onClose()
    }
    const handleDelete = () => {
      onDelete(shift)
      onClose()
    }
    const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        action()
      }
    }
    return (
      <Box
        role="menu"
        aria-label="Shift actions"
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
              handleEdit()
            }
          }}
          onClick={(e) => {
            e.stopPropagation()
            handleEdit()
          }}
          onKeyDown={(e) => handleKeyDown(e, handleEdit)}>
          <PencilIcon style={{ width: 20, height: 20 }} />
          <Typography variant="body2">Редагувати зміну лікаря</Typography>
        </Button>
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
              handleCopy()
            }
          }}
          onClick={(e) => {
            e.stopPropagation()
            handleCopy()
          }}
          onKeyDown={(e) => handleKeyDown(e, handleCopy)}>
          <CopyIcon style={{ width: 20, height: 20 }} />
          <Typography variant="body2">Копіювати зміну лікаря</Typography>
        </Button>
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
              handleCut()
            }
          }}
          onClick={(e) => {
            e.stopPropagation()
            handleCut()
          }}
          onKeyDown={(e) => handleKeyDown(e, handleCut)}>
          <ScissorsIcon style={{ width: 20, height: 20 }} />
          <Typography variant="body2">Вирізати зміну лікаря</Typography>
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
          onMouseDown={(e) => {
            if (e.button === 0) {
              e.stopPropagation()
              handleDelete()
            }
          }}
          onClick={(e) => {
            e.stopPropagation()
            handleDelete()
          }}
          onKeyDown={(e) => handleKeyDown(e, handleDelete)}>
          <TrashIcon style={{ width: 20, height: 20 }} />
          <Typography variant="body2" color="rgba(211, 47, 47, 1)">
            Видалити зміну лікаря
          </Typography>
        </Button>
      </Box>
    )
  }
)
