import { Dialog, DialogContent, Box, Typography, TextField, Button } from '@mui/material'

import ArtIcon from '../../../../shared/assets/icons/art.svg?react'
import FileUpload from '../../../file-upload'

interface WorkExampleDialogProps {
  open: boolean
  onClose: () => void
  onSave: () => void
}

export function WorkExampleDialog({ open, onClose, onSave }: WorkExampleDialogProps) {
  const handleSave = () => {
    onSave()
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2, background: '#f4f7fe' }}>
        <ArtIcon style={{ color: '#0029d9', marginRight: 8 }} />
        <Typography variant="h6" sx={{ fontWeight: 500, flex: 1 }}>
          Приклад роботи
        </Typography>
      </Box>
      <DialogContent sx={{ pb: 0 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2, gap: 2 }}>
          <TextField
            label="Приклад роботи на сайті"
            fullWidth
            sx={{ background: '#fff', borderRadius: 2, flex: 1 }}
            InputLabelProps={{ shrink: true }}
          />
          <FileUpload onFileChange={() => {}} />
          <FileUpload onFileChange={() => {}} />
        </Box>
      </DialogContent>
      <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'flex-start', px: 3, pb: 3, pt: 1, mt: 2 }}>
        <Button
          variant="outlined"
          sx={{ borderColor: '#0029d9', color: '#0029d9', padding: '12px 22px' }}
          onClick={onClose}>
          СКАСУВАТИ
        </Button>
        <Button variant="contained" sx={{ bgcolor: '#0029d9', padding: '12px 22px', flex: 1 }} onClick={handleSave}>
          ЗБЕРЕГТИ
        </Button>
      </Box>
    </Dialog>
  )
}
