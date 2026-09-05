import { Box, Typography, Button, IconButton } from '@mui/material'
import { MoreVert as MoreVertIcon } from '@mui/icons-material'
import ChevronIcon from '../../../shared/assets/icons/chevron.svg?react'
import UsersIcon from '../../../shared/assets/icons/users.svg?react'
import PlusIcon from '../../../shared/assets/icons/plus.svg?react'
import type { ChatStatus } from '../../../entities/chat'
import { Avatar } from '../../../shared/components/ui/avatar'

interface ChatHeaderProps {
  currentChat: ChatStatus
  onCreateChat?: () => void
  onCloseChat?: () => void
}

export function ChatHeader({ currentChat, onCreateChat, onCloseChat }: ChatHeaderProps) {
  return (
    <Box
      sx={{
        p: 3,
        borderBottom: '1px solid #f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        bgcolor: 'white',
      }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar src={currentChat.avatar} width={74} height={74} borderRadius="8px" sx={{ bgcolor: '#e0e0e0' }} />
        <Box>
          <Typography variant="h6">{currentChat.name}</Typography>
          <Typography variant="body2" sx={{ color: 'rgba(21, 22, 24, 0.6)', display: 'block' }}>
            {currentChat.id}
          </Typography>
          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {currentChat.phone}
            <ChevronIcon style={{ width: 16, height: 16, transform: 'rotate(90deg)' }} />
            <span style={{ color: 'rgba(21, 22, 24, 0.6)' }}>Основний номер</span>
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Button
          variant="outlined"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            color: '#0029d9',
            textTransform: 'none',
            borderRadius: '8px',
          }}
          onClick={onCreateChat}>
          <UsersIcon style={{ width: 16, height: 16 }} />
          СТВОРИТИ
        </Button>
        <Button
          sx={{
            color: '#7324d5',
            textTransform: 'none',
            borderRadius: '8px',
            border: '1px solid #7324d5',
          }}
          onClick={onCloseChat}>
          ЗАКРИТИ
        </Button>
        <Button
          variant="contained"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            textTransform: 'none',
            borderRadius: '8px',
          }}
          startIcon={<PlusIcon style={{ width: 16, height: 16 }} />}>
          ВЗЯТИ В РОБОТУ
        </Button>
        <IconButton
          size="small"
          sx={{ bgcolor: '#f5f7fe', borderRadius: '8px', border: '1px solid rgba(0, 41, 217, 0.3)' }}>
          <MoreVertIcon style={{ color: '#8a4bdc' }} />
        </IconButton>
      </Box>
    </Box>
  )
}
