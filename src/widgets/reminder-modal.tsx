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
  Chip,
  Autocomplete,
  InputLabel,
  Menu,
} from '@mui/material'
import { UniversalDatePicker } from '../shared/components'
import { useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { uk } from 'date-fns/locale'
import BellIcon from '../shared/assets/icons/bell.svg?react'
import { Avatar } from '../shared/components/ui/avatar'
import StatusIcon from '../shared/assets/icons/status.svg?react'
import ChevronIcon from '../shared/assets/icons/chevron.svg?react'

const mockEmployees = [
  { id: '1', name: 'Олена Сергіївна', category: 'Всі співробітники' },
  { id: '2', name: 'Ігор Володимирович', category: 'Всі співробітники' },
  { id: '3', name: 'Марія Петрівна', category: 'Адміністратори' },
  { id: '4', name: 'Omar Alexander', category: 'Адміністратори' },
]

const priorities = ['Стандартний пріоритет', 'Високий пріоритет', 'Низький пріоритет']

interface ReminderModalProps {
  open: boolean
  onClose: () => void
  onSave: (data: {
    patient: string
    visitDate: Date | null
    responsible: string[]
    priority: string
    comment: string
  }) => void
}

const REMINDER_STATUSES = [
  { value: 'planned', label: 'Заплановано', color: '#0029D9' },
  { value: 'completed', label: 'Виконано', color: '#22C55E' },
]

export default function ReminderModal({ open, onClose, onSave }: ReminderModalProps) {
  const [visitDate, setVisitDate] = useState<Date | null>(new Date(2024, 9, 29))
  const [responsible, setResponsible] = useState<string[]>(['1', '2'])
  const [priority, setPriority] = useState('Стандартний пріоритет')
  const [comment, setComment] = useState('')
  const [patient, setPatient] = useState('Марія Іванівна')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleStatusChange = (status: string) => {
    console.log(status)
  }

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleSave = () => {
    onSave({
      patient: 'Марія Іванівна',
      visitDate,
      responsible,
      priority,
      comment,
    })
    onClose()
  }

  const getSelectedEmployees = () => {
    return mockEmployees.filter((emp) => responsible.includes(emp.id))
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2, background: '#f4f7fe' }}>
        <BellIcon style={{ color: '#0029d9', marginRight: 8 }} />
        <Typography variant="h6" sx={{ fontWeight: 500, flex: 1 }}>
          Нагадування
        </Typography>
        <Button variant="contained" onClick={handleMenuOpen}>
          Заплановано
          <ChevronIcon
            style={{
              width: 18,
              height: 18,
              transform: anchorEl ? 'rotate(270deg)' : 'rotate(90deg)',
              transition: 'transform 0.2s',
            }}
          />
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          MenuListProps={{
            'aria-labelledby': 'status-button',
          }}
          PaperProps={{
            style: {
              width: 200,
              boxShadow: '0 4px 24px rgba(44,51,74,0.12)',
              borderRadius: '8px',
            },
          }}>
          {REMINDER_STATUSES.map((status) => (
            <MenuItem
              key={status.value}
              onClick={() => handleStatusChange(status.value)}
              sx={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 16px' }}>
              <StatusIcon style={{ color: status.color, width: 20, height: 20 }} />
              <Typography>{status.label}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <DialogContent sx={{ pt: 1 }}>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <FormControl fullWidth>
            <InputLabel>Пацієнт</InputLabel>
            <Select label="Пацієнт" value={patient} onChange={(e) => setPatient(e.target.value)}>
              {mockEmployees.map((p) => (
                <MenuItem value={p.name} key={p.id}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar width={40} height={40} borderRadius="8px" />
                    <Typography sx={{ flex: 1, color: '#2D3748' }}>{p.name}</Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box>
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
          </Box>
          <Box>
            <Autocomplete
              multiple
              fullWidth
              value={getSelectedEmployees()}
              onChange={(_, newValue) => {
                setResponsible(newValue.map((emp) => emp.id))
              }}
              options={mockEmployees}
              getOptionLabel={(option) => option.name}
              groupBy={(option) => option.category}
              renderGroup={(params) => (
                <li key={params.key}>
                  <Box sx={{ color: '#0029d9', fontWeight: 500, py: 1, px: 2, pl: 3 }}>{params.group}</Box>
                  <ul>{params.children}</ul>
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Відповідальний"
                  sx={{
                    '& .MuiInput-root': {
                      border: '1px solid #E2E8F0',
                    },
                  }}
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    {...getTagProps({ index })}
                    key={option.id}
                    label={option.name}
                    sx={{
                      borderRadius: '8px',
                      margin: '2px',
                      height: '24px',
                      fontSize: '13px',
                      fontWeight: 500,
                      bgcolor: '#ebebeb',
                      '& .MuiChip-deleteIcon': {
                        color: '#aeaeae',
                        fontSize: '18px',
                      },
                    }}
                  />
                ))
              }
            />
          </Box>
          <FormControl fullWidth>
            <InputLabel>Пріоритет</InputLabel>
            <Select label="Пріоритет" value={priority} onChange={(e) => setPriority(e.target.value)}>
              {priorities.map((p) => (
                <MenuItem value={p} key={p}>
                  {p}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box>
            <Typography sx={{ color: '#718096', fontSize: 14, mb: 0.5 }}>Коментар</Typography>
            <TextField
              label="Коментар"
              multiline
              fullWidth
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
