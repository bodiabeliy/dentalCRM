import React from 'react'
import { Box } from '@mui/material'
import { format } from 'date-fns'
import { uk } from 'date-fns/locale'
import type { Event } from '../../types/schedule-types'
import { EventCard } from '../../../calendar/components/event-card'
import { calculateEventPosition, calculateColumnLeft } from '../../../../shared/utils/dateUtils'

interface GridEventProps {
  event: Event
  day: Date
  dayIdx: number
  cIdx: number
  timeColumnWidth: number
  eventColumnWidth: number
  totalHeaderHeight: number
  slotHeight: number
  onEventClick: (event: Event, dayLabel: string) => void
  onEventDoubleClick: (event: Event) => void
  onEventContextMenu: (e: React.MouseEvent, eventId: number) => void
  onTouchStart: (e: React.TouchEvent, eventId?: number, dayIdx?: number, cIdx?: number, time?: string) => void
  onTouchMove: (e: React.TouchEvent) => void
  onTouchEnd: () => void
  onKeyDown: (e: React.KeyboardEvent, eventId?: number, dayIdx?: number, cIdx?: number, time?: string) => void
  onDragStart: (e: React.DragEvent, event: Event) => void
  isDragging?: boolean
  isMobile: boolean
  onDragEnd: (e: React.DragEvent, event: Event) => void
}

export const GridEvent = React.memo(
  ({
    event,
    day,
    dayIdx,
    cIdx,
    timeColumnWidth,
    eventColumnWidth,
    totalHeaderHeight,
    slotHeight,
    onEventClick,
    onEventDoubleClick,
    onEventContextMenu,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onKeyDown,
    onDragStart,
    isDragging,
    isMobile,
    onDragEnd,
  }: GridEventProps) => {
    const columnLeft = calculateColumnLeft(dayIdx, cIdx, timeColumnWidth, eventColumnWidth)
    let eventStart: string = event.start
    let eventEnd: string = event.end
    if (event.type === 'assistant' && event.actual_start && event.actual_end) {
      eventStart = event.actual_start
      eventEnd = event.actual_end
    }
    const { top, height } = calculateEventPosition(eventStart, eventEnd, slotHeight)

    return (
      <Box
        role="gridcell"
        tabIndex={0}
        aria-label={`Event: ${event.id}`}
        sx={{
          position: 'absolute',
          top: top + totalHeaderHeight,
          left: columnLeft,
          height: height,
          width: eventColumnWidth,
          zIndex: isDragging ? 1000 : 0,
          willChange: 'transform',
          transform: 'translateZ(0)',
          opacity: isDragging ? 0.8 : 1,
          pointerEvents: isDragging ? 'none' : 'auto',
        }}
        onContextMenu={(e) => onEventContextMenu(e, event.id)}
        onTouchStart={(e) => onTouchStart(e, event.id)}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onKeyDown={(e) => onKeyDown(e, event.id)}>
        <EventCard
          event={event}
          onClick={() => onEventClick(event, format(day, 'dd.MM, EEEE', { locale: uk }))}
          onDoubleClick={() => onEventDoubleClick(event)}
          onContextMenu={(e) => onEventContextMenu(e, event.id)}
          onTouchStart={(e) => onTouchStart(e, event.id)}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onKeyDown={(e) => onKeyDown(e, event.id)}
          onDragStart={!isMobile ? (e) => onDragStart(e, event) : undefined}
          onDragEnd={!isMobile ? (e) => onDragEnd(e, event) : undefined}
          isDragging={isDragging}
        />
      </Box>
    )
  }
)
