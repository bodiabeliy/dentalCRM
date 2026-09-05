import { Dialog, DialogContent, Button, Box, Typography } from '@mui/material'
import TrashIcon from '../../../../shared/assets/icons/trash.svg?react'

interface DeletionModalProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  selectedCount: number
  isSingleItem?: boolean
}

export function DeletionModal({ open, onClose, onConfirm, selectedCount, isSingleItem = false }: DeletionModalProps) {
  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2, background: '#f4f7fe', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TrashIcon style={{ color: '#d32f2f', marginRight: 8 }} />
          <Typography variant="h6" sx={{ fontWeight: 500, flex: 1 }}>
            Підтвердження видалення
          </Typography>
        </Box>
        {isSingleItem && <Typography variant="body1">Вибрано: {selectedCount}</Typography>}
      </Box>
      <DialogContent sx={{ px: 3, pb: 2 }}>
        <Typography variant="h6" sx={{ textAlign: 'center' }}>
          {isSingleItem ? 'Ви дійсно хочете видалити цього пацієнта?' : 'Ви дійсно хочете видалити вибрані дані?'}
        </Typography>
        <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
          Ця дія є остаточною
        </Typography>
      </DialogContent>
      <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'flex-start', px: 3, pb: 3, pt: 1, mt: 2 }}>
        <Button
          variant="outlined"
          sx={{ borderColor: '#0029d9', color: '#0029d9', padding: '12px 22px' }}
          onClick={onClose}>
          СКАСУВАТИ
        </Button>
        <Button variant="contained" sx={{ bgcolor: '#0029d9', padding: '12px 22px', flex: 1 }} onClick={handleConfirm}>
          ВИДАЛИТИ
        </Button>
      </Box>
    </Dialog>
  )
}
