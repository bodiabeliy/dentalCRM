import React, { useState } from 'react'
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Checkbox,
  InputLabel,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import ChevronIcon from '../../../../shared/assets/icons/chevron.svg?react'

interface ActDetailsViewProps {
  actNumber: string
}

interface WriteOffItem {
  id: number
  category: string
  warehouse: string
  name: string
  characteristic: string
  quantityInStock: number
  costPrice: number
  quantityToWriteOff: number
  isSelected: boolean
}

export const ActDetailsView: React.FC<ActDetailsViewProps> = ({ actNumber }) => {
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [comment, setComment] = useState('')

  const writeOffItems: WriteOffItem[] = [
    {
      id: 1,
      category: 'Назва',
      warehouse: 'Головний Склад',
      name: 'Назва',
      characteristic: 'Характеристика',
      quantityInStock: 12,
      costPrice: 500,
      quantityToWriteOff: 10,
      isSelected: false,
    },
    {
      id: 2,
      category: 'Назва',
      warehouse: 'Головний Склад',
      name: 'Назва',
      characteristic: 'Характеристика',
      quantityInStock: 12,
      costPrice: 500,
      quantityToWriteOff: 10,
      isSelected: false,
    },
    {
      id: 3,
      category: 'Назва',
      warehouse: 'Головний Склад',
      name: 'Назва',
      characteristic: 'Характеристика',
      quantityInStock: 12,
      costPrice: 500,
      quantityToWriteOff: 10,
      isSelected: false,
    },
  ]

  const totalSum = writeOffItems.reduce((sum, item) => sum + item.costPrice * item.quantityToWriteOff, 0)

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedItems(writeOffItems.map((item) => item.id))
    } else {
      setSelectedItems([])
    }
  }

  const handleSelectItem = (itemId: number) => {
    setSelectedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  return (
    <Box sx={{ width: '100%', bgcolor: '#fff' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          p: 2,
          justifyContent: 'space-between',
        }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              bgcolor: '#0029d9',
              color: '#fff',
              textTransform: 'none',
              fontWeight: 500,
              px: 2,
              py: 1,
              '&:hover': { bgcolor: '#001a9e' },
            }}>
            ДОДАТИ НОВИЙ ТОВАР
          </Button>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Акт</InputLabel>
              <Select label="Акт" value={actNumber}>
                <MenuItem value={actNumber}>{actNumber}</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Button
            variant="outlined"
            sx={{
              borderColor: '#7324d5',
              color: '#7324d5',
              textTransform: 'none',
              fontWeight: 500,
              px: 2,
              py: 1,
              '&:hover': {
                borderColor: '#5a1d9e',
                bgcolor: 'rgba(115, 36, 213, 0.04)',
              },
            }}>
            СПИСАТИ
          </Button>
        </Box>
        <Typography
          variant="body1"
          sx={{
            color: '#0029d9',
          }}>
          ПІБ Автора
        </Typography>
      </Box>
      <Box>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: '#f5f5f5' }}>
              <TableCell sx={{ width: 50, border: 'none', p: 1 }}>
                <Checkbox
                  checked={selectedItems.length === writeOffItems.length}
                  indeterminate={selectedItems.length > 0 && selectedItems.length < writeOffItems.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell sx={{ border: 'none', p: 1, fontSize: 14, fontWeight: 500 }}>№</TableCell>
              <TableCell sx={{ border: 'none', p: 1, fontSize: 14, fontWeight: 500 }}>Категорія</TableCell>
              <TableCell sx={{ border: 'none', p: 1, fontSize: 14, fontWeight: 500 }}>Склад</TableCell>
              <TableCell sx={{ border: 'none', p: 1, fontSize: 14, fontWeight: 500 }}>Назва</TableCell>
              <TableCell sx={{ border: 'none', p: 1, fontSize: 14, fontWeight: 500 }}>Характеристика</TableCell>
              <TableCell sx={{ border: 'none', p: 1, fontSize: 14, fontWeight: 500 }}>К-сть на складі</TableCell>
              <TableCell sx={{ border: 'none', p: 1, fontSize: 14, fontWeight: 500 }}>Собівартість</TableCell>
              <TableCell sx={{ border: 'none', p: 1, fontSize: 14, fontWeight: 500 }}>Кількість до списання</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {writeOffItems.map((item, index) => (
              <TableRow key={item.id} sx={{ bgcolor: index % 2 === 0 ? '#fff' : '#f5f7fe' }}>
                <TableCell sx={{ border: 'none', p: 1 }}>
                  <Checkbox checked={selectedItems.includes(item.id)} onChange={() => handleSelectItem(item.id)} />
                </TableCell>
                <TableCell sx={{ border: 'none', p: 1, fontSize: 16 }}>{item.id}</TableCell>
                <TableCell sx={{ border: 'none', p: 1, fontSize: 16 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        bgcolor: index === 2 ? 'transparent' : '#2e7d32',
                        border: '1px solid #2e7d32',
                      }}
                    />
                    {item.category}
                  </Box>
                </TableCell>
                <TableCell sx={{ border: 'none', p: 1, fontSize: 16 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {item.warehouse}
                    <ChevronIcon style={{ transform: 'rotate(90deg)' }} />
                  </Box>
                </TableCell>
                <TableCell sx={{ border: 'none', p: 1, fontSize: 16 }}>{item.name}</TableCell>
                <TableCell sx={{ border: 'none', p: 1, fontSize: 16 }}>{item.characteristic}</TableCell>
                <TableCell sx={{ border: 'none', p: 1, fontSize: 16 }}>{item.quantityInStock}</TableCell>
                <TableCell sx={{ border: 'none', p: 1, fontSize: 16 }}>{item.costPrice}</TableCell>
                <TableCell sx={{ border: 'none', p: 1, fontSize: 16 }}>{item.quantityToWriteOff}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          backgroundColor: '#f0f0f0',
        }}>
        <TextField
          placeholder="Напишіть свій коментар..."
          variant="outlined"
          size="small"
          sx={{
            minWidth: 300,
            '& .MuiOutlinedInput-root': {
              border: 'none',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
          }}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 500,
          }}>
          Загальна сума: {totalSum.toLocaleString()}.00
        </Typography>
      </Box>
    </Box>
  )
}
