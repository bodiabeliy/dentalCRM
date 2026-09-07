import { Box, Typography, IconButton } from '@mui/material'
import PencilEditIcon from '../../../shared/assets/icons/pencil_edit.svg?react'
import ViberIcon from '../../../shared/assets/icons/viber.svg?react'
import TelegramIcon from '../../../shared/assets/icons/telegram.svg?react'
import { ChatFilters } from '../../../features/chat'
import type { Chat } from '../../../entities/chat'
import { Avatar } from '../../../shared/components/ui/avatar'

interface ChatListProps {
  chats: Chat[]
  onChatSelect?: (chat: Chat) => void
}

export function ChatList({ chats, onChatSelect }: ChatListProps) {
  return (
    <Box sx={{ width: '35%', borderRight: '1px solid #e0e0e0', display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          p: 3,
          pb: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Typography variant="h5">Чати</Typography>
        <IconButton
          size="small"
          sx={{ bgcolor: '#f5f7fe', borderRadius: '8px', border: '1px solid rgba(0, 41, 217, 0.3)' }}>
          <PencilEditIcon style={{ color: '#8A4BDC' }} />
        </IconButton>
      </Box>
      <ChatFilters />
      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        {chats?.map((chat) => (
          <Box
            key={chat.id}
            sx={{
              p: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              cursor: 'pointer',
              bgcolor: chat.isActive ? '#ebeefc' : 'transparent',
              borderBottom: '1px solid #f0f0f0',
              '&:hover': {
                bgcolor: chat.isActive ? '#ebeefc' : '#f5f5f5',
              },
            }}
            onClick={() => onChatSelect?.(chat)}>
            <Box sx={{ position: 'relative', flexShrink: 0 }}>
              <Avatar
                src={chat.avatar}
                width={40}
                height={40}
                borderRadius="8px"
                sx={{
                  bgcolor: '#e0e0e0',
                }}
              />
              {chat.viber && (
                <ViberIcon
                  style={{
                    position: 'absolute',
                    bottom: -4,
                    right: -4,
                    zIndex: 10,
                  }}
                />
              )}
              {chat.telegram && (
                <TelegramIcon
                  style={{
                    position: 'absolute',
                    bottom: -4,
                    right: -4,
                    zIndex: 10,
                  }}
                />
              )}
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  color: 'rgba(21, 22, 24, 0.87)',
                  mb: 0.5,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  fontSize: '14px',
                  lineHeight: '20px',
                }}>
                {chat.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(21, 22, 24, 0.6)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  fontSize: '14px',
                  lineHeight: '20px',
                }}>
                {chat.lastMessage}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, flexShrink: 0 }}>
              <Typography
                variant="caption"
                sx={{
                  color: 'rgba(21, 22, 24, 0.6)',
                }}>
                {chat.time}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar width={24} height={24} borderRadius="8px" sx={{ bgcolor: '#e0e0e0' }} />
                <Box sx={{ width: 20, height: 20 }}>
                  {chat.unread > 0 && (
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        bgcolor: '#ef6c00',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '12px',
                        fontWeight: 500,
                        lineHeight: '16px',
                      }}>
                      {chat.unread}
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
