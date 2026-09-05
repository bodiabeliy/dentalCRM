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
} from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import RefreshIcon from '../shared/assets/icons/refresh.svg?react'
import CloseIcon from '@mui/icons-material/Close'

interface TransferModalProps {
  open: boolean
  onClose: () => void
  onSave: (data: {
    fromType: string
    fromCashRegister: string
    toType: string
    toCashRegister: string
    exchangeRate: string
    amount: string
    amountUah: string
    comment: string
  }) => void
}

const FROM_TYPES = [
  { value: 'cash', labelKey: 'types.cash' },
  { value: 'card', labelKey: 'types.card' },
  { value: 'terminal', labelKey: 'types.terminal' },
  { value: 'qr', labelKey: 'types.qr' },
]

const TO_TYPES = [
  { value: 'cash', labelKey: 'types.cash' },
  { value: 'card', labelKey: 'types.card' },
  { value: 'bank', labelKey: 'types.bank' },
]

const CASH_REGISTERS = [
  { value: 'eur', labelKey: 'registerName.eur' },
  { value: 'usd', labelKey: 'registerName.usd' },
  { value: 'uah', labelKey: 'registerName.uah' },
]

export default function TransferModal({ open, onClose, onSave }: TransferModalProps) {
  const { t } = useTranslation(['finance'])
  const [fromType, setFromType] = useState('cash')
  const [fromCashRegister, setFromCashRegister] = useState('eur')
  const [toType, setToType] = useState('cash')
  const [toCashRegister, setToCashRegister] = useState('eur')
  const [exchangeRate, setExchangeRate] = useState('46')
  const [amount, setAmount] = useState('1000')
  const [amountUah, setAmountUah] = useState('46000')
  const [comment, setComment] = useState('')

  const handleSave = () => {
    onSave({
      fromType,
      fromCashRegister,
      toType,
      toCashRegister,
      exchangeRate,
      amount,
      amountUah,
      comment,
    })
    onClose()
  }

  const handleSaveAndProcess = () => {
    onSave({
      fromType,
      fromCashRegister,
      toType,
      toCashRegister,
      exchangeRate,
      amount,
      amountUah,
      comment,
    })
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, background: '#f4f7fe' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <RefreshIcon style={{ color: '#0029d9', marginRight: 8 }} />
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
            {t('transfer.title', { ns: 'finance' })}
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent sx={{ pt: 1 }}>
        <Box display="flex" flexDirection="column" gap={3} mt={1}>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
              {t('transfer.from', { ns: 'finance' })}
            </Typography>
            <FormControl component="fieldset" sx={{ mb: 2 }}>
              <RadioGroup value={fromType} onChange={(e) => setFromType(e.target.value)} row>
                {FROM_TYPES.map((type) => (
                  <FormControlLabel
                    key={type.value}
                    value={type.value}
                    control={<Radio />}
                    label={t(`transfer.${type.labelKey}`, { ns: 'finance' })}
                  />
                ))}
              </RadioGroup>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>{t('transfer.fromRegister', { ns: 'finance' })}</InputLabel>
              <Select
                value={fromCashRegister}
                label={t('transfer.fromRegister', { ns: 'finance' })}
                onChange={(e) => setFromCashRegister(e.target.value)}>
                {CASH_REGISTERS.map((register) => (
                  <MenuItem value={register.value} key={register.value}>
                    {t(`transfer.${register.labelKey}`, { ns: 'finance' })}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
              {t('transfer.to', { ns: 'finance' })}
            </Typography>
            <FormControl component="fieldset" sx={{ mb: 2 }}>
              <RadioGroup value={toType} onChange={(e) => setToType(e.target.value)} row>
                {TO_TYPES.map((type) => (
                  <FormControlLabel
                    key={type.value}
                    value={type.value}
                    control={<Radio />}
                    label={t(`transfer.${type.labelKey}`, { ns: 'finance' })}
                  />
                ))}
              </RadioGroup>
            </FormControl>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel>{t('transfer.toRegister', { ns: 'finance' })}</InputLabel>
                <Select
                  value={toCashRegister}
                  label={t('transfer.toRegister', { ns: 'finance' })}
                  onChange={(e) => setToCashRegister(e.target.value)}>
                  {CASH_REGISTERS.map((register) => (
                    <MenuItem value={register.value} key={register.value}>
                      {t(`transfer.${register.labelKey}`, { ns: 'finance' })}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label={t('transfer.exchangeRate', { ns: 'finance' })}
                value={exchangeRate}
                onChange={(e) => setExchangeRate(e.target.value)}
              />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              label={t('transfer.amount', { ns: 'finance' })}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">{t('transfer.eur', { ns: 'finance' })}</InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label={t('transfer.amount', { ns: 'finance' })}
              value={amountUah}
              onChange={(e) => setAmountUah(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">{t('transfer.uah', { ns: 'finance' })}</InputAdornment>
                ),
              }}
            />
          </Box>
          <TextField
            fullWidth
            label={t('transfer.comment', { ns: 'finance' })}
            multiline
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={t('transfer.commentPlaceholder', { ns: 'finance' })}
          />
        </Box>
      </DialogContent>
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-start', px: 3, pb: 3, pt: 1 }}>
        <Button variant="contained" sx={{ bgcolor: '#7324d5', padding: '12px 22px' }} onClick={handleSave}>
          {t('transfer.save', { ns: 'finance' })}
        </Button>
        <Button
          variant="contained"
          sx={{ bgcolor: '#0029d9', padding: '12px 22px', flex: 1 }}
          onClick={handleSaveAndProcess}>
          {t('transfer.saveAndProcess', { ns: 'finance' })}
        </Button>
      </Box>
    </Dialog>
  )
}
