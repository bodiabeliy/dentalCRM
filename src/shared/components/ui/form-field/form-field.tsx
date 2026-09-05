import { Box, Chip, Typography } from '@mui/material'

export function FormField({
  label,
  value,
  icon,
  chipLabel,
  chipColor,
  disableIcon = false,
  isDisabled,
}: {
  label: string
  value: string
  icon?: React.ReactNode
  chipLabel?: string
  chipColor?: string
  disableIcon?: boolean
  isDisabled?: boolean
}) {
  return (
    <Box sx={{ flex: 1 }}>
      <Typography sx={{ color: '#718096', fontSize: 14, mb: 0.5 }}>{label}</Typography>
      <Box
        sx={{
          bgcolor: isDisabled ? '#f0f0f0' : null,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          p: isDisabled ? 1 : null,
          borderBottom: '1px solid #E2E8F0',
        }}>
        {!disableIcon && icon && <Box sx={{ color: '#A0AEC0' }}>{icon}</Box>}
        <Typography sx={{ flex: 1, color: '#2D3748' }}>{value}</Typography>
        {chipLabel && (
          <Chip
            label={chipLabel}
            sx={{
              borderRadius: '2px',
              bgcolor: chipColor,
              color: '#fff',
              height: 24,
              fontSize: 12,
              fontWeight: 500,
            }}
          />
        )}
      </Box>
    </Box>
  )
}
