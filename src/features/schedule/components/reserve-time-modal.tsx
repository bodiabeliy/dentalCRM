import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  Button,
  MenuItem,
  Box,
  useMediaQuery,
  useTheme,
  Typography,
  FormControl,
  InputLabel,
  Select,
  TextField,
} from '@mui/material'
import CalendarIcon from '../../../shared/assets/icons/calendar.svg?react'
import { useTranslation } from 'react-i18next'
import { useSchedule } from '../contexts/schedule-context'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { uk } from 'date-fns/locale'
import { UniversalDatePicker } from '../../../shared/components/universal-date-picker'
import { UniversalTimePicker } from '../../../shared/components/universal-time-picker'
import { getHourLabel } from '../../../shared/utils/dateUtils'
import { addMinutes } from 'date-fns'

interface ReserveTimeModalProps {
  open: boolean
  onClose: () => void
  onSave: (data: { type: string; start: Date; end: Date; comment?: string; date: Date }) => void
}

const times = [5, 10, 15, 20, 25, 30, 35, 40, 45, 60, 90, 120]

const RESERVE_TYPES = [
  { value: 'lunch', label: 'Обід' },
  { value: 'meeting', label: 'Співбесіда' },
  { value: 'cleaning', label: 'Прибирання' },
  { value: 'learning', label: 'Навчання' },
]

const ReserveTimeModal: React.FC<ReserveTimeModalProps> = ({ open, onClose, onSave }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const { t } = useTranslation()
  const { scheduleData } = useSchedule()

  const [type, setType] = useState<string>(RESERVE_TYPES[0].value)
  const [start, setStart] = useState<Date | null>(null)
  const [end, setEnd] = useState<Date | null>(null)
  const [date, setDate] = useState<Date | null>(null)
  const [comment, setComment] = useState<string>('')
  const [cabinetId, setCabinetId] = useState<number>(0)
  const [eventDuration, setEventDuration] = useState(90)

  const handleDurationChange = (duration: number) => {
    setEventDuration(duration)
    if (start) {
      const newEndTime = addMinutes(start, duration)
      setEnd(newEndTime)
    }
  }

  const handleSave = () => {
    if (type && start && end) {
      onSave({ type, start, end, comment, date: date || new Date() })
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
            {t('reserve-time-modal.title')}
          </Typography>
        </Box>
      </Box>
      <DialogContent>
        <FormControl fullWidth sx={{ flex: 1, mt: 2 }}>
          <InputLabel>{t('reserve-time-modal.type')}</InputLabel>
          <Select label={t('reserve-time-modal.type')} value={type} onChange={(e) => setType(e.target.value)} fullWidth>
            {RESERVE_TYPES.map((type) => (
              <MenuItem key={type.value} value={type.value}>
                {type.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ flex: 1, mt: 2 }}>
          <InputLabel>{t('reserve-time-modal.cabinet')}</InputLabel>
          <Select
            label={t('reserve-time-modal.cabinet')}
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
                label={t('reserve-time-modal.date')}
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
                onChange={(newValue: Date | null) => {
                  setStart(newValue)
                }}
                label={t('reserve-time-modal.start-time')}
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
                onChange={(newValue: Date | null) => setEnd(newValue)}
                label={t('reserve-time-modal.end-time')}
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
        <Box
          sx={{
            display: 'flex',
            mb: isMobile ? 1.5 : 2,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? 2 : 0,
          }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: isMobile ? 1 : 0 }}>
            {times.map((time) => (
              <Box
                onClick={() => handleDurationChange(time)}
                sx={{
                  width: isMobile ? '32px' : '36px',
                  height: isMobile ? '32px' : '36px',
                  fontWeight: 400,
                  fontSize: isMobile ? 12 : 14,
                  lineHeight: '143%',
                  letterSpacing: '0.01em',
                  textAlign: 'center',
                  background: eventDuration === time ? '#0029d9' : 'transparent',
                  color: eventDuration === time ? '#fff' : 'rgba(21, 22, 24, 0.87)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  '&:hover': {
                    background: eventDuration === time ? '#0029d9' : 'rgba(0, 41, 217, 0.08)',
                  },
                }}
                key={time}>
                {time}
              </Box>
            ))}
          </Box>
          <Box
            sx={{
              fontWeight: 400,
              fontSize: isMobile ? 11 : 12,
              lineHeight: '166%',
              letterSpacing: '0.03em',
              color: 'rgba(21, 22, 24, 0.6)',
              display: 'flex',
              flexDirection: 'column',
              textAlign: isMobile ? 'center' : 'left',
            }}>
            {Math.floor(eventDuration / 60) > 0 && (
              <>
                {Math.floor(eventDuration / 60)} {getHourLabel(Math.floor(eventDuration / 60))}
              </>
            )}
            {eventDuration % 60 > 0 && <> {eventDuration % 60} хвилин</>}
          </Box>
        </Box>
        <FormControl fullWidth sx={{ flex: 1, mt: 2 }}>
          <TextField
            label={t('reserve-time-modal.comment')}
            value={comment}
            variant="filled"
            onChange={(e) => setComment(e.target.value)}
            fullWidth
            multiline
            rows={1}
            sx={{
              '& .MuiInputBase-root': {
                minHeight: isMobile ? 48 : 'auto',
              },
            }}
          />
        </FormControl>
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
            {t('reserve-time-modal.cancel')}
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
            {t('reserve-time-modal.save')}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default ReserveTimeModal
