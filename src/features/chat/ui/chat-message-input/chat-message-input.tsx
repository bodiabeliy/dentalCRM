import { Box, TextField, IconButton } from '@mui/material'
import { AttachFile as AttachFileIcon, Send as SendIcon } from '@mui/icons-material'
import EmojiIcon from '../../../../shared/assets/icons/emoji.svg?react'

interface ChatMessageInputProps {
  onSend?: (message: string) => void
}

// @ts-ignore
export function ChatMessageInput({ onSend }: ChatMessageInputProps) {
  return (
    <Box
      sx={{
        p: 2,
        pb: 3,
        bgcolor: 'white',
        borderTop: '1px solid #f0f0f0',
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          bgcolor: '#f5f5f5',
          borderRadius: '8px',
          px: 2,
          py: 1,
          flex: 1,
        }}>
        <TextField
          placeholder="Введіть повідомлення"
          variant="standard"
          fullWidth
          sx={{
            '& .MuiInput-root': {
              '&:before': { borderBottom: 'none' },
              '&:after': { borderBottom: 'none' },
              '&:hover:not(.Mui-disabled):before': { borderBottom: 'none' },
            },
            '& .MuiInput-input': {
              fontSize: '14px',
              color: '#333',
            },
          }}
        />
        <IconButton size="small" sx={{ color: '#666' }}>
          <AttachFileIcon sx={{ fontSize: 20 }} />
        </IconButton>
        <IconButton size="small" sx={{ color: '#666' }}>
          <EmojiIcon />
        </IconButton>
      </Box>
      <IconButton
        size="small"
        sx={{
          bgcolor: '#0029d9',
          color: 'white',
          width: 36,
          height: 36,
          borderRadius: '8px',
          '&:hover': { bgcolor: '#001f9a' },
        }}>
        <SendIcon sx={{ fontSize: 18 }} />
      </IconButton>
    </Box>
  )
}
