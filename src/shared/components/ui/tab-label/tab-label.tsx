import { Box, Typography } from '@mui/material'

interface TabLabelProps {
  icon: React.ReactNode
  label: string
  isActive?: boolean
}

export function TabLabel({ icon, label, isActive }: TabLabelProps) {
  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      {icon}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 500,
          fontSize: 14,
          lineHeight: '171%',
          letterSpacing: '0.03em',
          textTransform: 'uppercase',
          textAlign: 'start',
          color: isActive ? '#0029d9' : 'inherit',
        }}>
        {label}
      </Typography>
    </Box>
  )
}
