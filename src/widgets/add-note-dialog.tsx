import {
  Dialog,
  DialogContent,
  Button,
  Box,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import { useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { uk } from 'date-fns/locale'
import { UniversalDatePicker } from '../shared/components'
import { mockPatients } from '../features/patients/model/constants'
import NoteIcon from '../shared/assets/icons/note.svg?react'
import { Avatar } from '../shared/components/ui/avatar'

interface AddNoteDialogProps {
  open: boolean
  onClose: () => void
  onSave: (data: { patient: string; visitDate: Date; event: string; comment: string }) => void
  visit?: {
    id: string
    date: Date
    dayOfWeek: string
    time: string
    patientType: string
    doctor: { name: string; avatar: string }
  }
}

export default function AddNoteDialog({ open, onClose, onSave, visit }: AddNoteDialogProps) {
  const [patient, setPatient] = useState(visit?.doctor.name || 'Марія Іванівна')
  const [visitDate, setVisitDate] = useState(visit?.date || null)
  const [event, setEvent] = useState(
    visit
      ? `Візит ${visit.date.toLocaleDateString('uk-UA')} ${visit.dayOfWeek} ${visit.time}`
      : 'Візит 25.09.2024 Ср 09:00-10:00'
  )
  const [comment, setComment] = useState('')

  const handleSave = () => {
    onSave({
      patient,
      visitDate: visitDate || new Date(),
      event,
      comment,
    })
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '8px',
          overflow: 'hidden',
        },
      }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 2,
          background: '#f4f7fe',
          borderBottom: '1px solid #e0e0e0',
        }}>
        <NoteIcon style={{ color: '#0029d9', marginRight: 8, width: 20, height: 20 }} />
        <Typography
          variant="h6"
          sx={{
            fontWeight: 500,
            flex: 1,
            color: '#333',
            fontSize: '16px',
          }}>
          Примітка
        </Typography>
      </Box>
      <DialogContent sx={{ p: 3 }}>
        <Box display="flex" flexDirection="column" gap={3}>
          <FormControl fullWidth>
            <InputLabel>Пацієнт</InputLabel>
            <Select size="small" label="Пацієнт" value={patient} onChange={(e) => setPatient(e.target.value)}>
              {mockPatients.map((p) => (
                <MenuItem value={p.name} key={p.id}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar width={40} height={40} borderRadius="8px" />
                    <Typography sx={{ flex: 1, color: '#2D3748' }}>{p.name}</Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={uk}>
              <UniversalDatePicker
                label="Дата візиту"
                value={visitDate}
                onChange={setVisitDate}
                textFieldProps={{
                  fullWidth: true,
                }}
              />
            </LocalizationProvider>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Подія</InputLabel>
            <Select value={event} onChange={(e) => setEvent(e.target.value)} label="Подія">
              <MenuItem value="Візит 25.09.2024 Ср 09:00-10:00">Візит 25.09.2024 Ср 09:00-10:00</MenuItem>
              <MenuItem value="Візит 26.09.2024 Чт 10:00-11:00">Візит 26.09.2024 Чт 10:00-11:00</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Коментар"
            multiline
            rows={1}
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
        <Button variant="contained" sx={{ bgcolor: '#0029d9', padding: '12px 22px', flex: 1 }} onClick={handleSave}>
          ЗБЕРЕГТИ
        </Button>
      </Box>
    </Dialog>
  )
}
