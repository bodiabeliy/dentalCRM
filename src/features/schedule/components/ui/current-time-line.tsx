import React from 'react'
import { Box, Typography } from '@mui/material'
import { format } from 'date-fns'

interface CurrentTimeLineProps {
  todayIdx: number
  totalHeaderHeight: number
  slotHeight: number
  timeColumnWidth: number
  totalColumns: number
  eventColumnWidth: number
  isMobile: boolean
}

export const CurrentTimeLine = React.memo(
  ({
    todayIdx,
    totalHeaderHeight,
    slotHeight,
    timeColumnWidth,
    totalColumns,
    eventColumnWidth,
    isMobile,
  }: CurrentTimeLineProps) => {
    if (todayIdx === -1) return null

    const now = new Date()
    const minutesSinceStart = now.getHours() * 60 + now.getMinutes()
    const top = totalHeaderHeight + (minutesSinceStart / 60) * slotHeight
    const dotRadius = 5
    const labelHeight = 20

    return (
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1001,
        }}>
        <Typography
          sx={{
            position: 'absolute',
            left: 18,
            top: top - labelHeight / 2,
            color: '#dc5959',
            fontSize: isMobile ? '12px' : '13px',
            fontWeight: 600,
            background: 'white',
            borderRadius: '4px',
            px: 0.5,
            zIndex: 2001,
            pointerEvents: 'none',
            height: `${labelHeight}px`,
            lineHeight: `${labelHeight}px`,
            display: 'inline-block',
            minWidth: '32px',
            textAlign: 'center',
          }}>
          {format(now, 'HH:mm')}
        </Typography>
        <Box
          sx={{
            position: 'absolute',
            left: timeColumnWidth - dotRadius,
            top: top - dotRadius,
            width: 10,
            height: 10,
            background: '#dc5959',
            borderRadius: '50%',
            zIndex: 2001,
            border: '2px solid white',
            boxSizing: 'border-box',
            pointerEvents: 'none',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            left: timeColumnWidth,
            top: top,
            width: totalColumns * eventColumnWidth,
            height: 0,
            zIndex: 1001,
            pointerEvents: 'none',
          }}>
          <Box
            sx={{
              position: 'absolute',
              right: -8,
              top: -5,
              width: 10,
              height: 10,
              background: '#dc5959',
              borderRadius: '50%',
              zIndex: 1002,
              border: '2px solid white',
              boxSizing: 'border-box',
              pointerEvents: 'none',
            }}
          />
          <Box
            sx={{
              borderTop: '1px solid #dc5959',
              width: '100%',
              position: 'absolute',
              left: 0,
              top: 0,
              zIndex: 1001,
            }}
          />
        </Box>
      </Box>
    )
  }
)
