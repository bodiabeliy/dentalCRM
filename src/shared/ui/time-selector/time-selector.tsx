import { Box, Typography, IconButton, TextField } from '@mui/material'
import { ChevronRight, ChevronLeft } from '@mui/icons-material'

const options = [
  { label: 'днів', value: 'days' },
  { label: 'годин', value: 'hours' },
  { label: 'хвилин', value: 'minutes' },
]

interface TimeSelectorProps {
  selectedType: (typeof options)[0]
  onTypeChange: (type: (typeof options)[0]) => void
  value: string
  onValueChange: (value: string) => void
}

export function TimeSelector({ selectedType, onTypeChange, value, onValueChange }: TimeSelectorProps) {
  const handlePrev = () => {
    const currentIndex = options.findIndex((option) => option.value === selectedType.value)
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1
    onTypeChange(options[prevIndex])
  }

  const handleNext = () => {
    const currentIndex = options.findIndex((option) => option.value === selectedType.value)
    const nextIndex = currentIndex < options.length - 1 ? currentIndex + 1 : 0
    onTypeChange(options[nextIndex])
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          border: '1px solid #7ea0f7',
          borderRadius: '8px',
          overflow: 'hidden',
          height: '26px',
          minWidth: '145px',
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
          }}>
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: 13,
              lineHeight: '169%',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: '#0029d9',
              px: 1,
            }}>
            {selectedType.label}
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

      <TextField
        variant="outlined"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderTop: 'none',
            borderLeft: 'none',
            borderRight: 'none',
            borderRadius: 0,

            '& .MuiInputBase-input': {
              fontSize: 14,
              padding: 0,
              paddingBottom: 1,
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderTop: 'none',
              borderLeft: 'none',
              borderRight: 'none',
              borderBottom: '1px solid rgba(0, 0, 0, 0.42);',
              borderRadius: 0,
            },
          },
        }}
        placeholder="Введіть значення"
      />
    </Box>
  )
}
