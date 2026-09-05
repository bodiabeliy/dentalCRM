import { Button, useTheme, useMediaQuery } from '@mui/material'
import { Add } from '@mui/icons-material'

interface AddPatientButtonProps {
  onClick: () => void
}

export function AddPatientButton({ onClick }: AddPatientButtonProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <Button
      variant="contained"
      startIcon={<Add sx={{ color: 'white' }} />}
      onClick={onClick}
      sx={{
        '& .MuiButton-startIcon': {
          marginRight: isMobile ? 0 : '8px',
          marginLeft: isMobile ? 0 : '-4px',
        },
      }}>
      {!isMobile ? 'ДОДАТИ ПАЦІЄНТА' : null}
    </Button>
  )
}
