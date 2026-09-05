import React from 'react'
import { Box, Typography } from '@mui/material'

interface AssistantEventCardProps {
  assistant: {
    name: string
    surname: string
    scheduledTimeStart: string
    scheduledTimeEnd: string
    actualTimeStart?: string
    actualTimeEnd?: string
  }
}

export const AssistantEventCard: React.FC<AssistantEventCardProps> = ({ assistant }) => {
  const scheduledTime = `${assistant.scheduledTimeStart} - ${assistant.scheduledTimeEnd}`

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
            position: 'relative',
            height: '100%',
            width: '100%',
          }}>
          <Typography
            variant="body2"
            sx={{
              position: 'absolute',
              top: '10px',
              left: '50%',
              outline: 'none',
              userSelect: 'none',
              letterSpacing: '0.01em',
              width: 'max-content',
              transform: 'rotate(90deg) translateY(-50%)',
              transformOrigin: 'top left',
              whiteSpace: 'nowrap',
              backfaceVisibility: 'hidden',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
            }}>
            <span style={{ outline: 'none', userSelect: 'none' }}>{assistant.name}</span>
            <span style={{ outline: 'none', userSelect: 'none' }}>{assistant.surname}</span>
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
