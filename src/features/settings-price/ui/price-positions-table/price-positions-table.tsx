import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  InputBase,
  Typography,
} from '@mui/material'

import DragHandleIcon from '@mui/icons-material/DragHandle'
import SettingsIcon from '../../../../shared/assets/icons/settings_general.svg?react'
import { useState } from 'react'
import type { IPricingItem } from '../../../../app/providers/types/pricing'

interface PricePositionsTableProps {
  positions: IPricingItem[]
  onMenuOpen: (event: React.MouseEvent<HTMLElement>, positionIndex: number) => void
  onPositionsReorder?: (reorderedPositions: IPricingItem[]) => void
  onPositionUpdate?: (index: number, updated: Partial<IPricingItem>) => void
}

export function PricePositionsTable({
  positions,
  onMenuOpen,
  onPositionsReorder,
  onPositionUpdate,
}: PricePositionsTableProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [editingPriceByIndex, setEditingPriceByIndex] = useState<Record<number, string>>({})
  const [editingCostByIndex, setEditingCostByIndex] = useState<Record<number, string>>({})

  const handleFocusMoveCaretToEnd = (e: React.FocusEvent<HTMLElement>) => {
    const element = e.currentTarget
    const selection = window.getSelection()
    if (!selection) return
    const range = document.createRange()
    range.selectNodeContents(element)
    range.collapse(false)
    selection.removeAllRanges()
    selection.addRange(range)
  }

  // Simple reorder helper (same approach as AddRoleDialog)
  const reorder = (list: IPricingItem[], startIndex: number, endIndex: number) => {
    const result = [...list]
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', String(index))
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    setDragOverIndex(index)
  }

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()

    const fromStr = e.dataTransfer.getData('text/plain')
    const from = Number(fromStr)
    if (Number.isNaN(from) || from === dropIndex) {
      setDraggedIndex(null)
      setDragOverIndex(null)
      return
    }

    // If dragging downward, after removing the source the indices shift by -1,
    // so we insert at (dropIndex - 1) to land before the drop target.
    const targetIndex = from < dropIndex ? dropIndex - 1 : dropIndex
    const reorderedPositions = reorder(positions, from, targetIndex)
    onPositionsReorder?.(reorderedPositions)

    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  const handlePriceInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    const length = value.length
    e.currentTarget.setSelectionRange(length, length)
  }

  return (
    <TableContainer sx={{ boxShadow: 'none', borderRadius: 0, width: '100%' }}>
      <Table
        sx={{
          minWidth: 650,
          width: '100%',
          borderCollapse: 'separate',
          borderSpacing: 0,
        }}>
        <TableHead>
          <TableRow sx={{ background: '#f5f5f5' }}>
            <TableCell sx={{ width: 50, p: 0, border: 'none' }} />
            <TableCell sx={{ fontSize: 14, border: 'none', p: 1 }}>ID</TableCell>
            <TableCell sx={{ fontSize: 14, border: 'none', p: 1 }}>Назва позиції</TableCell>
            <TableCell sx={{ fontSize: 14, border: 'none', p: 1 }}>Ціна</TableCell>
            <TableCell sx={{ fontSize: 14, border: 'none', p: 1 }}>Собівартість</TableCell>
            <TableCell align="right" sx={{ border: 'none', p: 1 }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {positions.map((row, idx) => (
            <TableRow
              key={row.id + idx}
              onDragOver={(e) => handleDragOver(e, idx)}
              onDrop={(e) => handleDrop(e, idx)}
              onDragEnd={handleDragEnd}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                border: 'none',
                minHeight: 56,
                backgroundColor: draggedIndex === idx ? '#e3f2fd' : idx % 2 === 0 ? '#fff' : '#f5f7fe',
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
                cursor: draggedIndex === idx ? 'grabbing' : 'grab',
                '&:hover': {
                  backgroundColor: draggedIndex === idx ? '#e3f2fd' : '#f8f9fa',
                },
                '&:active': {
                  cursor: 'grabbing',
                },
              }}>
              <TableCell
                draggable
                onDragStart={(e: React.DragEvent<HTMLSpanElement>) => handleDragStart(e, idx)}
                sx={{
                  p: 0,
                  border: 'none',
                  height: '100%',
                  pl: 2,
                }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    cursor: draggedIndex === idx ? 'grabbing' : 'grab',
                  }}>
                  <DragHandleIcon
                    sx={{
                      color: draggedIndex === idx ? '#1976d2' : hoveredIndex === idx ? '#666' : '#bdbdbd',
                      transition: 'color 0.2s ease-in-out',
                      '&:hover': {
                        color: '#1976d2',
                      },
                    }}
                  />
                </span>
              </TableCell>
              <TableCell
                sx={{
                  border: 'none',
                  fontSize: 16,
                  p: 0.5,
                }}>
                {row.id}
              </TableCell>
              <TableCell
                contentEditable
                suppressContentEditableWarning
                onFocus={handleFocusMoveCaretToEnd}
                onDragStart={(e) => e.preventDefault()}
                onBlur={(e) => {
                  const value = e.currentTarget.textContent ?? ''
                  onPositionUpdate?.(idx, { name: value })
                }}
                sx={{
                  border: 'none',
                  fontSize: 16,
                  p: 0.5,
                  '&:focus': {
                    outline: '2px solid #0029d9',
                    outlineOffset: '2px',
                    borderRadius: '4px',
                    position: 'relative',
                    zIndex: 1,
                  },
                }}>
                {row.name}
              </TableCell>
              <TableCell sx={{ border: 'none', fontSize: 16, p: 0.5 }}>
                <InputBase
                  value={editingPriceByIndex[idx] ?? (row.price || 0).toFixed(2)}
                  type="text"
                  inputProps={{
                    inputMode: 'decimal',
                  }}
                  endAdornment={<span>₴</span>}
                  onFocus={(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                    handlePriceInputFocus(e as unknown as React.FocusEvent<HTMLInputElement>)
                  }}
                  onBlur={(e) => {
                    const raw = e.currentTarget.value.trim()
                    const parsed = parseFloat(raw.replace(',', '.'))
                    if (!Number.isNaN(parsed)) {
                      onPositionUpdate?.(idx, { price: parsed })
                    }
                    setEditingPriceByIndex((prev) => {
                      const copy = { ...prev }
                      delete copy[idx]
                      return copy
                    })
                  }}
                  onChange={(e) => {
                    const raw = e.target.value
                    setEditingPriceByIndex((prev) => ({ ...prev, [idx]: raw }))
                    const parsed = parseFloat(raw.replace(',', '.'))
                    if (!Number.isNaN(parsed)) {
                      onPositionUpdate?.(idx, { price: parsed })
                    }
                  }}
                  sx={{
                    fontSize: 16,
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    color: '#000',
                    width: 100,
                    '& .MuiInputBase-input': {
                      appearance: 'textfield',
                      MozAppearance: 'textfield',
                      WebkitAppearance: 'none',
                    },
                  }}
                />
              </TableCell>
              <TableCell sx={{ border: 'none', fontSize: 16, p: 0.5 }}>
                <InputBase
                  value={editingCostByIndex[idx] ?? (row.cost || 0).toFixed(2)}
                  type="text"
                  inputProps={{
                    inputMode: 'decimal',
                  }}
                  onFocus={(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                    handlePriceInputFocus(e as unknown as React.FocusEvent<HTMLInputElement>)
                  }}
                  endAdornment={<span>₴</span>}
                  onBlur={(e) => {
                    const raw = e.currentTarget.value.trim()
                    const parsed = parseFloat(raw.replace(',', '.'))
                    if (!Number.isNaN(parsed)) {
                      onPositionUpdate?.(idx, { cost: parsed })
                    }
                    setEditingCostByIndex((prev) => {
                      const copy = { ...prev }
                      delete copy[idx]
                      return copy
                    })
                  }}
                  onChange={(e) => {
                    const raw = e.target.value
                    setEditingCostByIndex((prev) => ({ ...prev, [idx]: raw }))
                    const parsed = parseFloat(raw.replace(',', '.'))
                    if (!Number.isNaN(parsed)) {
                      onPositionUpdate?.(idx, { cost: parsed })
                    }
                  }}
                  sx={{
                    fontSize: 16,
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    width: 100,
                    color: '#000',
                    '& .MuiInputBase-input': {
                      appearance: 'textfield',
                      MozAppearance: 'textfield',
                      WebkitAppearance: 'none',
                    },
                  }}
                />
              </TableCell>
              <TableCell align="right" sx={{ border: 'none', p: 0.5 }}>
                <IconButton size="small" onClick={(event) => onMenuOpen(event, idx)}>
                  <SettingsIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* Drop zone at the end for "drop at end" functionality */}
        <TableBody>
          <TableRow
            onDragOver={(e) => handleDragOver(e, positions.length)}
            onDrop={(e) => handleDrop(e, positions.length)}
            sx={{
              height: draggedIndex !== null ? '40px' : '0px',
              borderTop:
                dragOverIndex === positions.length && draggedIndex !== null && draggedIndex !== positions.length
                  ? '3px solid #1976d2'
                  : 'none',
              backgroundColor: dragOverIndex === positions.length ? 'rgba(25, 118, 210, 0.1)' : 'transparent',
              transition: 'all 0.2s ease-in-out',
            }}>
            <TableCell colSpan={6} sx={{ border: 'none', p: 0, textAlign: 'center' }}>
              {draggedIndex !== null && dragOverIndex === positions.length && (
                <Typography variant="caption" color="textSecondary" sx={{ fontSize: 12 }}>
                  Перетягніть сюди, щоб розмістити в кінці
                </Typography>
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
