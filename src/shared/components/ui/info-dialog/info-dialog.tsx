import { Dialog, DialogContent, Box, Typography, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import type { ReactNode } from 'react'

interface InfoDialogProps {
  open: boolean
  onClose: () => void
  title: string
  icon: ReactNode
  children: ReactNode
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  fullWidth?: boolean
}

export function InfoDialog({
  open,
  onClose,
  title,
  icon,
  children,
  maxWidth = 'md',
  fullWidth = true,
}: InfoDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth={maxWidth} fullWidth={fullWidth}>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2, background: '#eff3ff' }}>
        <Box sx={{ color: '#3b5efb', marginRight: 8 }}>{icon}</Box>
        <Typography variant="h6" sx={{ fontWeight: 500, flex: 1 }}>
          {title}
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  )
}
