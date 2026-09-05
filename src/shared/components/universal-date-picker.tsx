import React, { useState } from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import type { DatePickerProps } from '@mui/x-date-pickers/DatePicker'
import type { TextFieldProps } from '@mui/material'

interface UniversalDatePickerProps extends Omit<DatePickerProps<Date>, 'slotProps'> {
  textFieldProps?: Partial<TextFieldProps>
  slotProps?: Partial<DatePickerProps<Date>>['slotProps']
}

export const UniversalDatePicker: React.FC<UniversalDatePickerProps> = ({
  textFieldProps,
  slotProps,
  ...datePickerProps
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DatePicker
      {...datePickerProps}
      open={isOpen}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      slotProps={{
        textField: {
          InputProps: {
            readOnly: true,
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
        ...slotProps,
      }}
    />
  )
}
