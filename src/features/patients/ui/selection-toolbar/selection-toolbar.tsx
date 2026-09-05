import { Box, Typography, IconButton, Button, Divider, useTheme, useMediaQuery } from '@mui/material'
import { Delete, Edit, Email } from '@mui/icons-material'

interface SelectionToolbarProps {
  selectedCount: number
  onSelectAll: () => void
  onDelete: () => void
  onEdit: () => void
  onSendMessage: () => void
}

export function SelectionToolbar({
  selectedCount,
  onSelectAll,
  onDelete,
  onEdit,
  onSendMessage,
}: SelectionToolbarProps) {
  if (selectedCount === 0) {
    return null
  }

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: isMobile ? 1 : 2,
      }}>
      <Typography
        sx={{
          fontWeight: 500,
          fontSize: '14px',
          lineHeight: '171%',
          letterSpacing: '0.01em',
          color: 'rgba(21, 22, 24, 0.87)',
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
      <Box sx={{ ml: 'auto', display: 'flex', gap: 2 }}>
        <Button
          variant="outlined"
          onClick={onSelectAll}
          sx={{
            borderColor: 'rgba(115, 36, 213, 0.5)',
            color: '#7324d5',
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '14px',
            padding: '4px 10px',
            '&:hover': {
              borderColor: '#7b1fa2',
              backgroundColor: 'rgba(156, 39, 176, 0.04)',
            },
          }}>
          ВИБРАТИ ВСІ
        </Button>
      </Box>
    </Box>
  )
}
