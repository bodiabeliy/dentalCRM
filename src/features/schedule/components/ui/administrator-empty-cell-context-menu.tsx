import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import PlusIcon from '../../../../shared/assets/icons/plus.svg?react'

interface AdministratorEmptyCellContextMenuProps {
  x: number
  y: number
  dayIdx: number
  cIdx: number
  time: string
  onAddShift: (dayIdx: number, cIdx: number, time: string) => void
  onClose: () => void
}

export const AdministratorEmptyCellContextMenu = React.memo(
  ({ x, y, dayIdx, cIdx, time, onAddShift, onClose }: AdministratorEmptyCellContextMenuProps) => {
    const handleAddShift = () => {
      onAddShift(dayIdx, cIdx, time)
      if (document.activeElement) {
        ;(document.activeElement as HTMLElement).blur()
      }
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
        aria-label="Administrator cell actions"
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
              handleAddShift()
            }
          }}
          onClick={(e) => {
            e.stopPropagation()
            handleAddShift()
          }}
          onKeyDown={(e) => handleKeyDown(e, handleAddShift)}>
          <PlusIcon style={{ width: 20, height: 20 }} />
          <Typography variant="body2">Додати зміну адміністратора</Typography>
        </Button>
      </Box>
    )
  }
)
