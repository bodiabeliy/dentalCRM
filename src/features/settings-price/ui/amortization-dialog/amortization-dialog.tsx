import { useState } from 'react'
import { Dialog, DialogContent, Box, Typography, TextField, Button, InputAdornment, Divider } from '@mui/material'
import AmortisationIcon from '../../../../shared/assets/icons/amortisation.svg?react'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import CurrencyUahIcon from '../../../../shared/assets/icons/currency_uah.svg?react'

interface AmortizationDialogProps {
  open: boolean
  onClose: () => void
  onSave: (data: Record<string, unknown>) => void
}

export function AmortizationDialog({ open, onClose, onSave }: AmortizationDialogProps) {
  const [purchaseTime, setPurchaseTime] = useState('13:30')
  const [usagePeriod, setUsagePeriod] = useState('20')
  const [initialValue, setInitialValue] = useState('123')
  const [residualValue] = useState('Залишкова вартість на сьогодні')

  const handleSave = () => {
    onSave({ purchaseTime, usagePeriod, initialValue, residualValue })
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2, background: '#f4f7fe' }}>
        <AmortisationIcon style={{ color: '#0029d9', marginRight: 8 }} />
        <Typography variant="h6" sx={{ fontWeight: 500, flex: 1 }}>
          Амортизація
        </Typography>
      </Box>
      <DialogContent sx={{ pb: 0, pt: 2 }}>
        <TextField
          label="Дата закупівлі"
          value={purchaseTime}
          onChange={(e) => setPurchaseTime(e.target.value)}
          fullWidth
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <CalendarTodayIcon style={{ fillOpacity: 0.54, color: '#000', marginLeft: 8 }} />
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <TextField
            label="Період експлуатації"
            value={usagePeriod}
            onChange={(e) => setUsagePeriod(e.target.value)}
            fullWidth
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ color: '#000' }}>
                  Днів
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <TextField
          label="Первісна вартість"
          value={initialValue}
          onChange={(e) => setInitialValue(e.target.value)}
          fullWidth
          variant="outlined"
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CurrencyUahIcon style={{ fillOpacity: 0.54, color: '#000', marginLeft: 8 }} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Залишкова вартість на сьогодні"
          value={residualValue}
          fullWidth
          variant="filled"
          margin="normal"
          sx={{
            mt: 2,
            mb: 1,
          }}
        />
      </DialogContent>
      <Divider />
      <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'flex-start', px: 3, pb: 3, pt: 1 }}>
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
