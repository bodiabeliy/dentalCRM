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
  Typography,
} from '@mui/material'
import { UniversalDatePicker } from '../../../../shared/components'
import { useState } from 'react'
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

export default function SinglePayoutModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [date, setDate] = useState<Date | null>(new Date())
  const [month, setMonth] = useState('Грудень')
  const [employee, setEmployee] = useState('1')
  const [sum, setSum] = useState('')
  const [comment, setComment] = useState('')

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2, background: '#f4f7fe' }}>
        <SettingsIcon style={{ color: '#0029d9', marginRight: 8 }} />
        <Typography variant="h6" sx={{ fontWeight: 500, flex: 1 }}>
          Виплата
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
          <FormControl fullWidth>
            <InputLabel>Співробітник</InputLabel>
            <Select value={employee} label="Співробітник" onChange={(e) => setEmployee(e.target.value)}>
              {mockEmployees.map((emp) => (
                <MenuItem value={emp.id} key={emp.id}>
                  {emp.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Сума"
            value={sum}
            onChange={(e) => setSum(e.target.value.replace(/\D/g, ''))}
            fullWidth
            inputProps={{ inputMode: 'numeric', pattern: '[0-9 ]*' }}
          />
          <TextField
            variant="filled"
            label="Коментар"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            fullWidth
            multiline
            minRows={1}
          />
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
