import {
  Dialog,
  DialogContent,
  Button,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Checkbox,
  FormControlLabel,
} from '@mui/material'
import { useState } from 'react'
import MessageIcon from '../../../../shared/assets/icons/message.svg?react'

interface SendMessageModalProps {
  open: boolean
  onClose: () => void
  onSend: (data: SendMessageData) => void
}

export interface SendMessageData {
  sendToAll: boolean
  signature: string
  messageText: string
  clientVariables: string
  systemVariables: string
}

export function SendMessageModal({ open, onClose, onSend }: SendMessageModalProps) {
  const [formData, setFormData] = useState<SendMessageData>({
    sendToAll: false,
    signature: 'Без змін',
    messageText: '',
    clientVariables: 'Без змін',
    systemVariables: 'Без змін',
  })

  const handleFieldChange = (field: keyof SendMessageData, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSend = () => {
    onSend(formData)
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2, background: '#f4f7fe', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <MessageIcon style={{ color: '#0029d9', marginRight: 8, height: 24, width: 24 }} />
          <Typography variant="h6" sx={{ fontWeight: 500, flex: 1 }}>
            Надіслати повідомлення
          </Typography>
        </Box>
        <FormControlLabel
          label="Відправити всім"
          labelPlacement="start"
          control={
            <Checkbox
              checked={formData.sendToAll}
              onChange={(e) => handleFieldChange('sendToAll', e.target.checked)}
              sx={{
                color: '#0029d9',
                '&.Mui-checked': {
                  color: '#0029d9',
                },
              }}
            />
          }
        />
      </Box>
      <DialogContent sx={{ px: 3, pb: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Підпис</InputLabel>
            <Select
              value={formData.signature}
              label="Підпис"
              onChange={(e) => handleFieldChange('signature', e.target.value)}>
              <MenuItem value="Без змін">Без змін</MenuItem>
            </Select>
          </FormControl>
          <TextField
            sx={{
              background: '#f0f0f0',
            }}
            fullWidth
            multiline
            rows={2}
            label="Текст повідомлення"
            value={formData.messageText}
            onChange={(e) => handleFieldChange('messageText', e.target.value)}
            placeholder="Введіть текст повідомлення..."
          />
          <FormControl fullWidth>
            <InputLabel>Змінні по клієнту</InputLabel>
            <Select
              value={formData.clientVariables}
              label="Змінні по клієнту"
              onChange={(e) => handleFieldChange('clientVariables', e.target.value)}>
              <MenuItem value="Без змін">Без змін</MenuItem>
              <MenuItem value="Ім'я">Ім'я</MenuItem>
              <MenuItem value="Телефон">Телефон</MenuItem>
              <MenuItem value="Email">Email</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Системні змінні</InputLabel>
            <Select
              value={formData.systemVariables}
              label="Системні змінні"
              onChange={(e) => handleFieldChange('systemVariables', e.target.value)}>
              <MenuItem value="Без змін">Без змін</MenuItem>
              <MenuItem value="Дата">Дата</MenuItem>
              <MenuItem value="Час">Час</MenuItem>
              <MenuItem value="Клініка">Клініка</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'flex-start', px: 3, pb: 3, pt: 1, mt: 2 }}>
        <Button
          variant="outlined"
          sx={{ borderColor: '#0029d9', color: '#0029d9', padding: '12px 22px' }}
          onClick={onClose}>
          СКАСУВАТИ
        </Button>
        <Button variant="contained" sx={{ bgcolor: '#0029d9', padding: '12px 22px', flex: 1 }} onClick={handleSend}>
          ЗБЕРЕГТИ
        </Button>
      </Box>
    </Dialog>
  )
}
