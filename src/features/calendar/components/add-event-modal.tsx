import React, { useState, useEffect } from 'react'
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  FormControl,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
  useMediaQuery,
  Alert,
  Snackbar,
} from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { UniversalDatePicker, UniversalTimePicker } from '../../../shared/components'
import { uk } from 'date-fns/locale'
import { parse, format, addMinutes } from 'date-fns'
import CalendarIcon from '../../../shared/assets/icons/edit-calendar.svg?react'
import ChevronIcon from '../../../shared/assets/icons/chevron.svg?react'
import { EVENT_STATUSES } from '../../schedule/constants/schedule-constants'
import type { Event, Visit } from '../../schedule/types/schedule-types'
import StatusIcon from '../../../shared/assets/icons/status.svg?react'
import { getAllPatients as fetchPatients } from '../api/patients'
import { getAllDoctors, getAllRooms, getPatientsStatuses } from '../../schedule/api/schedule-api'
import { useTranslation } from 'react-i18next'
import { PATIENTS_STATUSES, type PatientsStatuses } from '../data/mock-data'
import PlusIcon from '../../../shared/assets/icons/plus.svg?react'
import { NewPatientModal } from './new-patient-modal'
import { addPatient, type NewPatient } from '../api/patients'
import { Avatar } from '../../../shared/components/ui/avatar'
import { getHourLabel } from '../../../shared/utils/dateUtils'

interface AddEventModalProps {
  open: boolean
  onClose: () => void
  onSave: (newEvent: Omit<Event, 'id'>) => void
  initialDate?: string
  initialTime?: string
  initialCabinetId?: number
}

const times = [5, 10, 15, 20, 25, 30, 35, 40, 45, 60, 90, 120]

export const AddEventModal: React.FC<AddEventModalProps> = ({
  open,
  onClose,
  onSave,
  initialDate,
  initialTime,
  initialCabinetId,
}) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [currentStatus, setCurrentStatus] = useState<string>(EVENT_STATUSES[0].value)
  const [showNewPatientModal, setShowNewPatientModal] = useState(false)

  const [startTime, setStartTime] = useState<Date | null>(null)
  const [endTime, setEndTime] = useState<Date | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedPatient, setSelectedPatient] = useState<Visit['patient'] | null>(null)
  const [selectedDoctor, setSelectedDoctor] = useState('')
  const [selectedCabinet, setSelectedCabinet] = useState('')
  const [selectedCharacteristic, setSelectedCharacteristic] = useState('')
  const [comment, setComment] = useState('')
  const [eventDuration, setEventDuration] = useState(90)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [patients, setPatients] = useState<Visit['patient'][]>([])
  const [doctors, setDoctors] = useState<Visit['doctor'][]>([])
  const [rooms, setRooms] = useState<{ id: number; name: string; color: string }[]>([])
  const [patientsStatuses, setPatientsStatuses] = useState<{ id: number; value: string }[]>([])
  const [isLoadingData, setIsLoadingData] = useState(false)

  const [formErrors, setFormErrors] = useState<{
    patient?: string
    doctor?: string
    cabinet?: string
    date?: string
    startTime?: string
    endTime?: string
  }>({})

  const [showSuccess, setShowSuccess] = useState(false)

  const onChangeCharacteristic = (characteristic: string) => {
    setSelectedCharacteristic(characteristic)
    if (!comment) {
      setComment(`${t(PATIENTS_STATUSES[characteristic as PatientsStatuses]?.label)}. `)
    } else {
      setComment((prev) => `${t(PATIENTS_STATUSES[characteristic as PatientsStatuses]?.label)} ${prev}`)
    }
  }

  useEffect(() => {
    const loadData = async () => {
      setIsLoadingData(true)
      try {
        const [patientsResponse, doctorsResponse, roomsResponse, patientsStatusesResponse] = await Promise.all([
          fetchPatients(),
          getAllDoctors(),
          getAllRooms(),
          getPatientsStatuses(),
        ])

        if (patientsResponse.success) {
          setPatients(patientsResponse.data || [])
        }
        if (doctorsResponse.success) {
          setDoctors(doctorsResponse.data || [])
        }
        if (roomsResponse.success) {
          setRooms(roomsResponse.data || [])
        }
        if (patientsStatusesResponse.success) {
          setPatientsStatuses(patientsStatusesResponse.data || [])
        }
      } catch (error) {
        console.error('Failed to load data:', error)
      } finally {
        setIsLoadingData(false)
      }
    }

    if (open) {
      loadData()
    }
  }, [open])

  useEffect(() => {
    if (open) {
      if (initialDate) {
        const eventDate = parse(initialDate, 'yyyy-MM-dd', new Date())
        setSelectedDate(eventDate)
      } else {
        setSelectedDate(new Date())
      }

      if (initialTime) {
        const startDateTime = parse(initialTime, 'HH:mm', new Date())
        setStartTime(startDateTime)
        const newEndTime = addMinutes(startDateTime, eventDuration)
        setEndTime(newEndTime)
      }

      if (initialCabinetId) {
        setSelectedCabinet(initialCabinetId.toString())
      }

      setSelectedPatient(null)
      setSelectedDoctor('')
      setSelectedCharacteristic('')
      setComment('')
      setCurrentStatus(EVENT_STATUSES[0].value)
      setFormErrors({})
      setError(null)
      setSuccess(false)
    }
  }, [open, initialDate, initialTime, initialCabinetId])

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleStatusChange = (status: string) => {
    setCurrentStatus(status)
    handleMenuClose()
  }

  const validateForm = (): boolean => {
    const errors: typeof formErrors = {}

    if (!selectedPatient) {
      errors.patient = t('patient-visit.errors.select-patient')
    }

    if (!selectedDoctor) {
      errors.doctor = t('patient-visit.errors.select-doctor')
    }

    if (!selectedCabinet) {
      errors.cabinet = t('patient-visit.errors.select-cabinet')
    }

    if (!selectedDate) {
      errors.date = t('patient-visit.errors.select-date')
    }

    if (!startTime) {
      errors.startTime = t('patient-visit.errors.select-start-time')
    }

    if (!endTime) {
      errors.endTime = t('patient-visit.errors.select-end-time')
    }

    if (startTime && endTime && startTime >= endTime) {
      errors.endTime = t('patient-visit.errors.end-time-after-start')
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSave = async () => {
    if (!validateForm()) {
      return
    }

    setIsSaving(true)
    setError(null)

    try {
      const statusObj = EVENT_STATUSES.find((s) => s.value === currentStatus)
      const selectedDoctorData = doctors.find((d) => d.id === parseInt(selectedDoctor))
      const selectedRoomData = rooms.find((r) => r.id === parseInt(selectedCabinet))

      if (!selectedPatient || !selectedDoctorData || !selectedRoomData) {
        throw new Error('Missing required data')
      }

      const newEvent: Omit<Event, 'id'> = {
        patientId: selectedPatient.id,
        doctorId: parseInt(selectedDoctor),
        roomId: parseInt(selectedCabinet),
        date: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'),
        start: startTime ? format(startTime, 'HH:mm') : '09:00',
        end: endTime ? format(endTime, 'HH:mm') : '10:30',
        status: statusObj
          ? { id: 1, value: statusObj.value, color: statusObj.color }
          : { id: 1, value: EVENT_STATUSES[0].value, color: EVENT_STATUSES[0].color },
        note: comment,
        type: 'visit',
        characteristic: selectedCharacteristic,
        patient: selectedPatient,
        doctor: selectedDoctorData,
      }

      await onSave(newEvent)
      setSuccess(true)

      setTimeout(() => {
        onClose()
      }, 1000)
    } catch (err) {
      setError(err instanceof Error ? err.message : t('patient-visit.errors.save-error'))
    } finally {
      setIsSaving(false)
    }
  }

  const handleDurationChange = (duration: number) => {
    setEventDuration(duration)
    if (startTime) {
      const newEndTime = addMinutes(startTime, duration)
      setEndTime(newEndTime)
    }
  }

  const handleAddPatient = (patient: NewPatient) => {
    ;(async () => {
      try {
        const patientToSave = {
          ...patient,
          name: `${patient.lastName} ${patient.firstName}`.trim(),
          birthDate: patient.birthDate
            ? typeof patient.birthDate === 'string'
              ? patient.birthDate
              : (patient.birthDate as Date).toISOString().slice(0, 10)
            : '',
        }
        const newPatient = await addPatient(patientToSave)
        setShowNewPatientModal(false)
        setShowSuccess(true)
        const patientsResponse = await fetchPatients()
        if (patientsResponse.success) {
          const updatedPatients = patientsResponse.data || []
          setPatients(updatedPatients)

          const createdPatient = updatedPatients.find((p: Visit['patient']) => p.id === newPatient.id)
          if (createdPatient) {
            setSelectedPatient(createdPatient)
          }
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : t('patient-visit.errors.add-patient-error'))
      }
    })()
  }

  const statusObj = EVENT_STATUSES.find((s) => s.value === currentStatus)

  return (
    <>
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
              {t('patient-visit.title')}
            </Typography>
          </Box>
          <Button
            variant="contained"
            onClick={handleMenuOpen}
            sx={{
              boxShadow:
                '0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)',
              background: statusObj?.color,
              borderRadius: '8px',
              padding: isMobile ? '8px 12px' : '8px 16px',
              fontSize: isMobile ? 12 : 14,
              height: 32,
              '&:hover': {
                background: statusObj?.color,
              },
            }}>
            {statusObj ? t(statusObj?.value) : ''}
            <ChevronIcon
              style={{
                width: isMobile ? 16 : 18,
                height: isMobile ? 16 : 18,
                transform: anchorEl ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s',
              }}
            />
          </Button>
        </Box>
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
          {EVENT_STATUSES.map((status) => (
            <MenuItem
              key={status.value}
              onClick={() => handleStatusChange(status.value)}
              sx={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 16px' }}>
              <StatusIcon style={{ color: status.color, width: 20, height: 20 }} />
              <Typography>{t(status.value)}</Typography>
            </MenuItem>
          ))}
        </Menu>
        <Box sx={{ p: isMobile ? 2 : 2, flex: 1, overflow: 'auto' }}>
          <Box sx={{ mb: isMobile ? 1.5 : 2 }}>
            <Box sx={{ display: 'flex', gap: isMobile ? 1 : 2, alignItems: 'center' }}>
              <FormControl fullWidth error={!!formErrors.patient} sx={{ flex: 1 }}>
                <Autocomplete
                  value={selectedPatient}
                  onChange={(_, newValue) => setSelectedPatient(newValue)}
                  options={patients}
                  getOptionLabel={(option) => option.name}
                  loading={isLoadingData}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={t('patient-visit.patient')}
                      error={!!formErrors.patient}
                      helperText={formErrors.patient}
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: selectedPatient ? (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', mr: 1 }}>
                            <img
                              src={selectedPatient.avatar}
                              alt={selectedPatient.name}
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
                        <Typography sx={{ fontSize: isMobile ? 11 : 12, color: 'text.secondary' }}>
                          {option.age} років • {option.phone}
                        </Typography>
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
              <IconButton
                onClick={() => setShowNewPatientModal(true)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <PlusIcon style={{ width: 16, height: 16, color: '#0029d9' }} />
              </IconButton>
            </Box>
            <FormControl fullWidth sx={{ mt: 2 }} error={!!formErrors.doctor}>
              <Autocomplete
                value={doctors.find((d) => d.id.toString() === selectedDoctor) || null}
                onChange={(_, newValue) => setSelectedDoctor(newValue?.id.toString() || '')}
                options={doctors}
                getOptionLabel={(option) => option.name}
                loading={isLoadingData}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t('patient-visit.doctor')}
                    error={!!formErrors.doctor}
                    helperText={formErrors.doctor}
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: selectedDoctor ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', mr: 1 }}>
                          <Avatar
                            src={doctors.find((d) => d.id.toString() === selectedDoctor)?.avatar}
                            alt={doctors.find((d) => d.id.toString() === selectedDoctor)?.name}
                            width={24}
                            height={24}
                            borderRadius="2px"
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
                      <Typography sx={{ fontSize: isMobile ? 11 : 12, color: 'text.secondary' }}>Лікар</Typography>
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
            <FormControl fullWidth sx={{ mt: 2 }} error={!!formErrors.cabinet}>
              <InputLabel>{t('patient-visit.cabinet')}</InputLabel>
              <Select
                value={selectedCabinet}
                onChange={(e) => setSelectedCabinet(e.target.value)}
                label={t('patient-visit.cabinet')}
                error={!!formErrors.cabinet}
                disabled={isLoadingData}
                sx={{
                  minWidth: 200,
                  position: 'relative',
                  '& .MuiSelect-select': {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    minWidth: 0,
                    paddingRight: '40px',
                  },
                  '& .MuiSelect-icon': {
                    position: 'absolute',
                    right: 8,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 2,
                    background: '#fff',
                    pointerEvents: 'none',
                  },
                }}>
                {rooms.map((room) => (
                  <MenuItem key={room.id} value={room.id.toString()}>
                    {room.name}
                  </MenuItem>
                ))}
              </Select>
              {formErrors.cabinet && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                  {formErrors.cabinet}
                </Typography>
              )}
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={uk}>
              <Box sx={{ mb: isMobile ? 1.5 : 2 }}>
                <FormControl fullWidth sx={{ mt: 2 }} error={!!formErrors.date}>
                  <UniversalDatePicker
                    label={t('patient-visit.event-date')}
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                    textFieldProps={{
                      sx: {
                        width: '100%',
                        '& .MuiInputBase-root': {
                          minHeight: isMobile ? 48 : 'auto',
                        },
                      },
                    }}
                  />
                  {formErrors.date && (
                    <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                      {formErrors.date}
                    </Typography>
                  )}
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
                <FormControl fullWidth sx={{ mt: 2 }} error={!!formErrors.startTime}>
                  <UniversalTimePicker
                    value={startTime}
                    onChange={(newValue) => {
                      setStartTime(newValue)
                      if (newValue && eventDuration) {
                        const newEndTime = addMinutes(newValue, eventDuration)
                        setEndTime(newEndTime)
                      }
                    }}
                    label={t('patient-visit.start-time')}
                    textFieldProps={{
                      sx: {
                        '& .MuiInputBase-root': {
                          minHeight: isMobile ? 48 : 'auto',
                        },
                      },
                    }}
                  />
                  {formErrors.startTime && (
                    <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                      {formErrors.startTime}
                    </Typography>
                  )}
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
                <FormControl fullWidth sx={{ mt: 2 }} error={!!formErrors.endTime}>
                  <UniversalTimePicker
                    value={endTime}
                    onChange={(newValue) => setEndTime(newValue)}
                    label={t('patient-visit.end-time')}
                    textFieldProps={{
                      sx: {
                        '& .MuiInputBase-root': {
                          minHeight: isMobile ? 48 : 'auto',
                        },
                      },
                    }}
                  />
                  {formErrors.endTime && (
                    <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                      {formErrors.endTime}
                    </Typography>
                  )}
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
            <FormControl fullWidth sx={{ mb: isMobile ? 1.5 : 2 }}>
              <InputLabel>{t('patient-visit.characteristic.title')}</InputLabel>
              <Select
                fullWidth
                label={t('patient-visit.characteristic.title')}
                value={selectedCharacteristic}
                onChange={(e) => onChangeCharacteristic(e.target.value)}
                sx={{
                  '& .MuiSelect-select': {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    minWidth: 0,
                    maxWidth: 'calc(100% - 40px)',
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxWidth: 500,
                    },
                  },
                }}>
                {patientsStatuses.map((status) => {
                  const statusValue = status.value as PatientsStatuses
                  const IconComponent = PATIENTS_STATUSES[statusValue]?.icon
                  const label = t(PATIENTS_STATUSES[statusValue]?.label)

                  return (
                    <MenuItem
                      key={status.id}
                      value={statusValue}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        whiteSpace: 'normal',
                        lineHeight: 1.4,
                        py: 1,
                      }}>
                      {IconComponent && <IconComponent style={{ width: 24, height: 24 }} />}
                      <span
                        style={{
                          whiteSpace: 'normal',
                          wordBreak: 'break-word',
                          display: 'inline-block',
                        }}>
                        {label || statusValue}
                      </span>
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
            <Box
              sx={{
                mb: isMobile ? 1.5 : 2,
                background: '#f0f0f0',
                borderRadius: '8px',
                p: isMobile ? 1.5 : 2,
              }}>
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: isMobile ? 11 : 12,
                  lineHeight: '100%',
                  letterSpacing: '0.01em',
                  color: 'rgba(21, 22, 24, 0.6)',
                  mb: '4px',
                }}>
                {t('patient-visit.comment')}
              </Typography>
              <TextField
                multiline
                rows={isMobile ? 3 : 4}
                fullWidth
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value)
                }}
                placeholder={t('patient-visit.enter-comment')}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                  '& .MuiInputBase-root': {
                    padding: 0,
                    background: 'transparent',
                    cursor: 'text',
                    pointerEvents: 'auto',
                  },
                  '& .MuiInputBase-input': {
                    fontWeight: 400,
                    fontSize: isMobile ? 15 : 16,
                    lineHeight: '150%',
                    letterSpacing: '0.01em',
                    color: 'rgba(21, 22, 24, 0.87)',
                    cursor: 'text',
                    pointerEvents: 'auto',
                  },
                }}
              />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: '8px', flexDirection: isMobile ? 'column' : 'row', mt: 'auto' }}>
            <Button
              variant="outlined"
              onClick={onClose}
              disabled={isSaving}
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
                flex: isMobile ? 1 : 'auto',
              }}>
              {t('cancel')}
            </Button>
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={isSaving || isLoadingData}
              sx={{
                flex: 1,
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
              }}>
              {isSaving ? t('saving') : t('save')}
            </Button>
          </Box>
        </Box>
      </Dialog>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
          {t('alert.save-success')}
        </Alert>
      </Snackbar>
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={() => setShowSuccess(false)} severity="success" sx={{ width: '100%' }}>
          {t('alert.create-success')}
        </Alert>
      </Snackbar>
      <NewPatientModal
        open={showNewPatientModal}
        onClose={() => setShowNewPatientModal(false)}
        onSave={handleAddPatient}
      />
    </>
  )
}
