import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Divider,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import FileIcon from '../../../../shared/assets/icons/file.svg?react'
import CalculatorIcon from '../../../../shared/assets/icons/calculator.svg?react'

const warehouses = [{ label: 'Склад', value: 'warehouse1' }]
const nomenclatures = [{ label: 'Номенклатура', value: 'nomenclature1' }]
const characteristicsList = [{ label: 'Характеристика', value: 'characteristic1' }]

interface StockManagementDialogProps {
  open: boolean
  onClose: () => void
  onSave: (data: Record<string, unknown>) => void
}

export function StockManagementDialog({ open, onClose, onSave }: StockManagementDialogProps) {
  const [warehouse, setWarehouse] = useState('warehouse1')
  const [nomenclature, setNomenclature] = useState('nomenclature1')
  const [characteristics, setCharacteristics] = useState(['characteristic1'])
  const [minLimit, setMinLimit] = useState('2000')
  const [planLevel, setPlanLevel] = useState('4000')

  const handleAddCharacteristic = () => {
    setCharacteristics((prev) => [...prev, ''])
  }
  const handleCharacteristicChange = (idx: number, value: string) => {
    setCharacteristics((prev) => prev.map((c, i) => (i === idx ? value : c)))
  }
  const handleSave = () => {
    onSave({ warehouse, nomenclature, characteristics, minLimit, planLevel })
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2, background: '#f4f7fe' }}>
        <FileIcon style={{ color: '#0029d9', marginRight: 8 }} />
        <Typography variant="h6" sx={{ fontWeight: 500, flex: 1 }}>
          Управління запасами
        </Typography>
      </Box>
      <DialogContent sx={{ pb: 0 }}>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Склад</InputLabel>
          <Select value={warehouse} onChange={(e) => setWarehouse(e.target.value)} label="Склад">
            {warehouses.map((w) => (
              <MenuItem key={w.value} value={w.value}>
                {w.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Номенклатура</InputLabel>
          <Select value={nomenclature} onChange={(e) => setNomenclature(e.target.value)} label="Номенклатура">
            {nomenclatures.map((n) => (
              <MenuItem key={n.value} value={n.value}>
                {n.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {characteristics.map((c, idx) => (
          <FormControl fullWidth sx={{ mt: 2 }} key={idx}>
            <InputLabel>Характеристика</InputLabel>
            <Select value={c} onChange={(e) => handleCharacteristicChange(idx, e.target.value)} label="Характеристика">
              {characteristicsList.map((char) => (
                <MenuItem key={char.value} value={char.value}>
                  {char.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ))}
        <Button
          variant="outlined"
          fullWidth
          sx={{ mt: 2, mb: 2, textTransform: 'uppercase', borderColor: '#7324d5', color: '#7324d5' }}
          startIcon={<AddIcon />}
          onClick={handleAddCharacteristic}>
          ДОДАТИ ХАРАКТЕРИСТИКУ
        </Button>
        <Typography variant="body1" sx={{ my: 2 }}>
          Рівень запасу
        </Typography>
        <TextField
          label="Мінімальний ліміт запасу"
          value={minLimit}
          onChange={(e) => setMinLimit(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
          InputProps={{
            endAdornment: <CalculatorIcon style={{ fillOpacity: 0.54, marginLeft: 8 }} />,
          }}
        />
        <TextField
          label="Плановий рівень запасу"
          value={planLevel}
          onChange={(e) => setPlanLevel(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
          InputProps={{ endAdornment: <CalculatorIcon style={{ fillOpacity: 0.54, marginLeft: 8 }} /> }}
        />
      </DialogContent>
      <Divider />
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', px: 3, pb: 3, pt: 2 }}>
        <Button
          variant="outlined"
          sx={{ borderColor: '#0029d9', color: '#0029d9', padding: '12px 22px' }}
          onClick={handleSave}>
          ЗАПИСАТИ
        </Button>
        <Button
          variant="contained"
          sx={{ bgcolor: '#0029d9', color: '#fff', padding: '12px 22px', flex: 1 }}
          onClick={() => {
            handleSave()
            onClose()
          }}>
          ЗАПИСАТИ І ЗАКРИТИ
        </Button>
      </Box>
    </Dialog>
  )
}
