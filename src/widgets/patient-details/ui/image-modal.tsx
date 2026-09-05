import { useState } from 'react'
import { Dialog, DialogContent, IconButton, Box, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import RotateLeftIcon from '@mui/icons-material/RotateLeft'
import RotateRightIcon from '@mui/icons-material/RotateRight'
import ZoomInIcon from '@mui/icons-material/ZoomIn'
import ZoomOutIcon from '@mui/icons-material/ZoomOut'

interface ImageModalProps {
  open: boolean
  onClose: () => void
  imageSrc: string
}

export function ImageModal({ open, onClose, imageSrc }: ImageModalProps) {
  const [rotation, setRotation] = useState(0)
  const [scale, setScale] = useState(1)

  const handleRotateLeft = () => {
    setRotation((prev) => (prev - 90) % 360)
  }

  const handleRotateRight = () => {
    setRotation((prev) => (prev + 90) % 360)
  }

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.25, 3))
  }

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.25, 0.5))
  }

  const handleReset = () => {
    setRotation(0)
    setScale(1)
  }

  const handleClose = () => {
    handleReset()
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={false}
      fullScreen={true}
      sx={{
        '& .MuiDialog-paper': {
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          margin: 0,
          borderRadius: 0,
          width: '100vw',
          height: '100vh',
          maxWidth: '100vw',
          maxHeight: '100vh',
        },
      }}>
      <DialogContent
        sx={{
          p: 0,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          position: 'relative',
        }}>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)',
          }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              onClick={handleZoomOut}
              sx={{ color: 'white', backgroundColor: 'rgba(255,255,255,0.1)' }}
              size="small">
              <ZoomOutIcon />
            </IconButton>
            <IconButton
              onClick={handleZoomIn}
              sx={{ color: 'white', backgroundColor: 'rgba(255,255,255,0.1)' }}
              size="small">
              <ZoomInIcon />
            </IconButton>
            <IconButton
              onClick={handleRotateLeft}
              sx={{ color: 'white', backgroundColor: 'rgba(255,255,255,0.1)' }}
              size="small">
              <RotateLeftIcon />
            </IconButton>
            <IconButton
              onClick={handleRotateRight}
              sx={{ color: 'white', backgroundColor: 'rgba(255,255,255,0.1)' }}
              size="small">
              <RotateRightIcon />
            </IconButton>
            <IconButton
              onClick={handleClose}
              sx={{ color: 'white', backgroundColor: 'rgba(255,255,255,0.1)' }}
              size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 1,
            pt: 8,
          }}>
          <Box
            sx={{
              position: 'relative',
              maxWidth: '100%',
              maxHeight: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <img
              src={imageSrc}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                transform: `rotate(${rotation}deg) scale(${scale})`,
                transition: 'transform 0.3s ease',
                cursor: 'grab',
              }}
              draggable={false}
            />
          </Box>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            p: 2,
            background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Typography
            sx={{
              color: 'white',
              fontSize: 14,
              opacity: 0.8,
            }}>
            Масштаб: {Math.round(scale * 100)}% | Поворот: {rotation}°
          </Typography>
          <Typography
            sx={{
              color: 'white',
              fontSize: 12,
              opacity: 0.6,
              cursor: 'pointer',
            }}
            onClick={handleReset}>
            Скинути
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
