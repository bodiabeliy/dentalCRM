import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  TextField,
  IconButton,
  Button,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputLabel,
  FormControl,
  Divider,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import SettingsIcon from '../../../../shared/assets/icons/settings_general.svg?react'

interface Characteristic {
  value: string
  label: string
}

const measurementUnits = [
  { label: 'Банка', value: 'can' },
  { label: 'Флакон', value: 'flask' },
  { label: 'Ампула', value: 'ampoule' },
  { label: 'Карпула', value: 'cartridge' },
  { label: 'Шприц', value: 'syringe' },
  { label: 'Упаковка', value: 'pack' },
  { label: 'Балон', value: 'canister' },
  { label: 'Банка', value: 'can' },
  { label: 'Без упаковки', value: 'no_pack' },
]

interface NomenclatureDetailsDialogProps {
  open: boolean
  onClose: () => void
  onSave: (data: Record<string, unknown>) => void
  initialData?: Record<string, unknown>
}

export function NomenclatureDetailsDialog({ open, onClose, onSave, initialData }: NomenclatureDetailsDialogProps) {
  const [category, setCategory] = useState(initialData?.category || '')
  const [type, setType] = useState(initialData?.type || 'product')
  const [name, setName] = useState(initialData?.name || '')
  const [unit, setUnit] = useState(initialData?.unit || 'Упаковка')
  const [inPack, setInPack] = useState(initialData?.inPack || '1')
  const [writeOffUnit, setWriteOffUnit] = useState(initialData?.writeOffUnit || 'шт')
  const [characteristics, setCharacteristics] = useState<Characteristic[]>(
    Array.isArray(initialData?.characteristics)
      ? (initialData.characteristics as Characteristic[])
      : [
          { value: '120шт.', label: 'Характеристика' },
          { value: '', label: 'Характеристика' },
        ]
  )

  const handleCharacteristicChange = (idx: number, value: string) => {
    setCharacteristics((prev) => prev.map((c, i) => (i === idx ? { ...c, value } : c)))
  }

  const handleCharacteristicLabelChange = (idx: number, label: string) => {
    setCharacteristics((prev) => prev.map((c, i) => (i === idx ? { ...c, label } : c)))
  }

  const handleAddCharacteristic = () => {
    setCharacteristics((prev) => [...prev, { value: '', label: 'Характеристика' }])
  }

  const handleRemoveCharacteristic = (idx: number) => {
    setCharacteristics((prev) => prev.filter((_, i) => i !== idx))
  }

  const handleSave = () => {
    onSave({
      category,
      type,
      name,
      unit,
      inPack,
      writeOffUnit,
      characteristics,
    })
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2, background: '#f4f7fe' }}>
        <SettingsIcon style={{ color: '#0029d9', marginRight: 8 }} />
        <Typography variant="h6" sx={{ fontWeight: 500, flex: 1 }}>
          Деталі номенклатури
        </Typography>
      </Box>
      <DialogContent sx={{ pb: 0 }}>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Категорія</InputLabel>
          <Select value={category} onChange={(e) => setCategory(e.target.value)} label="Категорія">
            <MenuItem value="Категорія">Категорія</MenuItem>
          </Select>
        </FormControl>
        <RadioGroup row value={type} onChange={(e) => setType(e.target.value)} sx={{ mt: 2 }}>
          <FormControlLabel value="product" control={<Radio />} label="Товар" />
          <FormControlLabel value="service" control={<Radio />} label="Послуга" />
        </RadioGroup>
        <TextField
          label="Назва номенклатури"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          sx={{ mt: 2 }}
        />
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Одиниця обліку</InputLabel>
          <Select value={unit} onChange={(e) => setUnit(e.target.value)} label="Одиниця обліку">
            {measurementUnits.map((unit) => (
              <MenuItem key={unit.value} value={unit.value}>
                {unit.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <TextField label="В упаковці" value={inPack} onChange={(e) => setInPack(e.target.value)} sx={{ flex: 1 }} />
          <FormControl sx={{ flex: 1 }}>
            <InputLabel>Одиниця списання</InputLabel>
            <Select value={writeOffUnit} onChange={(e) => setWriteOffUnit(e.target.value)} label="Одиниця списання">
              <MenuItem value="шт">шт</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {characteristics.map((c, idx) => (
          <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
            <TextField
              value={c.value}
              onChange={(e) => handleCharacteristicChange(idx, e.target.value)}
              placeholder={idx === 0 ? '120шт.' : 'Немає'}
              sx={{ flex: 1 }}
            />
            <TextField
              value={c.label}
              onChange={(e) => handleCharacteristicLabelChange(idx, e.target.value)}
              placeholder="Характеристика"
              sx={{ flex: 2 }}
            />
            <IconButton onClick={() => handleRemoveCharacteristic(idx)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
        <Button
          variant="outlined"
          fullWidth
          sx={{ mt: 2, mb: 2, textTransform: 'uppercase', borderColor: '#7324d5', color: '#7324d5' }}
          startIcon={<AddIcon />}
          onClick={handleAddCharacteristic}>
          ДОДАТИ ЩЕ ОДИН ПУНКТ
        </Button>
      </DialogContent>
      <Divider />
      <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'flex-start', px: 3, pb: 3, pt: 1 }}>
        <IconButton>
          <DeleteIcon sx={{ color: '#000', fillOpacity: 0.56 }} />
        </IconButton>
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
