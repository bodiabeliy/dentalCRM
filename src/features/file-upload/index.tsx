import DeleteIcon from '@mui/icons-material/Delete'
import { useRef, useState } from 'react'
import UploadFileIcon from '../../shared/assets/icons/upload-file.svg?react'
import { Box, Typography } from '@mui/material'

export interface FileUploadProps {
  onFileChange?: (file: File | null) => void
}

const FileUpload = ({ onFileChange }: FileUploadProps) => {
  const [file, setFile] = useState<File | null>(null)
  const [progress, setProgress] = useState<number>(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFile = (file: File) => {
    if (!['image/svg+xml', 'image/png', 'image/jpeg'].includes(file.type) || file.size > 3 * 1024 * 1024) {
      return
    }
    setFile(file)
    setProgress(0)
    if (onFileChange) onFileChange(file)

    let prog = 0
    const interval = setInterval(() => {
      prog += 10
      setProgress(Math.min(prog, 100))
      if (prog >= 100) clearInterval(interval)
    }, 50)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleDelete = () => {
    setFile(null)
    setProgress(0)
    if (inputRef.current) inputRef.current.value = ''
    if (onFileChange) onFileChange(null)
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Box
        sx={{
          border: '1px dashed rgba(21, 22, 24, 0.12)',
          borderRadius: 2,
          padding: '24px 16px',
          textAlign: 'center',
          background: isDragging ? '#f5f7ff' : '#fff',
          cursor: 'pointer',
          transition: 'background 0.2s',
        }}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={(e) => {
          e.preventDefault()
          setIsDragging(false)
        }}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}>
        <UploadFileIcon style={{ color: '#0029d9' }} />
        <Typography>
          <span style={{ color: '#0029d9', textDecoration: 'underline', cursor: 'pointer' }}>
            Завантажте зі своїх файлів
          </span>{' '}
          або перетягніть сюди
        </Typography>
        <Typography variant="body2" color="rgba(21, 22, 24, 0.6)" sx={{ mt: 1 }}>
          SVG, PNG, JPG (макс. 3MB) • Рекомендовано: 200x200px
        </Typography>
        <input
          ref={inputRef}
          type="file"
          accept=".svg,.png,.jpg,.jpeg"
          style={{ display: 'none' }}
          onChange={handleInputChange}
        />
      </Box>
      {file && (
        <Box
          sx={{
            mt: 2,
            p: 2,
            borderRadius: 2,
            boxShadow: '0 1px 4px rgba(44,51,74,0.08)',
            background: '#fff',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: 16 }}>{file.name}</Typography>
            <Typography sx={{ fontSize: 12, color: '#0029d9' }}>
              {Math.round(file.size / 1024)}kb • Завантаження
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Box
                sx={{
                  height: 6,
                  borderRadius: 3,
                  background: '#e0e0e0',
                  overflow: 'hidden',
                }}>
                <Box
                  sx={{
                    width: `${progress}%`,
                    height: '100%',
                    background: '#3b5bfd',
                    transition: 'width 0.3s',
                  }}
                />
              </Box>
            </Box>
          </Box>
          <DeleteIcon sx={{ color: '#757575', cursor: 'pointer' }} onClick={handleDelete} />
        </Box>
      )}
    </Box>
  )
}

export default FileUpload
