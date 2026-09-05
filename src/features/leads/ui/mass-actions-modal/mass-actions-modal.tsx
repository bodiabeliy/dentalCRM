import {
  Dialog,
  DialogContent,
  Button,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Switch,
  FormControlLabel,
} from '@mui/material'
import { useState } from 'react'
import PencilIcon from '../../../../shared/assets/icons/pencil.svg?react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { uk } from 'date-fns/locale'
import { UniversalDatePicker } from '../../../../shared/components/universal-date-picker'
import { UniversalTimePicker } from '../../../../shared/components/universal-time-picker'

interface MassActionsModalProps {
  open: boolean
  onClose: () => void
  onSave: (data: MassActionsData) => void
  selectedCount: number
}

export interface MassActionsData {
  archived: string
  mainResponsible: string
  counterpartyType: string
  status: string
  source: string
  branch: string
  lastCall: string
  refusalReason: string
  createTask: boolean
  taskName: string
  taskRefusalReason: string
  taskStatus: string
  taskTime: Date
  taskDate: Date
  taskComment: string
}

export function MassActionsModal({ open, onClose, onSave, selectedCount }: MassActionsModalProps) {
  const [formData, setFormData] = useState<MassActionsData>({
    archived: 'Без змін',
    mainResponsible: 'Без змін',
    counterpartyType: 'Без змін',
    status: 'Без змін',
    source: 'Без змін',
    branch: 'Без змін',
    lastCall: 'Без змін',
    refusalReason: 'Без змін',
    createTask: true,
    taskName: '',
    taskRefusalReason: '',
    taskStatus: '',
    taskTime: new Date(),
    taskDate: new Date(),
    taskComment: '',
  })

  const handleFieldChange = (field: keyof MassActionsData, value: string | boolean | Date) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
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
          <PencilIcon style={{ color: '#0029d9', marginRight: 8, height: 24, width: 24 }} />
          <Typography variant="h6" sx={{ fontWeight: 500, flex: 1 }}>
            Масові дії
          </Typography>
        </Box>
        {selectedCount > 0 && <Typography variant="body1">Вибрано: {selectedCount}</Typography>}
      </Box>
      <DialogContent sx={{ px: 3, pb: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Архівовано</InputLabel>
            <Select
              value={formData.archived}
              label="Архівовано"
              onChange={(e) => handleFieldChange('archived', e.target.value)}>
              <MenuItem value="Без змін">Без змін</MenuItem>
              <MenuItem value="Так">Так</MenuItem>
              <MenuItem value="Ні">Ні</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Головний відповідальний</InputLabel>
            <Select
              value={formData.mainResponsible}
              label="Головний відповідальний"
              onChange={(e) => handleFieldChange('mainResponsible', e.target.value)}>
              <MenuItem value="Без змін">Без змін</MenuItem>
              <MenuItem value="Іван Петренко">Іван Петренко</MenuItem>
              <MenuItem value="Марія Коваленко">Марія Коваленко</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Тип контрагента</InputLabel>
            <Select
              value={formData.counterpartyType}
              label="Тип контрагента"
              onChange={(e) => handleFieldChange('counterpartyType', e.target.value)}>
              <MenuItem value="Без змін">Без змін</MenuItem>
              <MenuItem value="Фізична особа">Фізична особа</MenuItem>
              <MenuItem value="Юридична особа">Юридична особа</MenuItem>
            </Select>
          </FormControl>
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
            <InputLabel>Джерело</InputLabel>
            <Select
              value={formData.source}
              label="Джерело"
              onChange={(e) => handleFieldChange('source', e.target.value)}>
              <MenuItem value="Без змін">Без змін</MenuItem>
              <MenuItem value="Реклама">Реклама</MenuItem>
              <MenuItem value="Рекомендація">Рекомендація</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Філія</InputLabel>
            <Select value={formData.branch} label="Філія" onChange={(e) => handleFieldChange('branch', e.target.value)}>
              <MenuItem value="Без змін">Без змін</MenuItem>
              <MenuItem value="Головна">Головна</MenuItem>
              <MenuItem value="Філія 1">Філія 1</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Останній дзвінок</InputLabel>
            <Select
              value={formData.lastCall}
              label="Останній дзвінок"
              onChange={(e) => handleFieldChange('lastCall', e.target.value)}>
              <MenuItem value="Без змін">Без змін</MenuItem>
              <MenuItem value="Сьогодні">Сьогодні</MenuItem>
              <MenuItem value="Вчора">Вчора</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Причини відмови</InputLabel>
            <Select
              value={formData.refusalReason}
              label="Причини відмови"
              onChange={(e) => handleFieldChange('refusalReason', e.target.value)}>
              <MenuItem value="Без змін">Без змін</MenuItem>
              <MenuItem value="Висока ціна">Висока ціна</MenuItem>
              <MenuItem value="Не підходить час">Не підходить час</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ mt: 3, mb: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={formData.createTask}
                onChange={(e) => handleFieldChange('createTask', e.target.checked)}
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
            label="Створити завдання"
            sx={{ color: '#1a1a1a', fontWeight: 500 }}
          />
        </Box>
        {formData.createTask && (
          <Box sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                fullWidth
                label="Назва"
                value={formData.taskName}
                onChange={(e) => handleFieldChange('taskName', e.target.value)}
              />
              <FormControl fullWidth>
                <InputLabel>Причини відмови</InputLabel>
                <Select
                  value={formData.taskRefusalReason}
                  label="Причини відмови"
                  onChange={(e) => handleFieldChange('taskRefusalReason', e.target.value)}>
                  <MenuItem value="">Виберіть причину</MenuItem>
                  <MenuItem value="Висока ціна">Висока ціна</MenuItem>
                  <MenuItem value="Не підходить час">Не підходить час</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Статус</InputLabel>
                <Select
                  value={formData.taskStatus}
                  label="Статус"
                  onChange={(e) => handleFieldChange('taskStatus', e.target.value)}>
                  <MenuItem value="">Виберіть статус</MenuItem>
                  <MenuItem value="Нове">Нове</MenuItem>
                  <MenuItem value="В роботі">В роботі</MenuItem>
                </Select>
              </FormControl>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={uk}>
                  <UniversalTimePicker
                    value={formData.taskTime}
                    onChange={(newValue) => handleFieldChange('taskTime', newValue as Date)}
                    label="Час"
                  />
                  <UniversalDatePicker
                    label="Дата"
                    value={formData.taskDate}
                    onChange={(newValue) => handleFieldChange('taskDate', newValue as Date)}
                    sx={{
                      width: '100%',
                      '& .MuiInputBase-root': {},
                    }}
                  />
                </LocalizationProvider>
              </Box>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Коментар"
                value={formData.taskComment}
                onChange={(e) => handleFieldChange('taskComment', e.target.value)}
                sx={{
                  background: '#f0f0f0',
                }}
              />
            </Box>
          </Box>
        )}
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
