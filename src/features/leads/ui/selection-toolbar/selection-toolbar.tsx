import { Delete, Edit, Email } from '@mui/icons-material'
import { Box, Typography, Divider, IconButton } from '@mui/material'
// import { Delete, Edit, Email } from '@mui/icons-material'

interface SelectionToolbarProps {
  selectedCount: number
  onSelectAll: () => void
  onDelete: () => void
  onEdit: () => void
  onSendMessage: () => void
}

export function SelectionToolbar({ selectedCount, onDelete, onEdit, onSendMessage }: SelectionToolbarProps) {
  if (selectedCount === 0) {
    return null
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
      }}>
      <Typography
        variant="body2"
        sx={{
          color: '#666',
          fontWeight: 500,
          minWidth: 'fit-content',
        }}>
        Вибрано: {selectedCount}
      </Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <IconButton
          onClick={onDelete}
          size="small"
          sx={{
            color: '#666',
            '&:hover': {
              backgroundColor: 'rgba(211, 47, 47, 0.1)',
              color: '#d32f2f',
            },
          }}>
          <Delete sx={{ fontSize: 20 }} />
        </IconButton>
        <IconButton
          onClick={onEdit}
          size="small"
          sx={{
            color: '#666',
            '&:hover': {
              backgroundColor: 'rgba(0, 41, 217, 0.1)',
              color: '#0029d9',
            },
          }}>
          <Edit sx={{ fontSize: 20 }} />
        </IconButton>
        <IconButton
          onClick={onSendMessage}
          size="small"
          sx={{
            color: '#666',
            '&:hover': {
              backgroundColor: 'rgba(0, 41, 217, 0.1)',
              color: '#0029d9',
            },
          }}>
          <Email sx={{ fontSize: 20 }} />
        </IconButton>
      </Box>
      <Divider orientation="vertical" flexItem />
    </Box>
  )
}
