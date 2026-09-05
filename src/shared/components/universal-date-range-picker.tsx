import React, { useState, useRef } from 'react'
import { Box, TextField, InputAdornment, Popover, Typography, Button } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import type { TextFieldProps } from '@mui/material'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'

interface UniversalDateRangePickerProps {
  value: [Date | null, Date | null]
  onChange: (value: [Date | null, Date | null]) => void
  label?: string
  textFieldProps?: Partial<TextFieldProps>
}

export const UniversalDateRangePicker: React.FC<UniversalDateRangePickerProps> = ({
  value,
  onChange,
  label = 'Період',
  textFieldProps,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [tempStartDate, setTempStartDate] = useState<Date | null>(value[0])
  const [tempEndDate, setTempEndDate] = useState<Date | null>(value[1])
  const anchorRef = useRef<HTMLDivElement>(null)
  const [startDate, endDate] = value

  const formatDateRange = () => {
    if (!startDate && !endDate) return ''
    if (!startDate) return endDate ? formatDate(endDate) : ''
    if (!endDate) return formatDate(startDate)

    const start = formatDate(startDate)
    const end = formatDate(endDate)
    return `${start} – ${end}`
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('uk-UA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  const handleClick = () => {
    setTempStartDate(startDate)
    setTempEndDate(endDate)
    setIsOpen(true)
  }

  const handleApply = () => {
    onChange([tempStartDate, tempEndDate])
    setIsOpen(false)
  }

  const handleCancel = () => {
    setTempStartDate(startDate)
    setTempEndDate(endDate)
    setIsOpen(false)
  }

  return (
    <Box sx={{ position: 'relative' }} ref={anchorRef}>
      <TextField
        fullWidth
        label={label}
        value={formatDateRange()}
        onClick={handleClick}
        InputProps={{
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end">
              <CalendarTodayIcon sx={{ color: '#9e9e9e' }} />
            </InputAdornment>
          ),
        }}
        sx={{
          cursor: 'pointer',
          '& .MuiInputBase-root': {
            cursor: 'pointer',
          },
          ...textFieldProps?.sx,
        }}
        {...textFieldProps}
      />

      <Popover
        open={isOpen}
        anchorEl={anchorRef.current}
        onClose={handleCancel}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        slotProps={{
          paper: {
            sx: {
              p: 2,
              minWidth: 600,
            },
          },
        }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Виберіть період
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Початок періоду
              </Typography>
              <DatePicker
                value={tempStartDate}
                onChange={setTempStartDate}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: 'small',
                  },
                }}
              />
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Кінець періоду
              </Typography>
              <DatePicker
                value={tempEndDate}
                onChange={setTempEndDate}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: 'small',
                  },
                }}
              />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', mt: 2 }}>
            <Button variant="outlined" onClick={handleCancel}>
              Скасувати
            </Button>
            <Button variant="contained" onClick={handleApply}>
              Застосувати
            </Button>
          </Box>
        </Box>
      </Popover>
    </Box>
  )
}
