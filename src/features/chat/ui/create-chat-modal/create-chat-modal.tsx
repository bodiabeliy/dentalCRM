import {
  Dialog,
  DialogContent,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
  Box,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import UsersIcon from '../../../../shared/assets/icons/users.svg?react'

interface CreateChatModalProps {
  open: boolean
  onClose: () => void
  isMobile?: boolean
}

export function CreateChatModal({ open, onClose, isMobile = false }: CreateChatModalProps) {
  const [typeUser, setTypeUser] = useState('lead')

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
          <Typography variant="h6">Створення</Typography>
        </Box>
      </Box>
      <DialogContent sx={{ p: 2, pt: 0 }}>
        <FormControl sx={{ mt: 2, width: '100%' }}>
          <FormLabel id="type-user-label">Тип користувача</FormLabel>
          <RadioGroup
            aria-labelledby="type-user-label"
            defaultValue="lead"
            name="type-user-label"
            row
            onChange={(e) => setTypeUser(e.target.value)}>
            <FormControlLabel value="lead" control={<Radio />} label="Лід" />
            <FormControlLabel value="patient" control={<Radio />} label="Пацієнт" />
          </RadioGroup>
        </FormControl>
        <FormControl sx={{ mt: 2, width: '100%' }}>
          <TextField label="Прикріпити до існуючого" fullWidth />
        </FormControl>
        {typeUser === 'lead' ? (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1">Створення ліда</Typography>
            <FormControl sx={{ mt: 2, width: '100%' }}>
              <TextField placeholder="ПІБ" fullWidth />
            </FormControl>
            <FormControl sx={{ mt: 2, width: '100%' }}>
              <TextField placeholder="Телефон" fullWidth />
            </FormControl>
          </Box>
        ) : (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1">Створення пацієнта</Typography>
            <FormControl sx={{ mt: 2, width: '100%' }}>
              <TextField placeholder="ПІБ" fullWidth />
            </FormControl>
            <FormControl sx={{ mt: 2, width: '100%' }}>
              <TextField placeholder="Телефон" fullWidth />
            </FormControl>
          </Box>
        )}
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
            Створити
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
