import React from 'react'
import { Box, Typography } from '@mui/material'
import type { Shift } from '../../types/schedule-types'
import { calculateEventPosition, calculateColumnLeft } from '../../../../shared/utils/dateUtils'
import { tintColor } from '../../../../shared/utils/colors'

interface GridShiftProps {
  shift: Shift
  dayIdx: number
  cIdx: number
  timeColumnWidth: number
  eventColumnWidth: number
  totalHeaderHeight: number
  slotHeight: number
  onShiftHeaderContextMenu?: (e: React.MouseEvent, shift: Shift) => void
}

export const GridShift = React.memo(
  ({
    shift,
    dayIdx,
    cIdx,
    timeColumnWidth,
    eventColumnWidth,
    totalHeaderHeight,
    slotHeight,
    onShiftHeaderContextMenu,
  }: GridShiftProps) => {
    const columnLeft = calculateColumnLeft(dayIdx, cIdx, timeColumnWidth, eventColumnWidth)
    const { top, height } = calculateEventPosition(shift.start, shift.end, slotHeight)

    return (
      <Box
        sx={{
          position: 'absolute',
          top: top + totalHeaderHeight,
          left: columnLeft,
          height: height,
          width: eventColumnWidth,
          zIndex: 0,
          border: `1px solid ${shift.doctor.color}`,
          borderRadius: 2,
          opacity: 0.7,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          pointerEvents: 'none',
          backgroundColor: tintColor(shift.doctor.color, 0.9),
        }}>
        <Box
          sx={{
            backgroundColor: shift.doctor.color,
            px: 1,
            textAlign: 'center',
            width: '100%',
            borderTopRightRadius: '8px',
            borderTopLeftRadius: '8px',
            pointerEvents: 'auto',
            cursor: 'context-menu',
          }}
          onContextMenu={(e) => {
            if (onShiftHeaderContextMenu) {
              e.stopPropagation()
              onShiftHeaderContextMenu(e, shift)
            }
          }}>
          <Typography variant="body2" color="#fff">
            {shift.doctor.name}
          </Typography>
        </Box>
        {cIdx === shift.cabinetId && (
          <Box
            sx={{
              position: 'absolute',
              right: -9,
              top: -9,
              width: 18,
              height: 18,
              background: '#7324d5',
              borderRadius: '50%',
              zIndex: 1101,
              border: '2px solid white',
              boxSizing: 'border-box',
              pointerEvents: 'none',
            }}
          />
        )}
      </Box>
    )
  }
)
