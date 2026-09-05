import React from 'react'
import { Box } from '@mui/material'
import { format } from 'date-fns'
import { uk } from 'date-fns/locale'
import { HOUR_SLOTS } from '../../constants/schedule-constants'

interface GridCellProps {
  dayIdx: number
  time: string
  cabinet: { id: number; name: string }
  cIdx: number
  timeIndex: number
  slotHeight: number
  onEmptyCellContextMenu: (e: React.MouseEvent, dayIdx: number, cIdx: number, time: string) => void
  onTouchStart: (e: React.TouchEvent, eventId?: number, dayIdx?: number, cIdx?: number, time?: string) => void
  onTouchMove: (e: React.TouchEvent) => void
  onTouchEnd: () => void
  onKeyDown: (e: React.KeyboardEvent, eventId?: number, dayIdx?: number, cIdx?: number, time?: string) => void
  cabinets: { id: number; name: string }[]
  isDropTarget?: boolean
  onDragOver?: (e: React.DragEvent, dayIdx: number, cIdx: number, time: string) => void
  onDrop?: (e: React.DragEvent, dayIdx: number, cIdx: number, time: string) => void
  isMobile: boolean
}

export const GridCell = React.memo(
  ({
    dayIdx,
    time,
    cabinet,
    cIdx,
    timeIndex,
    slotHeight,
    onEmptyCellContextMenu,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onKeyDown,
    cabinets,
    isDropTarget,
    onDragOver,
    onDrop,
    isMobile,
  }: GridCellProps) => {
    const isLastRow = timeIndex === HOUR_SLOTS.length - 1
    // Long-press logic
    let longPressTimer: ReturnType<typeof setTimeout> | null = null

    const handleTouchStart = (e: React.TouchEvent) => {
      if (isMobile) {
        longPressTimer = setTimeout(() => {
          const syntheticEvent = {
            ...e,
            preventDefault: () => {},
            stopPropagation: () => {},
            currentTarget: e.currentTarget,
            clientX: e.touches[0]?.clientX || 0,
            clientY: e.touches[0]?.clientY || 0,
          } as unknown as React.MouseEvent
          onEmptyCellContextMenu(syntheticEvent, dayIdx, cIdx, time)
        }, 400)
      }
      if (onTouchStart) onTouchStart(e, undefined, dayIdx, cIdx, time)
    }

    const handleTouchMove = (e: React.TouchEvent) => {
      if (onTouchMove) onTouchMove(e)
    }

    const handleTouchEnd = () => {
      if (longPressTimer) {
        clearTimeout(longPressTimer)
        longPressTimer = null
      }
      if (onTouchEnd) onTouchEnd()
    }

    return (
      <Box
        role="gridcell"
        tabIndex={0}
        aria-label={`${format(new Date(), 'dd.MM, EEEE', { locale: uk })} ${cabinet.name} ${time}`}
        sx={{
          border: 'none',
          borderBottom: isLastRow ? '1px solid #e4e8ff' : 'none',
          borderTop: '1px dashed #b9c5fd',
          height: `${slotHeight}px`,
          position: 'relative',
          cursor: 'pointer',
          backgroundColor: isDropTarget ? '#e3f2fd' : '#f7f8fa',
          '&:hover': { bgcolor: '#f3f6fd' },
          '&:focus': {
            bgcolor: '#f3f6fd',
            outline: '2px solid #1976d2',
            outlineOffset: '-2px',
          },
          borderRight: cIdx === cabinets.length - 1 ? '1px solid #7324d5' : '1px solid #e2e8f0',
          pointerEvents: 'auto',
          willChange: 'auto',
          transform: 'translateZ(0)',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          msUserSelect: 'none',
        }}
        onContextMenu={(e) => onEmptyCellContextMenu(e, dayIdx, cIdx, time)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onKeyDown={(e) => onKeyDown(e, undefined, dayIdx, cIdx, time)}
        onDragOver={!isMobile ? (e) => onDragOver?.(e, dayIdx, cIdx, time) : undefined}
        onDrop={!isMobile ? (e) => onDrop?.(e, dayIdx, cIdx, time) : undefined}
        onClick={(e) => e.currentTarget.blur()}
        onMouseDown={(e) => {
          if (e.button === 0) e.preventDefault()
        }}>
        {!isLastRow && (
          <Box
            sx={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: '50%',
              borderTop: '0',
              borderStyle: 'none',
              zIndex: 1,
              height: 0,
              width: '100%',
              pointerEvents: 'none',
            }}>
            <svg width="100%" height="6" style={{ position: 'absolute', top: '-3px', left: 0 }}>
              <line x1="0" y1="3" x2="100%" y2="3" stroke="#b9c5fd" strokeWidth="1" strokeDasharray="10,8" />
            </svg>
          </Box>
        )}
      </Box>
    )
  }
)
