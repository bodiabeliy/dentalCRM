import { Dialog, DialogContent, Box, Typography, TextField, IconButton, Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import PencilIcon from '../../../../shared/assets/icons/pencil.svg?react'
import { CheckBox } from '@mui/icons-material'

interface PriceDetailsDialogProps {
  open: boolean
  onClose: () => void
  names: string[]
  onNamesChange: (names: string[]) => void
  onSave: () => void
}

export function PriceDetailsDialog({ open, onClose, names, onNamesChange, onSave }: PriceDetailsDialogProps) {
  const handleAddName = () => {
    onNamesChange([...names, ''])
  }

  const handleRemoveName = (idx: number) => {
    onNamesChange(names.filter((_, i) => i !== idx))
  }

  const handleNameChange = (idx: number, val: string) => {
    onNamesChange(names.map((r, i) => (i === idx ? val : r)))
  }

  const handleSave = () => {
    onSave()
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2, background: '#f4f7fe' }}>
        <PencilIcon style={{ color: '#0029d9', marginRight: 8 }} />
        <Typography variant="h6" sx={{ fontWeight: 500, flex: 1 }}>
          Деталі прайсу
        </Typography>
      </Box>
      <DialogContent sx={{ pb: 0 }}>
        {names.map((name, idx) => (
          <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
            <TextField
              label="Вкажіть назву"
              value={name}
              onChange={(e) => handleNameChange(idx, e.target.value)}
              fullWidth
              sx={{ background: '#fff', borderRadius: 2, flex: 1 }}
              InputLabelProps={{ shrink: true }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CheckBox />
              <Typography>Обов'язкове поле</Typography>
            </Box>
            <IconButton onClick={() => handleRemoveName(idx)} sx={{ ml: 1 }}>
              <DeleteIcon sx={{ color: '#000', fillOpacity: 0.56 }} />
            </IconButton>
          </Box>
        ))}
        <Button
          variant="outlined"
          fullWidth
          sx={{ borderColor: '#7324d5', color: '#7324d5', mt: 1, mb: 2, textTransform: 'uppercase' }}
          onClick={handleAddName}>
          + ДОДАТИ ЩЕ ОДИН ПУНКТ
        </Button>
      </DialogContent>
      <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'flex-start', px: 3, pb: 3, pt: 1 }}>
        <IconButton>
          <DeleteIcon sx={{ color: '#000', fillOpacity: 0.56 }} />
        </IconButton>
        <Button
          variant="outlined"
          sx={{ borderColor: '#0029d9', color: '#0029d9', padding: '12px 22px' }}
          onClick={onClose}>
          СКАСУВАТИ
        </Button>
        <Button variant="contained" sx={{ bgcolor: '#0029d9', padding: '12px 22px', flex: 1 }} onClick={handleSave}>
          ЗБЕРЕГТИ
        </Button>
      </Box>
    </Dialog>
  )
}
