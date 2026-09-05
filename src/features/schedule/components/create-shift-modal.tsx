import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  Button,
  TextField,
  MenuItem,
  Typography,
  useMediaQuery,
  useTheme,
  Box,
  FormControl,
  Autocomplete,
  InputLabel,
  Select,
} from '@mui/material'
import { useSchedule } from '../contexts/schedule-context'
import type { Doctor } from '../types/schedule-types'
import CalendarIcon from '../../../shared/assets/icons/calendar.svg?react'
import { useTranslation } from 'react-i18next'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { uk } from 'date-fns/locale'
import { UniversalDatePicker, UniversalTimePicker } from '../../../shared/components'
import { format } from 'date-fns'
import { Avatar } from '../../../shared/components/ui/avatar'

interface CreateShiftModalProps {
  open: boolean
  onClose: () => void
  onSave: (data: { doctorId: number; cabinetId: number; date: string; start: string; end: string }) => void
  initialCabinetId?: number
  initialDate?: string
}

const CreateShiftModal: React.FC<CreateShiftModalProps> = ({
  open,
  onClose,
  onSave,
  initialCabinetId,
  initialDate,
}) => {
  const { t } = useTranslation()
  const { doctors, scheduleData } = useSchedule()
  const [cabinetId, setCabinetId] = useState<number>(initialCabinetId || (scheduleData?.cabinets[0]?.id ?? 0))
  const [date, setDate] = useState<Date | null>(initialDate ? new Date(initialDate) : null)
  const [start, setStart] = useState<Date | null>(null)
  const [end, setEnd] = useState<Date | null>(null)
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleSave = () => {
    if (selectedDoctor?.id && cabinetId && date && start && end) {
      onSave({
        doctorId: selectedDoctor.id,
        cabinetId,
        date: format(date, 'yyyy-MM-dd'),
        start: format(start, 'HH:mm'),
        end: format(end, 'HH:mm'),
      })
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          width: '100%',
          maxWidth: isMobile ? '100%' : 700,
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
          justifyContent: 'space-between',
          alignItems: 'center',
          p: isMobile ? '12px 16px' : '16px',
          gap: isMobile ? 2 : 0,
        }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CalendarIcon style={{ width: isMobile ? 20 : 24, height: isMobile ? 20 : 24, color: '#0029d9' }} />
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: isMobile ? 18 : 20,
              lineHeight: '160%',
              letterSpacing: '0.01em',
              color: 'rgba(21, 22, 24, 0.87)',
            }}>
            {t('shift-modal.title')}
          </Typography>
        </Box>
      </Box>
      <DialogContent>
        <FormControl fullWidth sx={{ flex: 1, mt: 2 }}>
          <Autocomplete
            value={selectedDoctor}
            onChange={(_, newValue) => setSelectedDoctor(newValue)}
            options={doctors}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t('shift-modal.doctor')}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: selectedDoctor ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', mr: 1 }}>
                      <img
                        src={selectedDoctor.avatar}
                        alt={selectedDoctor.name}
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: 2,
                          objectFit: 'cover',
                        }}
                      />
                    </Box>
                  ) : null,
                }}
                sx={{
                  '& .MuiInputBase-root': {
                    minHeight: isMobile ? 48 : 'auto',
                  },
                }}
              />
            )}
            renderOption={(props, option) => (
              <Box component="li" {...props} sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Avatar src={option.avatar} alt={option.name} width={24} height={24} borderRadius="2px" />
                <Box>
                  <Typography sx={{ fontSize: isMobile ? 13 : 14, fontWeight: 500 }}>{option.name}</Typography>
                </Box>
              </Box>
            )}
            sx={{
              '& .MuiAutocomplete-input': {
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              },
            }}
          />
        </FormControl>
        <FormControl fullWidth sx={{ flex: 1, mt: 2 }}>
          <InputLabel>{t('shift-modal.cabinet')}</InputLabel>
          <Select
            label={t('shift-modal.cabinet')}
            value={cabinetId}
            onChange={(e) => setCabinetId(Number(e.target.value))}
            fullWidth>
            {scheduleData?.cabinets.map((cab) => (
              <MenuItem key={cab.id} value={cab.id}>
                {cab.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={uk}>
          <Box sx={{ mb: 1 }}>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <UniversalDatePicker
                label={t('shift-modal.date')}
                value={date}
                onChange={(newValue) => setDate(newValue)}
                sx={{
                  width: '100%',
                  '& .MuiInputBase-root': {
                    minHeight: isMobile ? 48 : 'auto',
                  },
                }}
              />
            </FormControl>
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: isMobile ? 1 : 2,
              mb: isMobile ? 1.5 : 2,
              alignItems: 'center',
              flexDirection: isMobile ? 'column' : 'row',
            }}>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <UniversalTimePicker
                value={start}
                onChange={(newValue) => {
                  setStart(newValue)
                }}
                label={t('shift-modal.start-time')}
                sx={{
                  '& .MuiInputBase-root': {
                    minHeight: isMobile ? 48 : 'auto',
                  },
                }}
                textFieldProps={{
                  sx: {
                    '& .MuiInputBase-root': {
                      minHeight: isMobile ? 48 : 'auto',
                    },
                  },
                }}
              />
            </FormControl>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: isMobile ? 14 : 16,
                lineHeight: '150%',
                letterSpacing: '0.01em',
                color: 'rgba(21, 22, 24, 0.87)',
                display: isMobile ? 'none' : 'block',
              }}>
              —
            </Typography>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <UniversalTimePicker
                value={end}
                onChange={(newValue) => setEnd(newValue)}
                label={t('shift-modal.end-time')}
                sx={{
                  '& .MuiInputBase-root': {
                    minHeight: isMobile ? 48 : 'auto',
                  },
                }}
                textFieldProps={{
                  sx: {
                    '& .MuiInputBase-root': {
                      minHeight: isMobile ? 48 : 'auto',
                    },
                  },
                }}
              />
            </FormControl>
          </Box>
        </LocalizationProvider>

        <Box sx={{ display: 'flex', gap: '8px', mt: 2 }}>
          <Button
            onClick={onClose}
            sx={{
              fontWeight: 500,
              fontSize: isMobile ? 14 : 15,
              lineHeight: '173%',
              letterSpacing: '0.03em',
              textTransform: 'uppercase',
              color: '#0029d9',
              border: '1px solid rgba(0, 41, 217, 0.5)',
              borderRadius: '8px',
              padding: isMobile ? '14px 22px' : '12px 22px',
              minHeight: isMobile ? 56 : 'auto',
              flex: 1,
            }}>
            {t('shift-modal.cancel')}
          </Button>
          <Button
            sx={{
              flex: isMobile ? 1 : 'auto',
              borderRadius: '8px',
              textTransform: 'uppercase',
              bgcolor: '#0029D9',
              minHeight: isMobile ? 56 : 'auto',
              fontSize: isMobile ? 14 : 16,
              '&:hover': {
                bgcolor: '#0020A8',
              },
              '&:disabled': {
                bgcolor: '#ccc',
              },
            }}
            onClick={handleSave}
            variant="contained">
            {t('shift-modal.save')}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default CreateShiftModal
