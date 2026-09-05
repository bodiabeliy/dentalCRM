import { Button } from '@mui/material'
import { Add } from '@mui/icons-material'

interface AddLeadButtonProps {
  onClick: () => void
  children: string
  isMobile: boolean
}

export function AddLeadButton({ onClick, isMobile, children }: AddLeadButtonProps) {
  return (
    <>
      {!isMobile ? (
        <Button
          variant="contained"
          onClick={onClick}
          sx={{
            textTransform: 'uppercase',
            position: 'relative',
          }}>
          {children}
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={onClick}
          sx={{
            textTransform: 'uppercase',
            position: 'relative',
          }}>
          <Add sx={{ color: 'white' }} />
        </Button>
      )}
    </>
  )
}
