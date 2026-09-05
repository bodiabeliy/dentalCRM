import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material'
import { useState, useMemo } from 'react'
import PlusIcon from '../../../../shared/assets/icons/plus.svg?react'
import type { PricePosition } from '../../../../app/providers/types/pricing'

interface TemplateTableProps {
  positions: PricePosition[]
  searchQuery?: string
  onPositionsReorder?: (reorderedPositions: PricePosition[]) => void
  onTreatmentSelect?: (treatment: PricePosition) => void
}

export function TemplateTable({ positions, searchQuery, onPositionsReorder, onTreatmentSelect }: TemplateTableProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Filter positions for rendering only; keep full array for reorder translations
  const filteredPositions = useMemo(() => {
    if (!searchQuery?.trim()) return positions

    const query = searchQuery.toLowerCase()
    return positions.filter(
      (position) => position.name.toLowerCase().includes(query) || position.id.toLowerCase().includes(query)
    )
  }, [positions, searchQuery])

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = 'move'
    const dragImage = e.currentTarget.cloneNode(true) as HTMLElement
    dragImage.style.opacity = '0.8'
    dragImage.style.transform = 'rotate(5deg)'
    dragImage.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)'
    document.body.appendChild(dragImage)
    e.dataTransfer.setDragImage(dragImage, 0, 0)
    setTimeout(() => document.body.removeChild(dragImage), 0)
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

    // Translate filtered indices to original positions indices using ids
    const draggedId = filteredPositions[draggedIndex]?.id
    const dropId = filteredPositions[dropIndex]?.id
    if (!draggedId || !dropId) {
      setDraggedIndex(null)
      setDragOverIndex(null)
      return
    }

    const from = positions.findIndex((p) => p.id === draggedId)
    const toBase = positions.findIndex((p) => p.id === dropId)
    if (from === -1 || toBase === -1) {
      setDraggedIndex(null)
      setDragOverIndex(null)
      return
    }

    const to = from < toBase ? toBase - 1 : toBase

    const full = Array.from(positions)
    const [item] = full.splice(from, 1)
    full.splice(to, 0, item)

    onPositionsReorder?.(full)

    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  const handleTreatmentClick = (treatment: PricePosition) => {
    onTreatmentSelect?.(treatment)
  }

  return (
    <TableContainer sx={{ boxShadow: 'none', borderRadius: 0, width: '100%' }}>
      <Table
        sx={{
          width: '100%',
          borderCollapse: 'separate',
        }}>
        <TableBody>
          {filteredPositions.map((row, idx) => (
            <TableRow
              key={row.id + idx}
              draggable
              onDragStart={(e) => handleDragStart(e, idx)}
              onDragOver={(e) => handleDragOver(e, idx)}
              onDrop={(e) => handleDrop(e, idx)}
              onDragEnd={handleDragEnd}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleTreatmentClick(row)}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                border: 'none',
                minHeight: 56,
                // backgroundColor: draggedIndex === idx ? '#e3f2fd' : idx % 2 === 0 ? '#fff' : '#f5f7fe',
                opacity: draggedIndex === idx ? 0.9 : 1,
                borderTop:
                  dragOverIndex === idx && draggedIndex !== null && draggedIndex !== idx ? '3px solid #1976d2' : 'none',
                boxShadow: (() => {
                  if (dragOverIndex === idx && draggedIndex !== null && draggedIndex !== idx) {
                    return '0 0 0 4px rgba(25, 118, 210, 0.3), 0 2px 8px rgba(0,0,0,0.1)'
                  } else if (draggedIndex === idx) {
                    return '0 8px 25px rgba(25, 118, 210, 0.3), 0 4px 10px rgba(0,0,0,0.2)'
                  } else if (hoveredIndex === idx) {
                    return '0 2px 8px rgba(0,0,0,0.1)'
                  }
                  return 'none'
                })(),
                transition: 'all 0.2s ease-in-out',
                cursor: draggedIndex === idx ? 'grabbing' : 'pointer',
                '&:hover': {
                  backgroundColor: draggedIndex === idx ? '#e3f2fd' : '#f8f9fa',
                },
                '&:active': {
                  cursor: 'grabbing',
                },
              }}>
              <TableCell
                sx={{
                  p: 0,
                  border: 'none',
                  height: '100%',
                  pl: 2,
                }}>
                <PlusIcon
                  style={{
                    color: draggedIndex === idx ? '#1976d2' : hoveredIndex === idx ? '#666' : '#000',
                    fillOpacity: draggedIndex === idx ? 1 : hoveredIndex === idx ? 0.8 : 0.56,
                    cursor: draggedIndex === idx ? 'grabbing' : 'pointer',
                    transition: 'all 0.2s ease-in-out',
                  }}
                />
              </TableCell>
              <TableCell sx={{ border: 'none', fontSize: 16, p: 0.5 }}>{row.name}</TableCell>
              <TableCell sx={{ border: 'none', fontSize: 16, p: 0.5 }}>{row?.price.toFixed(2)} ₴</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
