import {
  Dialog,
  DialogContent,
  Button,
  Box,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Switch,
  IconButton,
  LinearProgress,
} from '@mui/material'
import { useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { uk } from 'date-fns/locale'
import { UniversalDatePicker } from '../../../../shared/components'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import DeleteIcon from '@mui/icons-material/Delete'
import DocumentIcon from '../../../../shared/assets/icons/document.svg?react'

interface SupplierOrderModalProps {
  open: boolean
  onClose: () => void
}

export function SupplierOrderModal({ open, onClose }: SupplierOrderModalProps) {
  const [company, setCompany] = useState('')
  const [prosthesisType, setProsthesisType] = useState('')
  const [impressionType, setImpressionType] = useState('digital')
  const [appointmentDate, setAppointmentDate] = useState<Date | null>(new Date(2024, 9, 29))
  const [implantSystem, setImplantSystem] = useState('')
  const [technicianNotes, setTechnicianNotes] = useState('')
  const [attachPhoto, setAttachPhoto] = useState(true)
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string; progress: number } | null>({
    name: 'document_file_name.svg',
    size: '100kb',
    progress: 75,
  })

  const mockCompanies = [
    { id: '1', name: 'Назва компанії 1' },
    { id: '2', name: 'Назва компанії 2' },
    { id: '3', name: 'Назва компанії 3' },
  ]

  const mockProsthesisTypes = [
    { id: '1', name: 'Коронка' },
    { id: '2', name: 'Міст' },
    { id: '3', name: 'Імплант' },
    { id: '4', name: 'Протез' },
  ]

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile({
        name: file.name,
        size: `${Math.round(file.size / 1024)}kb`,
        progress: 75,
      })
    }
  }

  const handleRemoveFile = () => {
    setUploadedFile(null)
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2, background: '#f4f7fe' }}>
        <DocumentIcon style={{ color: '#0029d9', marginRight: 8 }} />
        <Typography variant="h6" sx={{ fontWeight: 500, flex: 1 }}>
          Замовити в постачальника
        </Typography>
      </Box>
      <DialogContent sx={{ pt: 1 }}>
        <Box display="flex" flexDirection="column" gap={3} mt={1}>
          <FormControl fullWidth>
            <InputLabel>Компанія</InputLabel>
            <Select value={company} label="Компанія" onChange={(e) => setCompany(e.target.value)}>
              {mockCompanies.map((company) => (
                <MenuItem value={company.id} key={company.id}>
                  {company.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Вид протезування</InputLabel>
            <Select value={prosthesisType} label="Вид протезування" onChange={(e) => setProsthesisType(e.target.value)}>
              {mockProsthesisTypes.map((type) => (
                <MenuItem value={type.id} key={type.id}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl component="fieldset">
            <FormLabel component="legend" sx={{ fontWeight: 500, mb: 1 }}>
              Тип відбитку
            </FormLabel>
            <RadioGroup value={impressionType} onChange={(e) => setImpressionType(e.target.value)} row>
              <FormControlLabel value="digital" control={<Radio />} label="Цифровий" />
              <FormControlLabel value="analog" control={<Radio />} label="Аналоговий" />
            </RadioGroup>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={uk}>
            <UniversalDatePicker
              label="Дата призначення пацієнта"
              value={appointmentDate}
              onChange={setAppointmentDate}
              textFieldProps={{ fullWidth: true }}
            />
          </LocalizationProvider>
          <Typography variant="body2" color="text.secondary" sx={{ mt: -2 }}>
            За замовчуванням встановлена орієнтовна дата готовності замовлення. Ви можете змінити її, вказавши дату
            наступного прийому пацієнта. Лабораторія погодить її або запропонує власну.
          </Typography>
          <TextField
            fullWidth
            label="Система імплантів"
            value={implantSystem}
            onChange={(e) => setImplantSystem(e.target.value)}
            placeholder="Система імплантів"
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Вкажіть ваші побажання техніку"
            value={technicianNotes}
            onChange={(e) => setTechnicianNotes(e.target.value)}
            placeholder="Вкажіть ваші побажання техніку"
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: '#f8f9fa',
              },
            }}
          />
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Switch
                checked={attachPhoto}
                onChange={(e) => setAttachPhoto(e.target.checked)}
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    color: '#0029d9',
                  },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: '#0029d9',
                  },
                }}
              />
              <Typography variant="body1">Прикріпити фото</Typography>
            </Box>
            {attachPhoto && (
              <Box>
                {!uploadedFile ? (
                  <Box
                    sx={{
                      border: '2px dashed #ccc',
                      borderRadius: 2,
                      p: 4,
                      textAlign: 'center',
                      bgcolor: '#f8f9fa',
                      cursor: 'pointer',
                      '&:hover': {
                        borderColor: '#0029d9',
                        bgcolor: '#f5f7fe',
                      },
                    }}
                    component="label">
                    <input
                      type="file"
                      accept=".svg,.png,.jpg,.jpeg"
                      style={{ display: 'none' }}
                      onChange={handleFileUpload}
                    />
                    <CloudUploadIcon sx={{ fontSize: 48, color: '#0029d9', mb: 2 }} />
                    <Typography variant="body1" sx={{ color: '#0029d9', fontWeight: 500, mb: 1 }}>
                      Завантажте зі своїх файлів або перетягніть сюди
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      SVG, PNG, JPG (макс. 3MB)
                    </Typography>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      border: '1px solid #e0e0e0',
                      borderRadius: 1,
                      p: 2,
                      bgcolor: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {uploadedFile.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {uploadedFile.size}
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={uploadedFile.progress}
                        sx={{
                          mt: 1,
                          height: 2,
                          '& .MuiLinearProgress-bar': {
                            bgcolor: '#0029d9',
                          },
                        }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        Завантаження
                      </Typography>
                    </Box>
                    <IconButton onClick={handleRemoveFile} size="small">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                )}
              </Box>
            )}
          </Box>
        </Box>
      </DialogContent>
      <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'flex-start', px: 3, pb: 3, pt: 1 }}>
        <Button
          variant="outlined"
          sx={{ borderColor: '#0029d9', color: '#0029d9', padding: '12px 22px' }}
          onClick={onClose}>
          СКАСУВАТИ
        </Button>
        <Button variant="contained" sx={{ bgcolor: '#0029d9', padding: '12px 22px', flex: 1 }} onClick={() => {}}>
          ЗАМОВИТИ
        </Button>
      </Box>
    </Dialog>
  )
}
