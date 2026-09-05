import {
  Dialog,
  DialogContent,
  Button,
  Box,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  IconButton,
  Typography,
} from '@mui/material'
import { UniversalDatePicker } from '../../../../shared/components'
import { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { uk } from 'date-fns/locale'
import SettingsIcon from '../../../../shared/assets/icons/settings_general.svg?react'

const monthsUk = [
  'Січень',
  'Лютий',
  'Березень',
  'Квітень',
  'Травень',
  'Червень',
  'Липень',
  'Серпень',
  'Вересень',
  'Жовтень',
  'Листопад',
  'Грудень',
]

const mockEmployees = [
  { id: '1', name: 'Лінда Вітковська Ігорівна' },
  { id: '2', name: 'Іван Петренко' },
]

export default function MassPayoutModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [date, setDate] = useState<Date | null>(new Date())
  const [month, setMonth] = useState('Грудень')
  const [rows, setRows] = useState([
    { employee: '1', sum: '' },
    { employee: '2', sum: '' },
  ])

  const handleRowChange = (idx: number, field: 'employee' | 'sum', value: string) => {
    setRows((rows) => rows.map((row, i) => (i === idx ? { ...row, [field]: value } : row)))
  }

  const handleRemoveRow = (idx: number) => {
    setRows((rows) => rows.filter((_, i) => i !== idx))
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2, background: '#f4f7fe' }}>
        <SettingsIcon style={{ color: '#0029d9', marginRight: 8 }} />
        <Typography variant="h6" sx={{ fontWeight: 500, flex: 1 }}>
          Масова виплата
        </Typography>
      </Box>
      <DialogContent sx={{ pt: 1 }}>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={uk}>
            <UniversalDatePicker
              label="Дата виплати"
              value={date}
              onChange={setDate}
              textFieldProps={{ fullWidth: true }}
            />
          </LocalizationProvider>
          <FormControl fullWidth>
            <InputLabel>За місяць</InputLabel>
            <Select value={month} label="За місяць" onChange={(e) => setMonth(e.target.value)}>
              {monthsUk.map((m) => (
                <MenuItem value={m} key={m}>
                  {m}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {rows.map((row, idx) => (
            <Box key={idx} display="flex" gap={1} alignItems="center">
              <FormControl sx={{ minWidth: 220, flex: '0 0 320px' }}>
                <InputLabel>Співробітник</InputLabel>
                <Select
                  value={row.employee}
                  label="Співробітник"
                  onChange={(e) => handleRowChange(idx, 'employee', e.target.value)}>
                  {mockEmployees.map((emp) => (
                    <MenuItem value={emp.id} key={emp.id}>
                      {emp.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Сума"
                value={row.sum}
                onChange={(e) => handleRowChange(idx, 'sum', e.target.value.replace(/\D/g, ''))}
                sx={{ flex: 1 }}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9 ]*' }}
              />
              <IconButton onClick={() => handleRemoveRow(idx)} disabled={rows.length <= 1}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
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
