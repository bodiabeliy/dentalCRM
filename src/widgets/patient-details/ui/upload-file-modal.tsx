import { Dialog, DialogTitle } from '@mui/material'
import { DialogContent } from '@mui/material'
import { Button } from '@mui/material'
import { Box } from '@mui/material'
import FileUpload from '../../../features/file-upload'
import FileUploadIcon from '../../../shared/assets/icons/upload-file.svg?react'

interface UploadFileModalProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

export function UploadFileModal({ open, onClose, onConfirm }: UploadFileModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 0,
          background: '#fff',
          boxShadow: '0 4px 24px rgba(44,51,74,0.12)',
          width: '100%',
        },
      }}>
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          bgcolor: '#eff3ff',
          fontWeight: 500,
          fontSize: 20,
          pb: 1,
        }}>
        <FileUploadIcon style={{ color: '#0029d9', width: 24, height: 24 }} />
        Прикріпити файл
      </DialogTitle>
      <DialogContent sx={{ p: 2 }}>
        <FileUpload onFileChange={() => {}} />
      </DialogContent>
      <Box sx={{ display: 'flex', gap: '8px', mt: 2, p: 2 }}>
        <Button
          variant="outlined"
          sx={{
            padding: '12px 22px',
          }}
          onClick={onClose}>
          скасувати
        </Button>
        <Button
          sx={{
            flex: 1,
            padding: '12px 22px',
          }}
          onClick={onConfirm}
          variant="contained">
          зберегти
        </Button>
      </Box>
    </Dialog>
  )
}
