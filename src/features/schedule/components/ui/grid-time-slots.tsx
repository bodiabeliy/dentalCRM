import React from 'react'
import { Box, Typography } from '@mui/material'
import { HOUR_SLOTS } from '../../constants/schedule-constants'
import { GridCell } from './grid-cell'

interface GridTimeSlotsProps {
  days: Date[]
  cabinets: { id: number; name: string }[]
  slotHeight: number
  isMobile: boolean
  onEmptyCellContextMenu: (e: React.MouseEvent, dayIdx: number, cIdx: number, time: string) => void
  onTouchStart: (e: React.TouchEvent, eventId?: number, dayIdx?: number, cIdx?: number, time?: string) => void
  onTouchMove: (e: React.TouchEvent) => void
  onTouchEnd: () => void
  onKeyDown: (e: React.KeyboardEvent, eventId?: number, dayIdx?: number, cIdx?: number, time?: string) => void
  isDropTarget?: (dayIdx: number, cIdx: number, time: string) => boolean
  onDragOver?: (e: React.DragEvent, dayIdx: number, cIdx: number, time: string) => void
  onDrop?: (e: React.DragEvent, dayIdx: number, cIdx: number, time: string) => void
}

export const GridTimeSlots = React.memo(
  ({
    days,
    cabinets,
    slotHeight,
    isMobile,
    onEmptyCellContextMenu,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onKeyDown,
    isDropTarget,
    onDragOver,
    onDrop,
  }: GridTimeSlotsProps) => {
    return (
      <>
        {HOUR_SLOTS.map((time, timeIndex) => (
          <React.Fragment key={`row-${timeIndex}`}>
            <Box
              sx={{
                border: 'none',
                bgcolor: 'transparent',
                height: `${slotHeight}px`,
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                position: 'sticky',
                left: 0,
                zIndex: 1000,
                background: 'white',
                gridColumn: '1 / 2',
                pointerEvents: 'none',
                userSelect: 'none',
              }}>
              <Typography
                variant="body2"
                sx={{
                  fontSize: isMobile ? '12px' : '13px',
                  color: '#4a5568',
                  fontWeight: 500,
                  pointerEvents: 'none',
                }}>
                {time}
              </Typography>
            </Box>
            {days.map((_, dayIdx) =>
              cabinets.map((cabinet, cIdx) => (
                <GridCell
                  key={`${dayIdx}-${time}-${cabinet.id}`}
                  dayIdx={dayIdx}
                  time={time}
                  cabinet={cabinet}
                  cIdx={cIdx}
                  timeIndex={timeIndex}
                  slotHeight={slotHeight}
                  onEmptyCellContextMenu={onEmptyCellContextMenu}
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                  onKeyDown={onKeyDown}
                  cabinets={cabinets}
                  isDropTarget={isDropTarget?.(dayIdx, cIdx, time)}
                  onDragOver={onDragOver}
                  onDrop={onDrop}
                  isMobile={isMobile}
                />
              ))
            )}
          </React.Fragment>
        ))}
      </>
    )
  }
)
