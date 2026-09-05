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
  InputAdornment,
  IconButton,
  InputLabel,
  FormLabel,
  Switch,
} from '@mui/material'
import { useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import RemoveIcon from '@mui/icons-material/Remove'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { uk } from 'date-fns/locale'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { UniversalDateRangePicker } from '../shared/components'

interface ExpensesModalProps {
  open: boolean
  onClose: () => void
  onSave: (data: {
    dateRange: [Date | null, Date | null]
    cashFlow: string
    paymentType: string
    cashRegister: string
    exchangeRate: string
    amount: string
    amountUah: string
    expenseArticle: string
    expenseRelation: string
    counterparty: string
    agreement: string
    relatedDocument: string
    comment: string
    attachDocument: boolean
  }) => void
}

const PAYMENT_TYPES = [
  { value: 'cash', label: 'Каса' },
  { value: 'bank', label: 'Банк' },
  { value: 'card', label: 'Карта фіз особи' },
]

const CASH_REGISTERS = [
  { value: 'eur', label: 'Назва каси EUR (€)' },
  { value: 'usd', label: 'Назва каси USD ($)' },
  { value: 'uah', label: 'Назва каси UAH (₴)' },
]

const CASH_FLOWS = [
  { value: 'operational', label: 'Операційний потік' },
  { value: 'investment', label: 'Інвестиційний потік' },
  { value: 'financial', label: 'Фінансовий потік' },
]

const EXPENSE_ARTICLES = [
  { value: 'patient', label: 'Від пацієнта' },
  { value: 'rent', label: 'Оренда' },
  { value: 'premises_rent', label: 'Оренда приміщення' },
  { value: 'utilities', label: 'Комунальні послуги' },
  { value: 'supplies', label: 'Постачання' },
  { value: 'other', label: 'Інше' },
]

const EXPENSE_RELATIONS = [
  { value: 'patient', label: 'Пацієнт' },
  { value: 'supplier', label: 'Постачальник' },
  { value: 'employee', label: 'Співробітник' },
]

const COUNTERPARTIES = [
  { value: 'arks', label: 'ТОВ АРКС/Договір партнерства' },
  { value: 'other1', label: 'Інша компанія 1' },
  { value: 'other2', label: 'Інша компанія 2' },
]

const AGREEMENTS = [
  { value: '1', label: 'Піпкін Віктор Петрович № 23457' },
  { value: '2', label: 'Іванов Іван Іванович № 12345' },
  { value: '3', label: 'Петров Петро Петрович № 67890' },
]

const RELATED_DOCUMENTS = [
  { value: '35873', label: '35873' },
  { value: '12345', label: '12345' },
  { value: '67890', label: '67890' },
]

export default function ExpensesModal({ open, onClose, onSave }: ExpensesModalProps) {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([new Date(), new Date()])
  const [cashFlow, setCashFlow] = useState('operational')
  const [paymentType, setPaymentType] = useState('cash')
  const [cashRegister, setCashRegister] = useState('eur')
  const [exchangeRate, setExchangeRate] = useState('46')
  const [amount, setAmount] = useState('1000')
  const [amountUah, setAmountUah] = useState('46000')
  const [expenseArticle, setExpenseArticle] = useState('patient')
  const [expenseRelation, setExpenseRelation] = useState('patient')
  const [counterparty, setCounterparty] = useState('arks')
  const [agreement, setAgreement] = useState('1')
  const [relatedDocument, setRelatedDocument] = useState('35873')
  const [comment, setComment] = useState('')
  const [attachDocument, setAttachDocument] = useState(false)

  const handleSave = () => {
    onSave({
      dateRange,
      cashFlow,
      paymentType,
      cashRegister,
      exchangeRate,
      amount,
      amountUah,
      expenseArticle,
      expenseRelation,
      counterparty,
      agreement,
      relatedDocument,
      comment,
      attachDocument,
    })
    onClose()
  }

  const handleSaveAndProcess = () => {
    onSave({
      dateRange,
      cashFlow,
      paymentType,
      cashRegister,
      exchangeRate,
      amount,
      amountUah,
      expenseArticle,
      expenseRelation,
      counterparty,
      agreement,
      relatedDocument,
      comment,
      attachDocument,
    })
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, background: '#f4f7fe' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <RemoveIcon style={{ color: '#ef6c00', marginRight: 8 }} />
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
            Витрата
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent sx={{ pt: 1, flex: 1 }}>
        <Box display="flex" flexDirection="column" gap={3} mt={1}>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={uk}>
            <UniversalDateRangePicker label="Витрата за період" value={dateRange} onChange={setDateRange} />
          </LocalizationProvider>
          <FormControl fullWidth>
            <InputLabel>Грошовий потік</InputLabel>
            <Select value={cashFlow} label="Грошовий потік" onChange={(e) => setCashFlow(e.target.value)}>
              {CASH_FLOWS.map((flow) => (
                <MenuItem value={flow.value} key={flow.value}>
                  {flow.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl component="fieldset">
            <FormLabel component="legend">Тип</FormLabel>
            <RadioGroup value={paymentType} onChange={(e) => setPaymentType(e.target.value)} row>
              {PAYMENT_TYPES.map((type) => (
                <FormControlLabel key={type.value} value={type.value} control={<Radio />} label={type.label} />
              ))}
            </RadioGroup>
          </FormControl>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Назва каси</InputLabel>
              <Select value={cashRegister} label="Назва каси" onChange={(e) => setCashRegister(e.target.value)}>
                {CASH_REGISTERS.map((register) => (
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
            <InputLabel>Стаття витрати</InputLabel>
            <Select value={expenseArticle} label="Стаття витрати" onChange={(e) => setExpenseArticle(e.target.value)}>
              {EXPENSE_ARTICLES.map((article) => (
                <MenuItem value={article.value} key={article.value}>
                  {article.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Відношення витрати</InputLabel>
            <Select
              value={expenseRelation}
              label="Відношення витрати"
              onChange={(e) => setExpenseRelation(e.target.value)}>
              {EXPENSE_RELATIONS.map((relation) => (
                <MenuItem value={relation.value} key={relation.value}>
                  {relation.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Контрагент</InputLabel>
            <Select value={counterparty} label="Контрагент" onChange={(e) => setCounterparty(e.target.value)}>
              {COUNTERPARTIES.map((cp) => (
                <MenuItem value={cp.value} key={cp.value}>
                  {cp.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Договір</InputLabel>
            <Select value={agreement} label="Договір" onChange={(e) => setAgreement(e.target.value)}>
              {AGREEMENTS.map((agreement) => (
                <MenuItem value={agreement.value} key={agreement.value}>
                  {agreement.label}
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
              {RELATED_DOCUMENTS.map((doc) => (
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
