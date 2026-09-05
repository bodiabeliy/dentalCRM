import { Box, Typography, Switch, useMediaQuery, useTheme } from '@mui/material'
import { UniversalTimePicker } from '../../../../shared/components'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { uk } from 'date-fns/locale'

const daysOfWeek = [
  { key: 'mon', label: 'Пн' },
  { key: 'tue', label: 'Вт' },
  { key: 'wed', label: 'Ср' },
  { key: 'thu', label: 'Чт' },
  { key: 'fri', label: 'Пт' },
  { key: 'sat', label: 'Сб' },
  { key: 'sun', label: 'Нд' },
]

export type WorkingDay = {
  key: string
  enabled: boolean
  start: Date | null
  end: Date | null
}

interface WorkingDaysSectionProps {
  workingDays: WorkingDay[]
  setWorkingDays: (days: WorkingDay[]) => void
}

export function WorkingDaysSection({ workingDays, setWorkingDays }: WorkingDaysSectionProps) {
  const getDefaultDays = () =>
    daysOfWeek.map((d) => ({
      key: d.key,
      enabled: d.key !== 'sat' && d.key !== 'sun',
      start: null,
      end: null,
    }))
  const days = workingDays.length ? workingDays : getDefaultDays()

  const handleToggle = (idx: number) => {
    const updated = days.map((d, i) => (i === idx ? { ...d, enabled: !d.enabled } : d))
    setWorkingDays(updated)
  }
  const handleTimeChange = (idx: number, field: 'start' | 'end', value: Date | null) => {
    const updated = days.map((d, i) => (i === idx ? { ...d, [field]: value } : d))
    setWorkingDays(updated)
  }

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box mb={3}>
      <Typography variant="h6" mb={2}>
        Робочі дні
      </Typography>
      <Box display="flex" flexDirection="column" gap={3}>
        {days.map((day, idx) => (
          <Box key={day.key} display="flex" alignItems="center" gap={1}>
            <Switch
              size={isMobile ? 'small' : 'medium'}
              checked={day.enabled}
              onChange={() => handleToggle(idx)}
              sx={{
                '& .MuiSwitch-thumb': {
                  backgroundColor: '#0029d9',
                  '&:hover': {
                    backgroundColor: '#0029d9',
                  },
                },
              }}
            />
            <Typography sx={{ width: isMobile ? 20 : 28 }}>{daysOfWeek[idx].label}</Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={uk}>
              <UniversalTimePicker
                value={day.start}
                onChange={(e) => handleTimeChange(idx, 'start', e)}
                disabled={!day.enabled}
                isIcon={false}
                textFieldProps={{
                  sx: {
                    '& .MuiInputBase-root': {
                      minHeight: isMobile ? 'auto' : 48,
                      height: isMobile ? '40px' : 48,
                    },
                    width: 120,
                  },
                }}
              />
              <Typography sx={{ mx: isMobile ? 0 : 1 }}>—</Typography>
              <UniversalTimePicker
                value={day.end}
                onChange={(e) => handleTimeChange(idx, 'end', e)}
                disabled={!day.enabled}
                isIcon={false}
                textFieldProps={{
                  sx: {
                    '& .MuiInputBase-root': {
                      minHeight: isMobile ? 'auto' : 48,
                      height: isMobile ? '40px' : 48,
                    },
                    width: 120,
                  },
                }}
              />
            </LocalizationProvider>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
