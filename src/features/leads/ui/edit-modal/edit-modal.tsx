import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  Button,
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  TextField,
  InputLabel,
} from '@mui/material'
import { UniversalDatePicker } from '../../../../shared/components/universal-date-picker'

import { useMask } from '@react-input/mask'

import LeadsIcon from '../../../../shared/assets/icons/leads.svg?react'
import PlusIcon from '../../../../shared/assets/icons/plus.svg?react'

import type { Lead, Phone } from '../../model/types'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { uk } from 'date-fns/locale'
import { LocalizationProvider } from '@mui/x-date-pickers'

interface EditModalProps {
  open: boolean
  onClose: () => void
  onSave: (data: Lead) => void
}

export function EditModal({ open, onClose, onSave }: EditModalProps) {
  const phoneRef = useMask({ mask: '+380(__)___-__-__', replacement: '_' }) // migrate to hooks in thr future

  const [formData, setFormData] = useState<Lead>({
    id: '',
    number: 0,
    name: '',
    avatar: '',
    status: '',
    phoneNumber: '',
    executedAmount: '',
    paid: '',
    plannedAmount: '',
    comment: '',
    registrationDate: '',
    nextVisit: '',
    nextReminder: '',
    lastName: '',
    firstName: '',
    patronymic: '',
    dateOfBirth: new Date(),
    phones: [{ number: '', note: '' }],
    gender: 'male',
    address: '',
    email: '',
    phoneNote: '',
    mainResponsible: '',
    notes: '',
    importantInfo: '',
    tags: [],
    isArchived: false,
    source: '',
    contactSource: '',
    curator: '',
    discount: '',
    refusalReason: '',
    branch: '',
  })

  const handleFieldChange = (field: keyof Lead, value: string | boolean | Date) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handlePhoneChange = (index: number, field: keyof Phone, value: string) => {
    setFormData((prev) => ({
      ...prev,
      phones: prev.phones.map((phone, i) => (i === index ? { ...phone, [field]: value } : phone)),
    }))
  }

  // Handler to add a new phone
  const handleAddPhone = () => {
    setFormData((prev) => ({
      ...prev,
      phones: [...prev.phones, { number: '', note: '' }],
    }))
  }

  const handleSave = () => {
    onSave(formData)
    onClose()
  }
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2, background: '#f4f7fe', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <LeadsIcon style={{ color: '#0029d9', marginRight: 8, height: 24, width: 24 }} />
          <Typography variant="h6" sx={{ fontWeight: 500, flex: 1 }}>
            Фото профілю
          </Typography>
        </Box>
      </Box>
      <DialogContent sx={{ px: 3, pb: 2 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl fullWidth>
            <TextField
              value={formData.firstName}
              onChange={(e) => handleFieldChange('firstName', e.target.value)}
              label="Ім'я"
              variant="outlined"
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              value={formData.lastName}
              onChange={(e) => handleFieldChange('lastName', e.target.value)}
              label="Призвіще"
              variant="outlined"
            />
          </FormControl>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <FormControl fullWidth>
            <TextField
              value={formData.patronymic}
              onChange={(e) => handleFieldChange('patronymic', e.target.value)}
              label="По батькові"
              variant="outlined"
            />
          </FormControl>
        </Box>

        {formData.phones.map((phone, index) => (
          <Box key={index} sx={{ display: 'flex', gap: 2, pt: 2, alignItems: 'center' }}>
            <FormControl fullWidth>
              <TextField
                inputRef={phoneRef}
                value={phone.number}
                onChange={(e) => handlePhoneChange(index, 'number', e.target.value)}
                label="Номер телефону"
                variant="outlined"
                InputProps={{
                  endAdornment:
                    index === formData.phones.length - 1 ? (
                      <Button
                        onClick={handleAddPhone}
                        sx={{
                          minWidth: 40,
                          height: 40,
                          border: 'none',
                          color: 'gray',
                          scale: 1.5,
                        }}
                        variant="outlined">
                        <PlusIcon />
                      </Button>
                    ) : null,
                }}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                value={phone.note}
                onChange={(e) => handlePhoneChange(index, 'note', e.target.value)}
                label="Примітка до номеру"
                variant="outlined"
              />
            </FormControl>
          </Box>
        ))}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <FormControl fullWidth>
            <TextField
              value={formData.email}
              onChange={(e) => handleFieldChange('email', e.target.value)}
              label="Email"
              variant="outlined"
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Стать</InputLabel>
            <Select value={formData.gender} label="Стать" onChange={(e) => handleFieldChange('gender', e.target.value)}>
              <MenuItem value="male">Чоловік</MenuItem>
              <MenuItem value="female">Жінка</MenuItem>
            </Select>
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={uk}>
            <UniversalDatePicker
              value={formData.dateOfBirth}
              onChange={(newValue) => handleFieldChange('dateOfBirth', newValue as Date)}
              label="Час"
            />
          </LocalizationProvider>

          <FormControl fullWidth>
            <InputLabel>Статус</InputLabel>
            <Select
              value={formData.status}
              label="Статус"
              onChange={(e) => handleFieldChange('status', e.target.value)}>
              <MenuItem value="Без змін">Без змін</MenuItem>
              <MenuItem value="Активний">Активний</MenuItem>
              <MenuItem value="Неактивний">Неактивний</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Головний відповідальний</InputLabel>
            <Select
              value={formData.mainResponsible}
              label="Головний відповідальний"
              onChange={(e) => handleFieldChange('mainResponsible', e.target.value)}>
              <MenuItem value="Іван Петренко">Іван Петренко</MenuItem>
              <MenuItem value="Марія Коваленко">Марія Коваленко</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <TextField
              value={formData.notes}
              onChange={(e) => handleFieldChange('notes', e.target.value)}
              label="Коментар"
              variant="filled"
            />
          </FormControl>
        </Box>
      </DialogContent>
      <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'flex-start', px: 3, pb: 3, pt: 1, mt: 2 }}>
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
