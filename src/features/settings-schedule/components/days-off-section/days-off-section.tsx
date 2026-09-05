import { Box, Typography, IconButton, Chip, MenuItem, Select } from '@mui/material'
import type { SelectChangeEvent } from '@mui/material/Select'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { useState } from 'react'

const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд']
const monthsUk = [
  'Січень',
  'Лютий',
  'Березень',
  'Квітень',
  'Травень',
  'Червень',
  'Липень',
  'Серпень',
  'Вересень',
  'Жовтень',
  'Листопад',
  'Грудень',
]

interface DaysOffSectionProps {
  daysOff: Date[]
  setDaysOff: (days: Date[]) => void
}

export function DaysOffSection({ daysOff, setDaysOff }: DaysOffSectionProps) {
  const today = new Date()
  const [month, setMonth] = useState(new Date('2025-05-02'))

  const startOfMonth = new Date(month.getFullYear(), month.getMonth(), 1)
  const endOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0)
  const daysInMonth = endOfMonth.getDate()
  const firstDayOfWeek = (startOfMonth.getDay() + 6) % 7

  const weeks: (number | null)[][] = []
  let week: (number | null)[] = Array(firstDayOfWeek).fill(null)
  for (let day = 1; day <= daysInMonth; day++) {
    week.push(day)
    if (week.length === 7) {
      weeks.push(week)
      week = []
    }
  }
  if (week.length) {
    while (week.length < 7) week.push(null)
    weeks.push(week)
  }

  const handleDayClick = (day: number) => {
    const date = new Date(month.getFullYear(), month.getMonth(), day)
    if (daysOff.some((d) => d.toISOString() === date.toISOString())) {
      setDaysOff(daysOff.filter((d) => d.toISOString() !== date.toISOString()))
    } else {
      setDaysOff([...daysOff, date])
    }
  }

  const handlePrevMonth = () => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))
  const handleNextMonth = () => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))
  const handleMonthChange = (e: SelectChangeEvent<number>) =>
    setMonth(new Date(month.getFullYear(), Number(e.target.value), 1))

  return (
    <Box mb={3}>
      <Typography variant="h6" mb={2}>
        Вихідні дні
      </Typography>
      <Box display="flex" alignItems="center" mb={1}>
        <IconButton size="small" onClick={handlePrevMonth}>
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
        <Select
          value={month.getMonth()}
          onChange={handleMonthChange}
          variant="standard"
          disableUnderline
          sx={{ fontWeight: 500, mx: 1, minWidth: 100 }}>
          {monthsUk.map((m, i) => (
            <MenuItem value={i} key={m}>
              {m} {month.getFullYear()}
            </MenuItem>
          ))}
        </Select>
        <Typography fontWeight={500} mx={0.5}>
          {month.getFullYear()}
        </Typography>
        <IconButton size="small" onClick={handleNextMonth}>
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      </Box>
      <Box display="flex" justifyContent="center">
        <Box width="100%" maxWidth={420}>
          <Box display="flex" mb={1}>
            {weekDays.map((wd) => (
              <Box flex={1} key={wd} textAlign="center">
                <Typography fontWeight={500} fontSize={14}>
                  {wd}
                </Typography>
              </Box>
            ))}
          </Box>
          {weeks.map((week, wi) => (
            <Box key={wi} display="flex">
              {week.map((day, di) => {
                if (!day) return <Box key={di} flex={1} height={40} />
                const date = new Date(month.getFullYear(), month.getMonth(), day)
                const isSelected = daysOff.includes(date)
                const isToday = date.toISOString() === today.toISOString()
                return (
                  <Box key={di} flex={1} height={40} display="flex" justifyContent="center" alignItems="center">
                    <Chip
                      label={
                        <Box display="flex" alignItems="center" justifyContent="center" width={1} height={1}>
                          {day}
                        </Box>
                      }
                      variant={isSelected ? 'filled' : 'outlined'}
                      color={isSelected ? 'error' : 'default'}
                      onClick={() => handleDayClick(day)}
                      sx={{
                        border: isToday ? '2px solid #0029d9' : '2px solid transparent',
                        borderRadius: '50%',
                        width: 32,
                        height: 32,
                        fontWeight: 500,
                        background: isSelected ? '#E53935' : undefined,
                        color: isSelected ? '#fff' : undefined,
                        p: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    />
                  </Box>
                )
              })}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
