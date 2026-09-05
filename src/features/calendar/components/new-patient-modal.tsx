import React, { useState } from 'react'
import {
  Dialog,
  Box,
  Typography,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
  MenuItem,
  InputLabel,
  FormControl,
  FormLabel,
  Select as MuiSelect,
  FormHelperText,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { uk } from 'date-fns/locale'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import PlusIcon from '../../../shared/assets/icons/plus.svg?react'
import type { NewPatient as ApiNewPatient } from '../api/patients'
import { isValidPhoneNumber } from 'react-phone-number-input'
import '../../../shared/styles/phone-input.css'
import { UniversalDatePicker } from '../../../shared/components'
import MuiPhoneInput from '../../../shared/components/ui/mui-phone-input/mui-phone-input'

interface NewPatientModalProps {
  open: boolean
  onClose: () => void
  onSave: (patient: ApiNewPatient) => void
}

const referralSources = ['Google', 'Facebook', 'Instagram', 'Знайомі', 'Інше']
const sexOptions = ['Чоловік', 'Жінка']

export const NewPatientModal: React.FC<NewPatientModalProps> = ({ open, onClose, onSave }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [lastName, setLastName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [patronymic, setPatronymic] = useState('')
  const [phone, setPhone] = useState('')
  const [birthDate, setBirthDate] = useState<Date | null>(null)
  const [referral, setReferral] = useState('')
  const [errors, setErrors] = useState<Partial<Record<keyof ApiNewPatient, string>>>({})
  const [saving, setSaving] = useState(false)
  const [sex, setSex] = useState('')

  const validate = () => {
    const errs: Partial<Record<keyof ApiNewPatient, string>> = {}
    if (!lastName) errs.lastName = 'Введіть прізвище'
    if (!firstName) errs.firstName = 'Введіть імʼя'
    if (!phone || !isValidPhoneNumber(phone)) errs.phone = 'Введіть коректний номер телефону'
    if (!birthDate) errs.birthDate = 'Виберіть дату народження'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handlePhoneChange = (value: string | undefined) => {
    setPhone(value || '')
  }

  const handleClear = () => {
    setLastName('')
    setFirstName('')
    setPatronymic('')
    setPhone('')
    setBirthDate(null)
    setReferral('')
    setSex('')
  }

  const handleSave = async () => {
    if (!validate()) return
    setSaving(true)
    await onSave({
      lastName,
      firstName,
      patronymic,
      phone,
      birthDate: birthDate ? birthDate.toISOString().slice(0, 10) : '',
      referral,
      sex,
    })

    setSaving(false)
    handleClear()
    onClose()
  }

  const handleCancel = () => {
    handleClear()
    setErrors({})
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          width: '100%',
          maxWidth: isMobile ? '100%' : 500,
          borderRadius: isMobile ? 0 : 2,
          m: 2,
          p: 0,
          background: '#fff',
          boxShadow: '0 4px 24px rgba(44,51,74,0.12)',
          display: 'flex',
          overflow: 'visible',
          height: isMobile ? '100%' : 'auto',
        },
      }}>
      <Box
        sx={{
          background: '#eff3ff',
          display: 'flex',
          alignItems: 'center',
          p: isMobile ? '12px 16px' : '16px',
          gap: 2,
        }}>
        <PlusIcon style={{ width: 20, height: 20, color: '#0029d9' }} />
        <Typography sx={{ fontWeight: 500, fontSize: isMobile ? 18 : 20, color: 'rgba(21, 22, 24, 0.87)' }}>
          Новий пацієнт
        </Typography>
      </Box>
      <Box
        sx={{
          p: isMobile ? 2 : 3,
          maxHeight: isMobile ? 'none' : 'calc(100vh - 120px)',
          overflowY: isMobile ? 'visible' : 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}>
        <TextField
          label="Прізвище"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
          margin="normal"
          error={!!errors.lastName}
          helperText={errors.lastName}
        />
        <TextField
          label="Імʼя"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
          margin="normal"
          error={!!errors.firstName}
          helperText={errors.firstName}
        />
        <TextField
          label="По батькові"
          value={patronymic}
          onChange={(e) => setPatronymic(e.target.value)}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal" error={!!errors.sex} sx={{ mt: 2, mb: 1, pl: 1 }}>
          <FormLabel sx={{ fontSize: 16, color: 'rgba(0,0,0,0.6)' }}>Стать</FormLabel>
          <RadioGroup value={sex} onChange={(e) => setSex(e.target.value)} row>
            {sexOptions.map((option) => (
              <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
            ))}
          </RadioGroup>
          {errors.sex && <FormHelperText>{errors.sex}</FormHelperText>}
        </FormControl>
        <FormControl fullWidth margin="normal" error={!!errors.phone} sx={{ mt: 2, mb: 1 }}>
          <FormLabel htmlFor="phone-input" sx={{ mb: 1, fontSize: 16, color: 'rgba(0,0,0,0.6)' }}>
            Телефон
          </FormLabel>
          <PhoneInput
            id="phone-input"
            placeholder="Введіть номер телефону"
            value={phone}
            onChange={handlePhoneChange}
            defaultCountry="UA"
            className={errors.phone ? 'PhoneInput error' : 'PhoneInput'}
            maxLength={20}
            countrySelectComponent={MuiPhoneInput}
          />
          <FormHelperText>{errors.phone}</FormHelperText>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={uk}>
          <UniversalDatePicker
            textFieldProps={{
              fullWidth: true,
              error: !!errors.birthDate,
              helperText: errors.birthDate,
              sx: {
                width: '100%',
                mt: 2,
              },
            }}
            label="Дата народження"
            value={birthDate}
            onChange={setBirthDate}
          />
        </LocalizationProvider>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Звідки дізнався</InputLabel>
          <MuiSelect value={referral} label="Звідки дізнався" onChange={(e) => setReferral(e.target.value)}>
            {referralSources.map((src) => (
              <MenuItem value={src} key={src}>
                {src}
              </MenuItem>
            ))}
          </MuiSelect>
        </FormControl>
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: '10px',
          mt: 4,
          height: 50,
          position: isMobile ? 'static' : 'sticky',
          bottom: 0,
          background: '#fff',
          zIndex: 1,
          m: 2,
        }}>
        <Button
          variant="outlined"
          onClick={handleCancel}
          sx={{
            borderRadius: '8px',
            textTransform: 'uppercase',
            color: '#0029d9',
            borderColor: '#0029d9',
            minWidth: 120,
            maxWidth: 140,
            boxShadow: 'none',
            background: '#fff',
            flex: '0 0 180px',
          }}
          disabled={saving}>
          Скасувати
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          sx={{
            borderRadius: '8px',
            bgcolor: '#0029D9',
            color: '#fff',
            textTransform: 'uppercase',
            boxShadow: '0px 4px 16px rgba(0,41,217,0.10)',
            '&:hover': { bgcolor: '#0020A8' },
            '&:disabled': { bgcolor: '#ccc' },
            flex: 1,
            minWidth: 280,
          }}
          disabled={saving}>
          Зберегти
        </Button>
      </Box>
    </Dialog>
  )
}
