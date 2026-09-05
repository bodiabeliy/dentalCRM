import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import PencilIcon from '../../../../shared/assets/icons/pencil.svg?react'
import TrashIcon from '../../../../shared/assets/icons/trash.svg?react'

interface AssistantContextMenuProps {
  x: number
  y: number
  assistantId: number
  onEdit: (assistantId: number) => void
  onClose: () => void
  onDeleteAssistant: (assistantId: number) => void
}

export const AssistantContextMenu = React.memo(
  ({ x, y, assistantId, onEdit, onClose, onDeleteAssistant }: AssistantContextMenuProps) => {
    const handleEdit = () => {
      onEdit(assistantId)
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
      onClose()
    }

    const handleDeleteAssistant = () => {
      onDeleteAssistant(assistantId)
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
        aria-label="Assistant actions"
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
          <Typography variant="body2">Редагувати зміну асистента</Typography>
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
              handleDeleteAssistant()
            }
          }}
          onClick={(e) => {
            e.stopPropagation()
            handleDeleteAssistant()
          }}
          onKeyDown={(e) => handleKeyDown(e, handleDeleteAssistant)}>
          <TrashIcon style={{ width: 20, height: 20 }} />
          <Typography variant="body2">Видалити зміну</Typography>
        </Button>
      </Box>
    )
  }
)
