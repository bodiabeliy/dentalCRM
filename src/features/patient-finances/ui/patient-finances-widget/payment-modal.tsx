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
  Switch,
  Avatar,
  InputAdornment,
} from '@mui/material'
import { useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { uk } from 'date-fns/locale'
import { UniversalDatePicker } from '../../../../shared/components'
import ReceiptIcon from '@mui/icons-material/Receipt'

interface PaymentModalProps {
  open: boolean
  onClose: () => void
}

export function PaymentModal({ open, onClose }: PaymentModalProps) {
  const [patient, setPatient] = useState('1')
  const [amountUSD, setAmountUSD] = useState('')
  const [amountUAH, setAmountUAH] = useState('')
  const [paymentType, setPaymentType] = useState('cash')
  const [cashRegister, setCashRegister] = useState('cash')
  const [date, setDate] = useState<Date | null>(new Date(2024, 9, 29))
  const [comment, setComment] = useState('')
  const [cashbackEnabled, setCashbackEnabled] = useState(true)
  const [cashbackPercent, setCashbackPercent] = useState('')
  const [cashbackAmount, setCashbackAmount] = useState('')
  const [fiscalizeEnabled, setFiscalizeEnabled] = useState(true)
  const [terminal, setTerminal] = useState('terminals')

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

  const mockTerminals = [
    { id: 'terminals', name: 'Термінали' },
    { id: 'terminal1', name: 'Термінал 1' },
    { id: 'terminal2', name: 'Термінал 2' },
  ]

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, background: '#f4f7fe' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ReceiptIcon style={{ color: '#0029d9', marginRight: 8 }} />
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
            Платіж пацієнта
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ color: '#2e7d32' }}>
          Баланс: 300.00
        </Typography>
      </Box>
      <DialogContent sx={{ pt: 1 }}>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <FormControl fullWidth>
            <InputLabel>Пацієнт</InputLabel>
            <Select value={patient} label="Пацієнт" onChange={(e) => setPatient(e.target.value)}>
              {mockPatients?.map((patient) => (
                <MenuItem value={patient.id} key={patient.id}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar sx={{ width: 24, height: 24, fontSize: 12 }}>{patient.avatar}</Avatar>
                    <Typography>{patient.name}</Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              label="До сплати"
              value={amountUSD}
              onChange={(e) => setAmountUSD(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
            />
            <TextField
              fullWidth
              label="До сплати"
              value={amountUAH}
              onChange={(e) => setAmountUAH(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start">₴</InputAdornment>,
              }}
            />
          </Box>
          <FormControl fullWidth>
            <InputLabel>Вид платежу</InputLabel>
            <Select value={paymentType} label="Вид платежу" onChange={(e) => setPaymentType(e.target.value)}>
              {mockPaymentTypes?.map((type) => (
                <MenuItem value={type.id} key={type.id}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Каса</InputLabel>
            <Select value={cashRegister} label="Каса" onChange={(e) => setCashRegister(e.target.value)}>
              {mockCashRegisters?.map((register) => (
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
                backgroundColor: '#f0f0f0',
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
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Switch
                checked={cashbackEnabled}
                onChange={(e) => setCashbackEnabled(e.target.checked)}
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    color: '#0029d9',
                  },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: '#0029d9',
                  },
                }}
              />
              <Typography variant="body1">Кешбек</Typography>
            </Box>
            {cashbackEnabled && (
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  fullWidth
                  label="Кешбек"
                  value={cashbackPercent}
                  onChange={(e) => setCashbackPercent(e.target.value)}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  }}
                />
                <TextField
                  fullWidth
                  label="Кешбек"
                  value={cashbackAmount}
                  onChange={(e) => setCashbackAmount(e.target.value)}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">₴</InputAdornment>,
                  }}
                />
              </Box>
            )}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Switch
              checked={fiscalizeEnabled}
              onChange={(e) => setFiscalizeEnabled(e.target.checked)}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: '#0029d9',
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: '#0029d9',
                },
              }}
            />
            <Typography variant="body1">Фіскалізувати оплату</Typography>
          </Box>
          <FormControl fullWidth>
            <InputLabel>Термінали</InputLabel>
            <Select value={terminal} label="Термінали" onChange={(e) => setTerminal(e.target.value)}>
              {mockTerminals?.map((term) => (
                <MenuItem value={term.id} key={term.id}>
                  {term.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
