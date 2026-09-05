import React, { useState, useEffect, useRef } from 'react'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import type { TimePickerProps } from '@mui/x-date-pickers/TimePicker'
import type { TextFieldProps } from '@mui/material'
import { TextField, Box } from '@mui/material'

interface UniversalTimePickerProps extends Omit<TimePickerProps<Date>, 'slotProps'> {
  textFieldProps?: Partial<TextFieldProps>
  isIcon?: boolean
  useUkrainianFormat?: boolean
}

const ukrainianTimeFormat = (date: Date | null): string => {
  if (!date) return ''

  const hours = date.getHours()
  const minutes = date.getMinutes()

  let result = ''

  if (hours > 0) {
    result += `${hours} год`
  }

  if (minutes > 0) {
    if (result) result += ' '
    result += `${minutes} хв`
  }

  return result || '0 хв'
}

export const UniversalTimePicker: React.FC<UniversalTimePickerProps> = ({
  textFieldProps,
  isIcon = true,
  useUkrainianFormat = false,
  value,
  onChange,
  label,
  ...timePickerProps
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [displayValue, setDisplayValue] = useState<string>('')
  const anchorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (useUkrainianFormat && value) {
      const formatted = ukrainianTimeFormat(value)
      setDisplayValue(formatted)
    } else {
      setDisplayValue('')
    }
  }, [value, useUkrainianFormat])

  if (useUkrainianFormat) {
    return (
      <Box sx={{ position: 'relative' }} ref={anchorRef}>
        <TextField
          label={label}
          value={displayValue}
          onClick={() => setIsOpen(true)}
          InputProps={{
            readOnly: true,
            endAdornment: isIcon ? textFieldProps?.InputProps?.endAdornment : null,
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
        <TimePicker
          {...timePickerProps}
          value={value}
          open={isOpen}
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
          onChange={onChange}
          slotProps={{
            textField: { style: { display: 'none' } },
            popper: { anchorEl: anchorRef.current },
            digitalClockSectionItem: {
              sx: {
                backgroundColor: 'transparent',
                color: 'rgba(21, 22, 24, 0.87)',
                borderRadius: '50%',
                height: '36px',
                width: '36px',
                margin: '0 auto',
                '&:hover': {
                  backgroundColor: 'rgba(0, 41, 217, 0.08)',
                },
                '&.Mui-selected': {
                  backgroundColor: '#0029d9',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#0020A8',
                  },
                },
              },
            },
            actionBar: {
              sx: {
                '& .MuiButton-root': {
                  color: '#0029d9',
                },
              },
            },
          }}
        />
      </Box>
    )
  }

  return (
    <TimePicker
      {...timePickerProps}
      value={value}
      onChange={onChange}
      open={isOpen}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      slotProps={{
        textField: {
          label: label,
          InputProps: {
            readOnly: true,
            ...(!isIcon && {
              endAdornment: null,
            }),
          },
          onClick: () => setIsOpen(true),
          sx: {
            cursor: 'pointer',
            '& .MuiInputBase-root': {
              cursor: 'pointer',
            },
            ...textFieldProps?.sx,
          },
          ...textFieldProps,
        },
        digitalClockSectionItem: {
          sx: {
            backgroundColor: 'transparent',
            color: 'rgba(21, 22, 24, 0.87)',
            borderRadius: '50%',
            height: '36px',
            width: '36px',
            margin: '0 auto',
            '&:hover': {
              backgroundColor: 'rgba(0, 41, 217, 0.08)',
            },
            '&.Mui-selected': {
              backgroundColor: '#0029d9',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#0020A8',
              },
            },
          },
        },
        actionBar: {
          sx: {
            '& .MuiButton-root': {
              color: '#0029d9',
            },
          },
        },
      }}
    />
  )
}
