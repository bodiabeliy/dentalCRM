import React from 'react'
import { Box, Typography } from '@mui/material'

interface AdministratorEventCardProps {
  administrator: {
    name: string
    surname: string
    scheduledTimeStart: string
    scheduledTimeEnd: string
    actualTimeStart?: string
    actualTimeEnd?: string
  }
}

export const AdministratorEventCard: React.FC<AdministratorEventCardProps> = ({ administrator }) => {
  const scheduledTime = `${administrator.scheduledTimeStart} - ${administrator.scheduledTimeEnd}`

  return (
    <Box
      sx={{
        position: 'absolute',
        left: 0,
        top: 0,
        height: '100%',
        width: '100%',
        borderRadius: '8px',
        m: 0,
        boxShadow: 1,
        overflow: 'hidden',
        display: 'flex',
        zIndex: 0,
        outline: 'none',
        userSelect: 'none',
      }}>
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          top: 0,
          height: '100%',
          width: '100%',
          bgcolor: '#b5c8c7',
          borderRadius: '8px',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          outline: 'none',
          userSelect: 'none',
        }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#9e9e9e',
            p: 1,
            width: '100%',
            outline: 'none',
            userSelect: 'none',
          }}>
          <Typography
            sx={{
              fontSize: 14,
              lineHeight: '143%',
              letterSpacing: '0.01em',
              color: '#fff',
              outline: 'none',
              userSelect: 'none',
            }}>
            {scheduledTime}
          </Typography>
        </Box>
        <Box
          sx={{
            alignSelf: 'flex-start',
            fontSize: 14,
            lineHeight: '143%',
            color: 'rgba(21, 22, 24, 0.87)',
            width: '100%',
            userSelect: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            writingMode: 'vertical-rl',
            p: 1,
            outline: 'none',
          }}>
          <span style={{ outline: 'none', userSelect: 'none' }}>{administrator.name}</span>
          <span style={{ outline: 'none', userSelect: 'none' }}>{administrator.surname}</span>
        </Box>
      </Box>
    </Box>
  )
}
