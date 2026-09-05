import { useState, useRef } from 'react'
import { Box, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { formatDate } from '../../../shared/utils/dateUtils'
import CalendarIcon from '../../../shared/assets/icons/calendar.svg?react'
import { uk } from 'date-fns/locale'

interface CustomDatePickerProps {
  selectedDate: Date
  setSelectedDate: (date: Date) => void
}

export function CustomDatePicker({ selectedDate, setSelectedDate }: CustomDatePickerProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const [open, setOpen] = useState(false)
  const anchorRef = useRef<HTMLDivElement>(null)

  const handlePrev = () => setSelectedDate(new Date(selectedDate.getTime() - 86400000))
  const handleNext = () => setSelectedDate(new Date(selectedDate.getTime() + 86400000))

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={uk}>
      <DatePicker
        value={selectedDate}
        onChange={(date) => date && setSelectedDate(date)}
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{
          textField: { style: { display: 'none' } },
          popper: { anchorEl: anchorRef.current },
        }}
        format="dd/MM/yyyy"
      />
      {isMobile ? (
        <Box ref={anchorRef}>
          <IconButton
            onClick={() => setOpen(true)}
            sx={{
              border: '1px solid #7ea0f7',
              borderRadius: '12px',
              width: 44,
              height: 44,
              color: '#1747e7',
              bgcolor: 'white',
              boxShadow: '0 1px 4px 0 #e3e8f0',
            }}>
            <CalendarIcon style={{ width: 20, height: 20 }} />
          </IconButton>
        </Box>
      ) : (
        <Box
          ref={anchorRef}
          sx={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #7ea0f7',
            borderRadius: '8px',
            overflow: 'hidden',
            height: '40px',
            minWidth: '210px',
            bgcolor: 'white',
            boxShadow: '0 1px 4px 0 #e3e8f0',
          }}>
          <IconButton
            onClick={handlePrev}
            sx={{
              borderRadius: 0,
              width: 40,
              height: 40,
              color: '#1747e7',
            }}>
            <ChevronLeft sx={{ fontSize: 20 }} />
          </IconButton>
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderLeft: '1px solid #7ea0f7',
              borderRight: '1px solid #7ea0f7',
              height: '100%',
              cursor: 'pointer',
            }}
            onClick={() => setOpen(true)}>
            <Typography
              sx={{
                fontSize: '1rem',
                fontWeight: 700,
                color: '#1747e7',
                letterSpacing: 1,
              }}>
              {formatDate(selectedDate)}
            </Typography>
          </Box>
          <IconButton
            onClick={handleNext}
            sx={{
              borderRadius: 0,
              width: 40,
              height: 40,
              color: '#1747e7',
            }}>
            <ChevronRight sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>
      )}
    </LocalizationProvider>
  )
}
