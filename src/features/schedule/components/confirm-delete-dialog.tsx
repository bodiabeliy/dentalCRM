import React from 'react'
import { Dialog, DialogTitle, DialogContent, Button, Typography, Box } from '@mui/material'
import TrashIcon from '../../../shared/assets/icons/trash.svg?react'

interface ConfirmDeleteDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  description?: string
  warning?: string
  cancelText?: string
  confirmText?: string
}

export const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title = 'Видалити',
  description = 'Ви впевнені, що хочете видалити?',
  warning = 'Цю дію не можна буде скасувати.',
  cancelText = 'Скасувати',
  confirmText = 'Видалити',
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 0,
          background: '#fff',
          boxShadow: '0 4px 24px rgba(44,51,74,0.12)',
          width: '100%',
        },
      }}>
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          bgcolor: '#eff3ff',
          fontWeight: 500,
          fontSize: 20,
          pb: 1,
        }}>
        <TrashIcon style={{ color: '#d32f2f', width: 24, height: 24 }} />
        {title}
      </DialogTitle>
      <DialogContent sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 500, textAlign: 'center', pt: 2 }}>
          {description}
        </Typography>
        <Typography variant="body2" sx={{ textAlign: 'center' }}>
          {warning}
        </Typography>
      </DialogContent>
      <Box sx={{ display: 'flex', gap: '8px', mt: 2, p: 2 }}>
        <Button
          variant="outlined"
          sx={{
            padding: '12px 22px',
          }}
          onClick={onClose}>
          {cancelText}
        </Button>
        <Button
          sx={{
            flex: 1,
            padding: '12px 22px',
          }}
          onClick={onConfirm}
          variant="contained">
          {confirmText}
        </Button>
      </Box>
    </Dialog>
  )
}
