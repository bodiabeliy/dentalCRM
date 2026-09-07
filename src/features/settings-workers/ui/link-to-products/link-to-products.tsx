import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Button,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
  Tooltip,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { useState } from 'react'
import DocumentIcon from '../../../../shared/assets/icons/document.svg?react'

interface ProductItem {
  name: string
  quantity: number
  checked: boolean
}

const PRODUCT_OPTIONS = [
  'Рукавички (1 уп 50 шт)',
  'Платки для коффердама (Sanctuary Dental dam) (36 шт в 1 уп)',
  'Септанест Septanest з адреналіном 1/100 000 (50 шт в 1 уп)',
]

const PRODUCT_PRICE = 256
const PRODUCT_UNIT_PRICE = 5.12

interface LinkToProductsDialogProps {
  open: boolean
  onClose: () => void
  onSave: () => void
}

export function LinkToProductsDialog({ open, onClose, onSave }: LinkToProductsDialogProps) {
  const [items, setItems] = useState<ProductItem[]>([
    { name: PRODUCT_OPTIONS[0], quantity: 1, checked: false },
    { name: PRODUCT_OPTIONS[1], quantity: 1, checked: false },
    { name: PRODUCT_OPTIONS[2], quantity: 1, checked: false },
  ])
  const [autoUpdate, setAutoUpdate] = useState(false)

  const handleAddItem = () => {
    setItems([...items, { name: PRODUCT_OPTIONS[0], quantity: 1, checked: false }])
  }

  const handleRemoveItem = (idx: number) => {
    setItems(items.filter((_, i) => i !== idx))
  }

  const handleChangeName = (idx: number, value: string) => {
    setItems(items?.map((item, i) => (i === idx ? { ...item, name: value } : item)))
  }

  const handleChangeQuantity = (idx: number, delta: number) => {
    setItems(items?.map((item, i) => (i === idx ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item)))
  }

  const handleCheck = (idx: number, checked: boolean) => {
    setItems(items?.map((item, i) => (i === idx ? { ...item, checked } : item)))
  }

  const total = items.length * PRODUCT_PRICE

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2, background: '#f4f7fe' }}>
        <DocumentIcon style={{ color: '#0029d9', marginRight: 8 }} />
        <Typography variant="h6" sx={{ fontWeight: 500, flex: 1 }}>
          Прив'язка до товарів
        </Typography>
      </Box>
      <DialogContent sx={{ pb: 0, background: '#fff' }}>
        <Typography variant="h6">Санітарний мінімум</Typography>
        <Box sx={{ mt: 4 }}>
          {items?.map((item, idx) => (
            <Box
              key={idx}
              sx={{
                mb: 2,
              }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Tooltip title="Списувати автоматично" placement="top">
                  <Checkbox
                    checked={item.checked}
                    onChange={(e) => handleCheck(idx, e.target.checked)}
                    sx={{ mt: 1.5 }}
                  />
                </Tooltip>
                <Box sx={{ flex: 1 }}>
                  <FormControl fullWidth>
                    <InputLabel id={`product-select-label-${idx}`}>Матеріал</InputLabel>
                    <Select
                      labelId={`product-select-label-${idx}`}
                      value={item.name}
                      label="Матеріал"
                      onChange={(e) => handleChangeName(idx, e.target.value as string)}
                      sx={{}}>
                      {PRODUCT_OPTIONS?.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid #e0e7ef',
                    borderRadius: 2,
                    height: '100%',
                    minWidth: 120,
                    p: 1,
                    bgcolor: '#fff',
                    position: 'relative',
                  }}>
                  <Typography
                    variant="caption"
                    sx={{
                      position: 'absolute',
                      top: -18,
                      left: 8,
                      color: '#7a869a',
                      fontSize: 13,
                      background: '#fff',
                      px: 0.5,
                      pointerEvents: 'none',
                    }}>
                    Кількість в шт.
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => handleChangeQuantity(idx, -1)}
                    disabled={item.quantity <= 1}
                    sx={{}}>
                    <RemoveIcon />
                  </IconButton>
                  <Typography
                    sx={{
                      mx: 2,
                      minWidth: 24,
                      textAlign: 'center',
                      fontWeight: 400,
                      fontSize: 18,
                      color: '#151618',
                    }}>
                    {item.quantity}
                  </Typography>
                  <IconButton size="small" onClick={() => handleChangeQuantity(idx, 1)} sx={{}}>
                    <AddIcon />
                  </IconButton>
                </Box>
                <IconButton onClick={() => handleRemoveItem(idx)}>
                  <DeleteIcon sx={{ color: '#000', fillOpacity: 0.56 }} />
                </IconButton>
              </Box>
              <Typography variant="body2" sx={{ mt: 0.5, display: 'block' }}>
                Остання ціна за упаковку{' '}
                <span style={{ color: '#0029d9', cursor: 'pointer' }}>{PRODUCT_PRICE} грн</span>,{' '}
                <span style={{ color: 'rgba(21, 22, 24, 0.6)' }}>за 1 шт {PRODUCT_UNIT_PRICE} грн</span>
              </Typography>
            </Box>
          ))}
        </Box>
        <Button
          variant="outlined"
          fullWidth
          sx={{ borderColor: '#7324d5', color: '#7324d5', mt: 1, mb: 2, textTransform: 'uppercase' }}
          onClick={handleAddItem}>
          + ДОДАТИ ЩЕ ОДИН ПУНКТ
        </Button>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography sx={{ fontWeight: 500, color: '#0029d9' }}>Сума: {total.toLocaleString()} грн</Typography>
          <FormControlLabel
            control={<Checkbox checked={autoUpdate} onChange={(e) => setAutoUpdate(e.target.checked)} />}
            label={<Typography sx={{ fontSize: 15 }}>Автоматично оновлювати собівартість</Typography>}
          />
        </Box>
      </DialogContent>
      <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', px: 3, pb: 3, pt: 1, background: '#fff' }}>
        <Button
          variant="outlined"
          sx={{ borderColor: '#0029d9', color: '#0029d9', padding: '12px 22px' }}
          onClick={onClose}>
          СКАСУВАТИ
        </Button>
        <Button variant="contained" sx={{ bgcolor: '#0029d9', padding: '12px 22px', flex: 1 }} onClick={onSave}>
          ЗБЕРЕГТИ
        </Button>
      </Box>
    </Dialog>
  )
}
