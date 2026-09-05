import React, { useRef, useEffect } from 'react'
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material'
import type { Event } from '../../schedule/types/schedule-types'
import { EVENT_STATUSES } from '../../schedule/constants/schedule-constants'
import { useTranslation } from 'react-i18next'
import { parseTime } from '../../../shared/utils/dateUtils'
import { tintColor } from '../../../shared/utils/colors'
import { PATIENTS_STATUSES, type PatientsStatuses } from '..'
import { Avatar } from '../../../shared/components/ui/avatar'

interface EventCardProps {
  event: Event
  onContextMenu?: (e: React.MouseEvent) => void
  onClick?: (e: React.MouseEvent) => void
  onDoubleClick?: (e: React.MouseEvent) => void
  onTouchStart?: (e: React.TouchEvent) => void
  onTouchMove?: (e: React.TouchEvent) => void
  onTouchEnd?: (e: React.TouchEvent) => void
  onKeyDown?: (e: React.KeyboardEvent) => void
  onDragStart?: (e: React.DragEvent) => void
  onDragEnd?: (e: React.DragEvent) => void
  isDragging?: boolean
}

export const EventCard: React.FC<EventCardProps> = React.memo(
  ({
    event,
    onContextMenu,
    onClick,
    onDoubleClick,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onKeyDown,
    onDragStart,
    onDragEnd,
    isDragging,
  }) => {
    const { patient, doctor, start, end, status, note } = event
    const { t } = useTranslation()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const wasDragged = useRef(false)
    const dragEndTimeout = useRef<number | null>(null)
    const clickTimeoutRef = useRef<number | null>(null)
    const isDoubleClick = useRef(false)

    useEffect(() => {
      return () => {
        if (dragEndTimeout.current) clearTimeout(dragEndTimeout.current)
        if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current)
      }
    }, [])

    const { isShort, statusObj, statusLabel, background, noteBackground } = React.useMemo(() => {
      const duration = parseTime(end) - parseTime(start)
      const isShort = duration <= 30
      const statusObj = EVENT_STATUSES.find((s) => s.value === status.value) || EVENT_STATUSES[0]

      const statusLabel = t(statusObj.value)
      const background = tintColor(event.doctor.color, 0.7)
      const noteBackground = note ? tintColor(event.doctor.color, 0.5) : undefined

      return {
        isShort,
        statusObj,
        statusLabel,
        background,
        noteBackground,
      }
    }, [start, end, note])

    const handleClick = (e: React.MouseEvent) => {
      if (wasDragged.current) {
        e.preventDefault()
        e.stopPropagation()
        wasDragged.current = false
        return
      }

      if (isDoubleClick.current) {
        isDoubleClick.current = false
        return
      }

      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current)
      }

      clickTimeoutRef.current = window.setTimeout(() => {
        if (onClick) {
          onClick(e)
        }
      }, 200)
    }

    const handleDoubleClick = (e: React.MouseEvent) => {
      isDoubleClick.current = true

      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current)
        clickTimeoutRef.current = null
      }

      if (onDoubleClick) {
        e.stopPropagation()
        onDoubleClick(e)
      }
    }

    const handleDragStart = (e: React.DragEvent) => {
      if (isMobile) {
        e.preventDefault()
        return
      }

      wasDragged.current = true
      if (onDragStart) {
        onDragStart(e)
      }
    }

    const handleDragEnd = (e: React.DragEvent) => {
      if (isMobile) {
        e.preventDefault()
        return
      }

      dragEndTimeout.current = window.setTimeout(() => {
        wasDragged.current = false
      }, 0)
      if (onDragEnd) {
        onDragEnd(e)
      }
    }

    if (!patient || !doctor) {
      return null
    }

    return (
      <Box
        role="button"
        tabIndex={0}
        aria-label={`${doctor.name} - ${patient.name} ${start}-${end}`}
        draggable={!isMobile}
        sx={{
          background,
          color: '#000',
          borderRadius: 2,
          boxShadow: '0 2px 8px rgba(44,51,74,0.08)',
          position: 'relative',
          cursor: isMobile ? 'pointer' : isDragging ? 'grabbing' : 'grab',
          height: '100%',
          userSelect: 'none',
          outline: 'none',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          zIndex: isDragging ? 1000 : 5,
          willChange: 'auto',
          transform: 'translateZ(0)',
          contain: 'layout style',
          touchAction: 'manipulation',
          opacity: isDragging ? 0.8 : 1,
        }}
        onClick={handleClick}
        onContextMenu={(e) => {
          if (onContextMenu) {
            e.preventDefault()
            e.stopPropagation()
            onContextMenu(e)
          }
        }}
        onDoubleClick={handleDoubleClick}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onKeyDown={onKeyDown}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}>
        <Box
          sx={{
            p: 1,
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            justifyContent: isShort ? 'center' : 'flex-start',
          }}>
          {isShort ? (
            <Typography sx={{ fontSize: { xs: 12, sm: 13 }, fontWeight: 500, textAlign: 'center' }}>
              {patient.name}
            </Typography>
          ) : (
            <>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1, gap: 1 }}>
                <Box
                  sx={{
                    position: 'relative',
                  }}>
                  <Avatar
                    src={patient.avatar}
                    alt={patient.name}
                    width={{ xs: 32, sm: 40 }}
                    height={{ xs: 32, sm: 40 }}
                    borderRadius="8px"
                    sx={{
                      flexShrink: 0,
                    }}
                  />
                  {event.characteristic && PATIENTS_STATUSES[event.characteristic as PatientsStatuses]?.icon && (
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        position: 'absolute',
                        bottom: -4,
                        right: -7,
                        background: '#fff',
                        borderRadius: '50%',
                        p: '2px',
                      }}>
                      {(() => {
                        const IconComponent = PATIENTS_STATUSES[event.characteristic as PatientsStatuses]?.icon
                        return IconComponent ? <IconComponent style={{ width: 24, height: 24 }} /> : null
                      })()}
                    </Box>
                  )}
                </Box>

                <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Typography
                      sx={{ fontSize: { xs: 11, sm: 12 }, color: 'rgba(21, 22, 24, 0.6)', whiteSpace: 'nowrap' }}>
                      {start} - {end}
                    </Typography>
                    <Box
                      component="span"
                      sx={{
                        background: statusObj.color,
                        color: '#fff',
                        py: '2px',
                        px: 1,
                        borderRadius: 1.5,
                        fontSize: { xs: 10, sm: 12 },
                        flexShrink: 0,
                        ml: 1,
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        maxWidth: { xs: 60, sm: 120 },
                        textAlign: 'center',
                      }}>
                      {statusLabel}
                    </Box>
                  </Box>
                  <Typography noWrap sx={{ fontSize: { xs: 12, sm: 13 }, fontWeight: 500 }}>
                    {patient.name}
                  </Typography>
                </Box>
              </Box>
              {note && (
                <Box
                  sx={{
                    fontSize: { xs: 12, sm: 13 },
                    background: noteBackground,
                    borderRadius: 1.5,
                    p: 0.75,
                    whiteSpace: 'pre-line',
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word',
                  }}>
                  {note}
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>
    )
  }
)
