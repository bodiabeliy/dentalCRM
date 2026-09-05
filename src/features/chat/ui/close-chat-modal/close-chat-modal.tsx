import { Dialog, DialogContent, FormGroup, FormControlLabel, Switch, Button, Box, Typography } from '@mui/material'
import UsersIcon from '../../../../shared/assets/icons/users.svg?react'

interface CloseChatModalProps {
  open: boolean
  onClose: () => void
  isMobile?: boolean
}

export function CloseChatModal({ open, onClose, isMobile = false }: CloseChatModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          width: '100%',
          maxWidth: isMobile ? '100%' : 700,
          borderRadius: isMobile ? 0 : 2,
          m: 2,
          p: 0,
          background: '#fff',
          boxShadow: '0 4px 24px rgba(44,51,74,0.12)',
          display: 'flex',
          overflow: 'visible',
          height: isMobile ? '100%' : 'auto',
        },
      }}>
      <Box
        sx={{
          background: '#eff3ff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: isMobile ? '12px 16px' : '16px',
          gap: isMobile ? 2 : 0,
        }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <UsersIcon style={{ width: isMobile ? 20 : 24, height: isMobile ? 20 : 24, color: '#0029d9' }} />
          <Typography variant="h6">Закрити чат</Typography>
        </Box>
      </Box>
      <DialogContent sx={{ p: 2, pt: 0 }}>
        <FormGroup sx={{ mt: 2, width: '100%' }}>
          <FormControlLabel control={<Switch />} label="Позначити як нецільовий чат" />
        </FormGroup>
        <Box sx={{ display: 'flex', gap: '8px', mt: 2 }}>
          <Button
            variant="outlined"
            sx={{
              padding: '12px 22px',
            }}
            onClick={onClose}>
            Скасувати
          </Button>
          <Button
            sx={{
              flex: 1,
              padding: '12px 22px',
            }}
            onClick={onClose}
            variant="contained">
            Підтвердити
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
