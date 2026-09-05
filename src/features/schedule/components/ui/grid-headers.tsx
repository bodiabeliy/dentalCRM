import React from 'react'
import { Box, Typography } from '@mui/material'
import { format } from 'date-fns'
import { uk } from 'date-fns/locale'

interface GridHeadersProps {
  days: Date[]
  cabinets: { id: number; name: string }[]
  dayHeaderHeight: number
  cabinetHeaderHeight: number
  isMobile: boolean
}

export const GridHeaders = React.memo(
  ({ days, cabinets, dayHeaderHeight, cabinetHeaderHeight, isMobile }: GridHeadersProps) => {
    return (
      <>
        <Box
          sx={{
            border: 'none',
            bgcolor: 'transparent',
            height: `${dayHeaderHeight}px`,
            gridColumn: '1 / 2',
            position: 'sticky',
            top: 0,
            left: 0,
            zIndex: 1200,
            background: 'white',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            pl: isMobile ? 1 : 2,
          }}>
          <Typography
            variant="body1"
            sx={{
              fontSize: isMobile ? '13px' : '15px',
              color: '#2d3748',
              pointerEvents: 'none',
            }}>
            {days.length === 1 ? format(days[0], 'dd.MM, EEEE', { locale: uk }) : ''}
          </Typography>
        </Box>
        {days.map((day, dayIdx) => (
          <Box
            key={`day-header-${dayIdx}`}
            sx={{
              gridColumn: `${dayIdx * cabinets.length + 2} / span ${cabinets.length}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              height: `${dayHeaderHeight}px`,
              bgcolor: 'white',
              pl: isMobile ? 1 : 2,
              pointerEvents: 'none',
              position: 'sticky',
              top: 0,
              zIndex: 1000,
            }}>
            <Typography
              variant="body1"
              sx={{
                fontSize: isMobile ? '13px' : '15px',
                color: '#2d3748',
                pointerEvents: 'none',
              }}>
              {format(day, 'dd.MM, EEEE', { locale: uk })}
            </Typography>
          </Box>
        ))}
        <Box
          sx={{
            border: 'none',
            bgcolor: 'transparent',
            height: `${cabinetHeaderHeight}px`,
            gridColumn: '1 / 2',
            position: 'sticky',
            left: 0,
            top: dayHeaderHeight,
            zIndex: 1100,
            background: 'white',
            pointerEvents: 'none',
          }}
        />
        {days.map((_, dayIdx) => {
          return cabinets.map((cabinet, cIdx) => {
            const isLastCabinet = cIdx === cabinets.length - 1
            const isLastDay = dayIdx === days.length - 1
            const isFirstCabinet = cIdx === 0
            return (
              <Box
                key={`cabinet-header-${dayIdx}-${cabinet.id}`}
                sx={{
                  border: 'none',
                  bgcolor: '#e4e8ff',
                  height: `${cabinetHeaderHeight}px`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'sticky',
                  top: dayHeaderHeight,
                  zIndex: 1000,
                  borderTopLeftRadius: isFirstCabinet ? '8px' : '0',
                  borderTopRightRadius: isLastCabinet && isLastDay ? '8px' : '0',
                  borderRight:
                    isLastCabinet && !isLastDay ? '1px solid #7324d5' : !isLastCabinet ? '1px solid #e2e8f0' : 'none',
                  borderBottom: '1px solid #e2e8f0',
                  gridColumn: `${dayIdx * cabinets.length + cIdx + 2} / ${dayIdx * cabinets.length + cIdx + 3}`,
                }}>
                {isLastCabinet && (
                  <Box
                    sx={{
                      position: 'absolute',
                      right: -6,
                      top: -cabinetHeaderHeight + 32,
                      width: 10,
                      height: 10,
                      background: '#7324d5',
                      borderRadius: '50%',
                      zIndex: 2500,
                      border: '2px solid white',
                      boxSizing: 'border-box',
                      pointerEvents: 'none',
                    }}
                  />
                )}
                <Box sx={{ width: '100%' }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: isMobile ? '12px' : '13px',
                      color: '#4a5568',
                      textAlign: 'center',
                    }}>
                    {cabinet.name}
                  </Typography>
                </Box>
              </Box>
            )
          })
        })}
      </>
    )
  }
)
