import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import PencilIcon from '../../../../shared/assets/icons/pencil.svg?react'
import TrashIcon from '../../../../shared/assets/icons/trash.svg?react'

interface AdministratorContextMenuProps {
  x: number
  y: number
  administratorId: number
  onEdit: (administratorId: number) => void
  onClose: () => void
  onDeleteAdministrator: (administratorId: number) => void
}

export const AdministratorContextMenu = React.memo(
  ({ x, y, administratorId, onEdit, onClose, onDeleteAdministrator }: AdministratorContextMenuProps) => {
    const handleEdit = () => {
      onEdit(administratorId)
      if (document.activeElement) {
        ;(document.activeElement as HTMLElement).blur()
      }
      onClose()
    }

    const handleDeleteAdministrator = () => {
      onDeleteAdministrator(administratorId)
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
        aria-label="Administrator actions"
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
          <Typography variant="body2">Редагувати зміну адміністратора</Typography>
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
              handleDeleteAdministrator()
            }
          }}
          onClick={(e) => {
            e.stopPropagation()
            handleDeleteAdministrator()
          }}
          onKeyDown={(e) => handleKeyDown(e, handleDeleteAdministrator)}>
          <TrashIcon style={{ width: 20, height: 20 }} />
          <Typography variant="body2">Видалити зміну</Typography>
        </Button>
      </Box>
    )
  }
)
