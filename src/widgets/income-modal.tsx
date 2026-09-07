import {
  Dialog,
  DialogContent,
  Button,
  Box,
  TextField,
  MenuItem,
  Select,
  FormControl,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Switch,
  InputAdornment,
  IconButton,
  InputLabel,
} from '@mui/material'
import { useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { uk } from 'date-fns/locale'
import { UniversalDatePicker, UniversalTimePicker } from '../shared/components'
import PlusIcon from '../shared/assets/icons/plus.svg?react'
import CloseIcon from '@mui/icons-material/Close'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

interface IncomeModalProps {
  open: boolean
  onClose: () => void
  onSave: (data: {
    time: Date | null
    date: Date | null
    paymentType: string
    cashRegister: string
    exchangeRate: string
    amount: string
    amountUah: string
    incomeArticle: string
    relatedDocument: string
    comment: string
    attachDocument: boolean
  }) => void
}

const PAYMENT_TYPES = [
  { value: 'cash', label: 'Каса' },
  { value: 'card', label: 'Карта фіз особи' },
  { value: 'terminal', label: 'Термінал' },
  { value: 'qr', label: 'QR оплата' },
]

const CASH_REGISTERS = [
  { value: 'eur', label: 'Назва каси EUR (€)' },
  { value: 'usd', label: 'Назва каси USD ($)' },
  { value: 'uah', label: 'Назва каси UAH (₴)' },
]

const INCOME_ARTICLES = [
  { value: 'patient', label: 'Від пацієнта' },
  { value: 'service', label: 'Від послуги' },
  { value: 'other', label: 'Інше' },
]

const RELATED_DOCUMENTS = [
  { value: '1', label: 'Піпкін Віктор Петрович № 23457' },
  { value: '2', label: 'Іванов Іван Іванович № 12345' },
  { value: '3', label: 'Петров Петро Петрович № 67890' },
]

export default function IncomeModal({ open, onClose, onSave }: IncomeModalProps) {
  const [time, setTime] = useState<Date | null>(new Date())
  const [date, setDate] = useState<Date | null>(new Date())
  const [paymentType, setPaymentType] = useState('cash')
  const [cashRegister, setCashRegister] = useState('eur')
  const [exchangeRate, setExchangeRate] = useState('46')
  const [amount, setAmount] = useState('1000')
  const [amountUah, setAmountUah] = useState('46000')
  const [incomeArticle, setIncomeArticle] = useState('patient')
  const [relatedDocument, setRelatedDocument] = useState('1')
  const [comment, setComment] = useState('')
  const [attachDocument, setAttachDocument] = useState(true)

  const handleSave = () => {
    onSave({
      time,
      date,
      paymentType,
      cashRegister,
      exchangeRate,
      amount,
      amountUah,
      incomeArticle,
      relatedDocument,
      comment,
      attachDocument,
    })
    onClose()
  }

  const handleSaveAndProcess = () => {
    onSave({
      time,
      date,
      paymentType,
      cashRegister,
      exchangeRate,
      amount,
      amountUah,
      incomeArticle,
      relatedDocument,
      comment,
      attachDocument,
    })
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, background: '#f4f7fe' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <PlusIcon style={{ color: '#2e7d32', marginRight: 8 }} />
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
            Надходження
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent sx={{ pt: 1 }}>
        <Box display="flex" flexDirection="column" gap={3} mt={1}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={uk}>
              <FormControl fullWidth>
                <UniversalTimePicker
                  label="Час"
                  value={time}
                  onChange={setTime}
                  textFieldProps={{
                    fullWidth: true,
                  }}
                />
              </FormControl>
              <FormControl fullWidth>
                <UniversalDatePicker
                  label="Дата"
                  value={date}
                  onChange={setDate}
                  textFieldProps={{
                    fullWidth: true,
                    InputProps: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <CalendarTodayIcon sx={{ color: '#9e9e9e' }} />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </FormControl>
            </LocalizationProvider>
          </Box>
          <FormControl component="fieldset">
            <FormLabel component="legend">Тип</FormLabel>
            <RadioGroup value={paymentType} onChange={(e) => setPaymentType(e.target.value)} row>
              {PAYMENT_TYPES?.map((type) => (
                <FormControlLabel key={type.value} value={type.value} control={<Radio />} label={type.label} />
              ))}
            </RadioGroup>
          </FormControl>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Назва каси</InputLabel>
              <Select value={cashRegister} label="Назва каси" onChange={(e) => setCashRegister(e.target.value)}>
                {CASH_REGISTERS?.map((register) => (
                  <MenuItem value={register.value} key={register.value}>
                    {register.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField fullWidth label="Курс" value={exchangeRate} onChange={(e) => setExchangeRate(e.target.value)} />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              label="Сума"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start">€</InputAdornment>,
              }}
            />
            <TextField
              fullWidth
              label=""
              value={amountUah}
              onChange={(e) => setAmountUah(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start">₴</InputAdornment>,
              }}
            />
          </Box>
          <FormControl fullWidth>
            <InputLabel>Стаття доходу</InputLabel>
            <Select value={incomeArticle} label="Стаття доходу" onChange={(e) => setIncomeArticle(e.target.value)}>
              {INCOME_ARTICLES?.map((article) => (
                <MenuItem value={article.value} key={article.value}>
                  {article.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Зв'язаний документ</InputLabel>
            <Select
              value={relatedDocument}
              label="Зв'язаний документ"
              onChange={(e) => setRelatedDocument(e.target.value)}>
              {RELATED_DOCUMENTS?.map((doc) => (
                <MenuItem value={doc.value} key={doc.value}>
                  {doc.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Коментар"
            multiline
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Введіть коментар..."
          />
          <Box>
            <FormControlLabel
              control={
                <Switch
                  checked={attachDocument}
                  onChange={(e) => setAttachDocument(e.target.checked)}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#0029d9',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#0029d9',
                    },
                  }}
                />
              }
              label="Прикріпити документ"
            />
            {attachDocument && (
              <Box
                sx={{
                  border: '2px dashed #e0e0e0',
                  borderRadius: 2,
                  p: 3,
                  mt: 1,
                  textAlign: 'center',
                  cursor: 'pointer',
                  '&:hover': {
                    borderColor: '#0029d9',
                  },
                }}>
                <CloudUploadIcon sx={{ fontSize: 48, color: '#9e9e9e', mb: 1 }} />
                <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                  Завантажте зі своїх файлів або перетягніть сюди
                </Typography>
                <Typography variant="caption" sx={{ color: '#999' }}>
                  PDF, DOCX, XLSX (макс. 10MB)
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </DialogContent>
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-start', px: 3, pb: 3, pt: 1 }}>
        <Button variant="contained" sx={{ bgcolor: '#7324d5', padding: '12px 22px' }} onClick={handleSave}>
          ЗБЕРЕГТИ
        </Button>
        <Button
          variant="contained"
          sx={{ bgcolor: '#0029d9', padding: '12px 22px', flex: 1 }}
          onClick={handleSaveAndProcess}>
          ЗБЕРЕГТИ І ПРОВЕСТИ
        </Button>
      </Box>
    </Dialog>
  )
}
