import React, { useState, useEffect } from 'react'
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
import ScheduleIcon from '../../../shared/assets/icons/schedule.svg?react'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { uk } from 'date-fns/locale'
import { UniversalDatePicker, UniversalTimePicker } from '../../../shared/components'
import { addMinutes, format } from 'date-fns'
import { getHourLabel } from '../../../shared/utils/dateUtils'
import { Avatar } from '../../../shared/components/ui/avatar'

interface EditAssistantShiftModalProps {
  open: boolean
  onClose: () => void
  onSave: (data: {
    doctorId: number
    cabinetId: number
    date: string
    scheduledStart: string
    scheduledEnd: string
    actualStart?: string
    actualEnd?: string
  }) => void
  initialCabinetId?: number
  initialDate?: string
  initialDoctorId?: number
  initialScheduledStart?: Date
  initialScheduledEnd?: Date
  initialActualStart?: Date
  initialActualEnd?: Date
}

const times = [5, 10, 15, 20, 25, 30, 35, 40, 45, 60, 90, 120]

const EditAssistantShiftModal: React.FC<EditAssistantShiftModalProps> = ({
  open,
  onClose,
  onSave,
  initialCabinetId,
  initialDate,
  initialDoctorId,
  initialScheduledStart,
  initialScheduledEnd,
  initialActualStart,
  initialActualEnd,
}) => {
  const { doctors, scheduleData } = useSchedule()
  const [cabinetId, setCabinetId] = useState<number>(initialCabinetId || (scheduleData?.cabinets[0]?.id ?? 0))
  const [date, setDate] = useState<Date | null>(initialDate ? new Date(initialDate) : null)
  const [scheduledStart, setScheduledStart] = useState<Date | null>(initialScheduledStart || null)
  const [scheduledEnd, setScheduledEnd] = useState<Date | null>(initialScheduledEnd || null)
  const [actualStart, setActualStart] = useState<Date | null>(initialActualStart || null)
  const [actualEnd, setActualEnd] = useState<Date | null>(initialActualEnd || null)
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(
    doctors.find((d) => d.id === initialDoctorId) || null
  )
  const [plannedDuration, setPlannedDuration] = useState<number>(90)
  const [actualDuration, setActualDuration] = useState<number>(90)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (open) {
      setCabinetId(initialCabinetId || (scheduleData?.cabinets[0]?.id ?? 0))
      setDate(initialDate ? new Date(initialDate) : new Date())
      const defaultStart = new Date(1970, 0, 1, 9, 0)
      setScheduledStart(initialScheduledStart || defaultStart)
      setScheduledEnd(initialScheduledEnd || addMinutes(defaultStart, plannedDuration))
      setActualStart(initialActualStart || defaultStart)
      setActualEnd(initialActualEnd || addMinutes(defaultStart, actualDuration))
      setSelectedDoctor(doctors.find((d) => d.id === initialDoctorId) || null)
    }
    // eslint-disable-next-line
  }, [open])

  const handleSave = () => {
    if (selectedDoctor?.id && cabinetId && date && scheduledStart && scheduledEnd) {
      onSave({
        doctorId: selectedDoctor.id,
        cabinetId,
        date: format(date, 'yyyy-MM-dd'),
        scheduledStart: format(scheduledStart, 'HH:mm'),
        scheduledEnd: format(scheduledEnd, 'HH:mm'),
        actualStart: actualStart ? format(actualStart, 'HH:mm') : undefined,
        actualEnd: actualEnd ? format(actualEnd, 'HH:mm') : undefined,
      })
    }
  }

  const handlePlannedDurationChange = (duration: number) => {
    setPlannedDuration(duration)
    if (scheduledStart) {
      const newEnd = addMinutes(scheduledStart, duration)
      setScheduledEnd(newEnd)
    }
  }
  const handlePlannedStartChange = (newValue: Date | null) => {
    setScheduledStart(newValue)
    if (newValue && plannedDuration) {
      setScheduledEnd(addMinutes(newValue, plannedDuration))
    }
  }
  const handlePlannedEndChange = (newValue: Date | null) => {
    setScheduledEnd(newValue)
    if (scheduledStart && newValue) {
      const diff = (newValue.getTime() - scheduledStart.getTime()) / 60000
      setPlannedDuration(diff > 0 ? diff : 0)
    }
  }

  const handleActualDurationChange = (duration: number) => {
    setActualDuration(duration)
    if (actualStart) {
      const newEnd = addMinutes(actualStart, duration)
      setActualEnd(newEnd)
    }
  }
  const handleActualStartChange = (newValue: Date | null) => {
    setActualStart(newValue)
    if (newValue && actualDuration) {
      setActualEnd(addMinutes(newValue, actualDuration))
    }
  }
  const handleActualEndChange = (newValue: Date | null) => {
    setActualEnd(newValue)
    if (actualStart && newValue) {
      const diff = (newValue.getTime() - actualStart.getTime()) / 60000
      setActualDuration(diff > 0 ? diff : 0)
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
          overscrollBehavior: 'none',
          touchAction: 'none',
        },
      }}>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2, background: '#f4f7fe' }}>
        <ScheduleIcon style={{ color: '#0029d9', marginRight: 12, width: 24, height: 24 }} />
        <Typography variant="h6" sx={{ fontWeight: 500, flex: 1 }}>
          Зміна асистента
        </Typography>
      </Box>
      <DialogContent
        sx={{
          overflow: 'hidden',
          WebkitOverflowScrolling: 'auto',
          touchAction: 'none',
        }}>
        <FormControl fullWidth sx={{ flex: 1, mt: 2 }}>
          <Autocomplete
            value={selectedDoctor}
            onChange={(_, newValue) => setSelectedDoctor(newValue)}
            options={doctors}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Асистент"
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
          <InputLabel>Кабінет</InputLabel>
          <Select label="Кабінет" value={cabinetId} onChange={(e) => setCabinetId(Number(e.target.value))} fullWidth>
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
                label="Дата зміни"
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
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Плановий час зміни
            </Typography>
            <Box
              sx={{
                display: 'flex',
                gap: isMobile ? 1 : 2,
                alignItems: 'center',
                flexDirection: isMobile ? 'column' : 'row',
              }}>
              <FormControl fullWidth>
                <UniversalTimePicker
                  value={scheduledStart}
                  onChange={handlePlannedStartChange}
                  label="Початок зміни"
                  sx={{ '& .MuiInputBase-root': { minHeight: isMobile ? 48 : 'auto' } }}
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
              <FormControl fullWidth>
                <UniversalTimePicker
                  value={scheduledEnd}
                  onChange={handlePlannedEndChange}
                  label="Кінець зміни"
                  sx={{ '& .MuiInputBase-root': { minHeight: isMobile ? 48 : 'auto' } }}
                />
              </FormControl>
            </Box>
            <Box
              sx={{
                display: 'flex',
                mb: isMobile ? 1.5 : 2,
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: isMobile ? 1 : 0,
                mt: 1,
              }}>
              {times.map((time) => (
                <Box
                  onClick={() => handlePlannedDurationChange(time)}
                  sx={{
                    width: isMobile ? '32px' : '36px',
                    height: isMobile ? '32px' : '36px',
                    fontWeight: 400,
                    fontSize: isMobile ? 12 : 14,
                    lineHeight: '143%',
                    letterSpacing: '0.01em',
                    textAlign: 'center',
                    background: plannedDuration === time ? '#0029d9' : 'transparent',
                    color: plannedDuration === time ? '#fff' : 'rgba(21, 22, 24, 0.87)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    '&:hover': {
                      background: plannedDuration === time ? '#0029d9' : 'rgba(0, 41, 217, 0.08)',
                    },
                  }}
                  key={time}>
                  {time}
                </Box>
              ))}
              <Box
                sx={{
                  fontWeight: 400,
                  fontSize: isMobile ? 11 : 12,
                  lineHeight: '166%',
                  letterSpacing: '0.03em',
                  color: 'rgba(21, 22, 24, 0.6)',
                  ml: 2,
                }}>
                {Math.floor(plannedDuration / 60) > 0 && (
                  <>
                    {Math.floor(plannedDuration / 60)} {getHourLabel(Math.floor(plannedDuration / 60))}
                  </>
                )}
                {plannedDuration % 60 > 0 && <> {plannedDuration % 60} хвилин</>}
              </Box>
            </Box>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Фактичний час зміни
            </Typography>
            <Box
              sx={{
                display: 'flex',
                gap: isMobile ? 1 : 2,
                alignItems: 'center',
                flexDirection: isMobile ? 'column' : 'row',
              }}>
              <FormControl fullWidth>
                <UniversalTimePicker
                  value={actualStart}
                  onChange={handleActualStartChange}
                  label="Початок зміни"
                  sx={{ '& .MuiInputBase-root': { minHeight: isMobile ? 48 : 'auto' } }}
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
              <FormControl fullWidth>
                <UniversalTimePicker
                  value={actualEnd}
                  onChange={handleActualEndChange}
                  label="Кінець зміни"
                  sx={{ '& .MuiInputBase-root': { minHeight: isMobile ? 48 : 'auto' } }}
                />
              </FormControl>
            </Box>
            <Box
              sx={{
                display: 'flex',
                mb: isMobile ? 1.5 : 2,
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: isMobile ? 1 : 0,
                mt: 1,
              }}>
              {times.map((time) => (
                <Box
                  onClick={() => handleActualDurationChange(time)}
                  sx={{
                    width: isMobile ? '32px' : '36px',
                    height: isMobile ? '32px' : '36px',
                    fontWeight: 400,
                    fontSize: isMobile ? 12 : 14,
                    lineHeight: '143%',
                    letterSpacing: '0.01em',
                    textAlign: 'center',
                    background: actualDuration === time ? '#0029d9' : 'transparent',
                    color: actualDuration === time ? '#fff' : 'rgba(21, 22, 24, 0.87)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    '&:hover': {
                      background: actualDuration === time ? '#0029d9' : 'rgba(0, 41, 217, 0.08)',
                    },
                  }}
                  key={time}>
                  {time}
                </Box>
              ))}
              <Box
                sx={{
                  fontWeight: 400,
                  fontSize: isMobile ? 11 : 12,
                  lineHeight: '166%',
                  letterSpacing: '0.03em',
                  color: 'rgba(21, 22, 24, 0.6)',
                  ml: 2,
                }}>
                {Math.floor(actualDuration / 60) > 0 && (
                  <>
                    {Math.floor(actualDuration / 60)} {getHourLabel(Math.floor(actualDuration / 60))}
                  </>
                )}
                {actualDuration % 60 > 0 && <> {actualDuration % 60} хвилин</>}
              </Box>
            </Box>
          </Box>
        </LocalizationProvider>
        <Box sx={{ display: 'flex', gap: '8px', mt: 2 }}>
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{
              fontWeight: 500,
              fontSize: isMobile ? 14 : 15,
              lineHeight: '173%',
              letterSpacing: '0.03em',
              textTransform: 'uppercase',
              color: '#0029d9',
              borderRadius: '8px',
              padding: isMobile ? '14px 22px' : '12px 22px',
              minHeight: isMobile ? 56 : 'auto',
            }}>
            СКАСУВАТИ
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
            ЗБЕРЕГТИ
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default EditAssistantShiftModal
