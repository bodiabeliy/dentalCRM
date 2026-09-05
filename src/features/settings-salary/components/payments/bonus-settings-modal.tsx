import { Dialog, DialogContent, Button, Box, TextField, IconButton, Typography } from '@mui/material'
import { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import BonusIcon from '../../../../shared/assets/icons/settings_general.svg?react'

export default function BonusSettingsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [days, setDays] = useState('10')
  const [rows, setRows] = useState([
    { sum: '5000', bonus: '300' },
    { sum: '5000', bonus: '300' },
  ])

  const handleRowChange = (idx: number, field: 'sum' | 'bonus', value: string) => {
    setRows((rows) => rows.map((row, i) => (i === idx ? { ...row, [field]: value } : row)))
  }

  const handleAddRow = () => {
    setRows((rows) => [...rows, { sum: '', bonus: '' }])
  }

  const handleRemoveRow = (idx: number) => {
    setRows((rows) => rows.filter((_, i) => i !== idx))
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2, background: '#f4f7fe' }}>
        <BonusIcon style={{ color: '#0029d9', marginRight: 8 }} />
        <Typography variant="h6" sx={{ fontWeight: 500, flex: 1 }}>
          Бонуси
        </Typography>
      </Box>
      <DialogContent sx={{ pt: 1 }}>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            label="Кількість днів за які рахувати бонус"
            value={days}
            onChange={(e) => setDays(e.target.value.replace(/\D/g, ''))}
            fullWidth
            inputProps={{ inputMode: 'numeric', pattern: '[0-9 ]*' }}
          />
          {rows.map((row, idx) => (
            <Box key={idx} display="flex" gap={2} alignItems="center">
              <TextField
                label="Сума"
                value={row.sum}
                onChange={(e) => handleRowChange(idx, 'sum', e.target.value.replace(/\D/g, ''))}
                fullWidth
                inputProps={{ inputMode: 'numeric', pattern: '[0-9 ]*' }}
              />
              <TextField
                label="Бонус"
                value={row.bonus}
                onChange={(e) => handleRowChange(idx, 'bonus', e.target.value.replace(/\D/g, ''))}
                fullWidth
                inputProps={{ inputMode: 'numeric', pattern: '[0-9 ]*' }}
              />
              <IconButton onClick={() => handleRemoveRow(idx)} disabled={rows.length <= 1}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          <Button
            onClick={handleAddRow}
            sx={{
              color: '#7324d5',
              border: '1px solid #7324d5',
              borderRadius: 2,
              fontWeight: 500,
              mt: 1,
              fontSize: 14,
            }}
            fullWidth>
            + ДОДАТИ ХАРАКТЕРИСТИКУ
          </Button>
        </Box>
      </DialogContent>
      <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'flex-start', px: 3, pb: 3, pt: 1 }}>
        <Button
          variant="outlined"
          sx={{ borderColor: '#0029d9', color: '#0029d9', padding: '12px 22px' }}
          onClick={onClose}>
          СКАСУВАТИ
        </Button>
        <Button variant="contained" sx={{ bgcolor: '#0029d9', padding: '12px 22px', flex: 1 }} onClick={() => {}}>
          ЗБЕРЕГТИ
        </Button>
      </Box>
    </Dialog>
  )
}
