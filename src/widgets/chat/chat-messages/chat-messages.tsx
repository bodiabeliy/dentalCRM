import { Box, Typography } from '@mui/material'
import TelegramIcon from '../../../shared/assets/icons/telegram.svg?react'
import ChevronsIcon from '../../../shared/assets/icons/chevrons.svg?react'
import type { Message } from '../../../entities/chat'
import { Avatar } from '../../../shared/components/ui/avatar'

interface ChatMessagesProps {
  messages: Message[]
}

export function ChatMessages({ messages }: ChatMessagesProps) {
  return (
    <Box sx={{ flex: 1, overflowY: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ textAlign: 'center', py: 2 }}>
        <Typography variant="caption" sx={{ color: '#666', bgcolor: '#f5f5f5', px: 2, py: 0.5, borderRadius: '12px' }}>
          Сьогодні
        </Typography>
      </Box>
      {messages.map((message) => (
        <Box
          key={message.id}
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 2,
            justifyContent: message.isIncoming ? 'flex-start' : 'flex-end',
          }}>
          {message.isIncoming && (
            <Box sx={{ position: 'relative' }}>
              <Avatar
                width={40}
                height={40}
                borderRadius="8px"
                sx={{
                  bgcolor: '#e0e0e0',
                  zIndex: 1,
                }}
              />
              <TelegramIcon
                style={{ width: 24, height: 24, position: 'absolute', bottom: -6, right: -6, zIndex: 10 }}
              />
            </Box>
          )}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              gap: 1,
              alignItems: message.isIncoming ? 'flex-start' : 'flex-end',
              maxWidth: '65%',
            }}>
            <Typography
              sx={{
                fontSize: 12,
                lineHeight: '166%',
                letterSpacing: '0.03em',
                color: 'rgba(21, 22, 24, 0.87)',
              }}>
              {message.sender}
            </Typography>
            <Box
              sx={{
                bgcolor: message.isIncoming ? '#f0f2f9' : '#dce1f6',
                borderRadius: message.isIncoming ? '8px' : '18px',
                px: 2,
                py: 1,
                display: 'inline-block',
              }}>
              <Typography sx={{ fontSize: '14px', color: '#333' }}>{message.text}</Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: message.isIncoming ? 'flex-end' : 'flex-start',
                  mt: 0.5,
                  gap: 1,
                }}>
                <Typography variant="body2" sx={{ fontSize: '11px', color: '#666' }}>
                  {message.time}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ChevronsIcon
                    style={{
                      color: message.status === 'read' ? '#0029d9' : '#000',
                      fillOpacity: message.status === 'read' ? '1' : '0.56',
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
          {!message.isIncoming && (
            <Avatar
              width={40}
              height={40}
              borderRadius="8px"
              sx={{
                bgcolor: '#e0e0e0',
              }}
            />
          )}
        </Box>
      ))}
    </Box>
  )
}
