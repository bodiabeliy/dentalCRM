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
  Avatar,
  InputAdornment,
} from '@mui/material'
import { useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { uk } from 'date-fns/locale'
import { UniversalDatePicker } from '../../../../shared/components'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'

interface RefundModalProps {
  open: boolean
  onClose: () => void
}

export function RefundModal({ open, onClose }: RefundModalProps) {
  const [patient, setPatient] = useState('1')
  const [amount, setAmount] = useState('')
  const [paymentType, setPaymentType] = useState('cash')
  const [cashRegister, setCashRegister] = useState('cash')
  const [date, setDate] = useState<Date | null>(new Date(2024, 9, 29))
  const [comment, setComment] = useState('')

  const mockPatients = [
    { id: '1', name: 'Марія Іванівна', avatar: '👩' },
    { id: '2', name: 'Іван Петренко', avatar: '👨' },
    { id: '3', name: 'Олена Сидоренко', avatar: '👩' },
  ]

  const mockPaymentTypes = [
    { id: 'cash', name: 'Готівка' },
    { id: 'card', name: 'Карта' },
    { id: 'transfer', name: 'Переказ' },
  ]

  const mockCashRegisters = [
    { id: 'cash', name: 'Каса' },
    { id: 'terminal', name: 'Термінал' },
    { id: 'online', name: 'Онлайн' },
  ]

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, background: '#f4f7fe' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AccountBalanceWalletIcon style={{ color: '#0029d9', marginRight: 8 }} />
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
            Повернення коштів
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ color: '#d32f2f' }}>
          Баланс: 300.00
        </Typography>
      </Box>
      <DialogContent sx={{ pt: 1 }}>
        <Box display="flex" flexDirection="column" gap={3} mt={1}>
          <FormControl fullWidth>
            <InputLabel>Пацієнт</InputLabel>
            <Select value={patient} label="Пацієнт" onChange={(e) => setPatient(e.target.value)}>
              {mockPatients.map((patient) => (
                <MenuItem value={patient.id} key={patient.id}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar sx={{ width: 24, height: 24, fontSize: 12 }}>{patient.avatar}</Avatar>
                    <Typography>{patient.name}</Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="До сплати"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start">₴</InputAdornment>,
            }}
          />
          <FormControl fullWidth>
            <InputLabel>Вид платежу</InputLabel>
            <Select value={paymentType} label="Вид платежу" onChange={(e) => setPaymentType(e.target.value)}>
              {mockPaymentTypes.map((type) => (
                <MenuItem value={type.id} key={type.id}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Каса</InputLabel>
            <Select value={cashRegister} label="Каса" onChange={(e) => setCashRegister(e.target.value)}>
              {mockCashRegisters.map((register) => (
                <MenuItem value={register.id} key={register.id}>
                  {register.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={uk}>
            <UniversalDatePicker label="Дата" value={date} onChange={setDate} textFieldProps={{ fullWidth: true }} />
          </LocalizationProvider>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Коментар"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Коментар"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                backgroundColor: '#f8f9fa',
                '& fieldset': {
                  borderColor: '#e0e0e0',
                },
                '&:hover fieldset': {
                  borderColor: '#0029d9',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#0029d9',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#666',
                fontSize: '14px',
                '&.Mui-focused': {
                  color: '#0029d9',
                },
              },
            }}
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
