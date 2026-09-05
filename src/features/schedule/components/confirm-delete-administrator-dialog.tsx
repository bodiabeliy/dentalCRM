import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material'
import TrashIcon from '../../../shared/assets/icons/trash.svg?react'

interface ConfirmDeleteAdministratorDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

export const ConfirmDeleteAdministratorDialog: React.FC<ConfirmDeleteAdministratorDialogProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      PaperProps={{
        sx: {
          borderRadius: 3,
        },
      }}>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <TrashIcon style={{ width: 24, height: 24, color: '#e53935' }} />
        Видалити зміну адміністратора
      </DialogTitle>
      <DialogContent>
        <Typography sx={{ mb: 1 }}>Ви впевнені, що хочете видалити цю зміну адміністратора?</Typography>
        <Typography color="error" sx={{ fontSize: 13 }}>
          Цю дію не можна буде скасувати.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="primary">
          Скасувати
        </Button>
        <Button onClick={onConfirm} variant="contained" color="error">
          Видалити
        </Button>
      </DialogActions>
    </Dialog>
  )
}
