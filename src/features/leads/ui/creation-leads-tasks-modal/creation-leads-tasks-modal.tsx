import { useState } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
  InputAdornment,
} from '@mui/material'

import TaskIcon from '../../../../shared/assets/icons/tasks.svg?react'

import type { Lead } from '../../model/types'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { uk } from 'date-fns/locale'
import { UniversalDatePicker, UniversalTimePicker } from '../../../../shared/components'
import { Avatar } from '../../../../shared/components/ui/avatar'

interface CreationModalProps {
  open: boolean
  onClose: () => void
  onSave: (data: Lead) => void
}

export function CreateLeadTaskModal({ open = true, onClose }: CreationModalProps) {
  const [task, setTask] = useState({
    name: '',
    date: new Date(),
    time: new Date(),
    response: '',
    comment: '',
  })

  const handleSave = () => {
    onClose()
  }

  const handleFieldChange = (field: keyof Lead, value: string | boolean | Date) => {
    setTask((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <Box sx={{ display: 'flex', alignItems: 'center', p: 2, background: '#f4f7fe' }}>
          <TaskIcon style={{ color: '#0029d9', marginRight: 8 }} />
          <Typography variant="h6" sx={{ fontWeight: 500, flex: 1 }}>
            Створення Задачі
          </Typography>
        </Box>
        <DialogContent sx={{ pb: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControl>
            <TextField
              label="Пацієнт"
              value={task.name}
              onChange={(e) => setTask({ ...task, name: e.target.value })}
              fullWidth
              sx={{ background: '#fff', borderRadius: 2 }}
              InputProps={{
                startAdornment: (
                  <>
                    <InputAdornment position="start">
                      <Avatar width={40} height={40} borderRadius="12px" sx={{ fontSize: 28 }} />
                    </InputAdornment>
                  </>
                ),
              }}
            />
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={uk}>
            <UniversalDatePicker
              value={task.date}
              onChange={(newValue) => handleFieldChange('dateOfBirth', newValue as Date)}
              label="Дата"
            />
          </LocalizationProvider>
          <FormControlLabel control={<Switch />} label="Додати час" />
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={uk}>
            <UniversalTimePicker
              value={task.date}
              onChange={(newValue) => handleFieldChange('dateOfBirth', newValue as Date)}
              label="Час"
            />
          </LocalizationProvider>

          <FormControl fullWidth>
            <InputLabel>Відповідальний</InputLabel>
            <Select value={task.response} label="Статус" onChange={(e) => handleFieldChange('name', e.target.value)}>
              <MenuItem value="Без змін">Без змін</MenuItem>
              <MenuItem value="Активний">Активний</MenuItem>
              <MenuItem value="Неактивний">Неактивний</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <TextField
              fullWidth
              multiline
              label="Коментар"
              onChange={(e) => setTask({ ...task, name: e.target.value })}
              placeholder="текст задачi"
              sx={{ background: 'rgba(0, 0, 0, 0.06)', borderRadius: 2 }}
              InputLabelProps={{ shrink: true }}
            />
          </FormControl>
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
    </>
  )
}
