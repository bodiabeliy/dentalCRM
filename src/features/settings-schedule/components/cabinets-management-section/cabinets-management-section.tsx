import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  Paper,
  useMediaQuery,
  useTheme,
  IconButton,
} from '@mui/material'
import { useState } from 'react'
import PlusIcon from '../../../../shared/assets/icons/plus.svg?react'

export type Cabinet = {
  id: string
  name: string
  status: 'active'
  createdAt: string
}

interface CabinetsManagementSectionProps {
  cabinets: Cabinet[]
  setCabinets: (cabinets: Cabinet[]) => void
}

const statusMap = {
  active: { label: 'Активний', color: 'success' as const },
}

export function CabinetsManagementSection({ cabinets, setCabinets }: CabinetsManagementSectionProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)

  const handleAddCabinet = () => {
    setCabinets([
      ...cabinets,
      {
        id: Math.random().toString(),
        name: `Кабінет ${cabinets.length + 1}`,
        status: 'active',
        createdAt: '02.07.2025',
      },
    ])
  }

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    setDragOverIndex(index)
  }

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()

    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null)
      setDragOverIndex(null)
      return
    }

    const activeCabinets = cabinets.filter((c) => c.status === 'active')
    const reorderedCabinets = Array.from(activeCabinets)
    const [removed] = reorderedCabinets.splice(draggedIndex, 1)
    reorderedCabinets.splice(dropIndex, 0, removed)

    // Update the cabinets array with the new order
    const inactiveCabinets = cabinets.filter((c) => c.status !== 'active')
    setCabinets([...reorderedCabinets, ...inactiveCabinets])

    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  const activeCabinets = cabinets.filter((c) => c.status === 'active')

  return (
    <Box mb={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Керування кабінетами</Typography>
        {isMobile ? (
          <IconButton
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              background: '#e4e8ff',
              color: 'white',
            }}
            onClick={handleAddCabinet}>
            <PlusIcon style={{ width: 12, height: 12, color: '#0029d9' }} />
          </IconButton>
        ) : null}
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: 'none',
          borderRadius: 2,
          border: '1px solid #E0E0E0',
          mb: 0,
        }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 40, borderBottom: '1px solid #E0E0E0' }}></TableCell>
              <TableCell sx={{ borderBottom: '1px solid #E0E0E0' }}>Кабінет</TableCell>
              <TableCell sx={{ borderBottom: '1px solid #E0E0E0' }}>Статус</TableCell>
              <TableCell sx={{ borderBottom: '1px solid #E0E0E0' }}>Дата створення</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activeCabinets.map((cabinet, index) => (
              <TableRow
                key={cabinet.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
                sx={{
                  backgroundColor: draggedIndex === index ? '#f5f5f5' : 'transparent',
                  '&:hover': {
                    backgroundColor: draggedIndex === index ? '#f5f5f5' : '#fafafa',
                  },
                  transform: draggedIndex === index ? 'rotate(2deg)' : 'none',
                  boxShadow: draggedIndex === index ? '0 5px 10px rgba(0,0,0,0.15)' : 'none',
                  opacity: draggedIndex === index ? 0.5 : 1,
                  borderTop:
                    dragOverIndex === index && draggedIndex !== null && draggedIndex !== index
                      ? '2px solid #1976d2'
                      : 'none',
                }}>
                <TableCell
                  sx={{
                    borderBottom: '1px solid #E0E0E0',
                    color: '#888',
                    width: 40,
                    p: 0,
                    pl: 2,
                    cursor: 'grab',
                    '&:active': { cursor: 'grabbing' },
                    userSelect: 'none',
                    '&:hover': {
                      backgroundColor: '#f0f0f0',
                      borderRadius: '4px',
                    },
                  }}>
                  ⋮⋮
                </TableCell>
                <TableCell sx={{ borderBottom: '1px solid #E0E0E0' }}>{cabinet.name}</TableCell>
                <TableCell sx={{ borderBottom: '1px solid #E0E0E0' }}>
                  <Chip
                    label={statusMap[cabinet.status].label}
                    color={statusMap[cabinet.status].color}
                    size="small"
                    sx={{ fontWeight: 500 }}
                  />
                </TableCell>
                <TableCell sx={{ borderBottom: '1px solid #E0E0E0' }}>{cabinet.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isMobile ? null : (
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button
            variant="outlined"
            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 500 }}
            onClick={handleAddCabinet}>
            + Додати кабінет
          </Button>
        </Box>
      )}
    </Box>
  )
}
