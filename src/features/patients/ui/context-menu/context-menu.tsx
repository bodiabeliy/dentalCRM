import { Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material'
import { Edit, Email, Delete } from '@mui/icons-material'

interface ContextMenuProps {
  mouseX: number | null
  mouseY: number | null
  onClose: () => void
  onSendMessage: () => void
  onDelete: () => void
  onEdit: () => void
}

export function ContextMenu({ mouseX, mouseY, onClose, onSendMessage, onDelete, onEdit }: ContextMenuProps) {
  const open = Boolean(mouseX !== null && mouseY !== null && mouseX > 0 && mouseY > 0)

  const handleSendMessage = () => {
    onSendMessage()
    onClose()
  }

  const handleDelete = () => {
    onDelete()
    onClose()
  }

  const handleEdit = () => {
    onEdit()
    onClose()
  }

  return (
    <Menu
      open={open}
      onClose={onClose}
      anchorReference="anchorPosition"
      anchorPosition={
        mouseY !== null && mouseX !== null && mouseX > 0 && mouseY > 0 ? { top: mouseY, left: mouseX } : undefined
      }
      PaperProps={{
        sx: {
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          minWidth: '200px',
        },
      }}>
      <MenuItem onClick={handleEdit} sx={{ py: 1.5 }}>
        <ListItemIcon>
          <Edit sx={{ fontSize: 20, color: '#666' }} />
        </ListItemIcon>
        <ListItemText
          primary="Редагувати"
          primaryTypographyProps={{
            fontSize: '14px',
            color: '#333',
          }}
        />
      </MenuItem>
      <MenuItem onClick={handleSendMessage} sx={{ py: 1.5 }}>
        <ListItemIcon>
          <Email sx={{ fontSize: 20, color: '#666' }} />
        </ListItemIcon>
        <ListItemText
          primary="Надіслати повідомлення"
          primaryTypographyProps={{
            fontSize: '14px',
            color: '#333',
          }}
        />
      </MenuItem>
      <MenuItem onClick={handleDelete} sx={{ py: 1.5 }}>
        <ListItemIcon>
          <Delete sx={{ fontSize: 20, color: '#d32f2f' }} />
        </ListItemIcon>
        <ListItemText
          primary="Видалити"
          primaryTypographyProps={{
            fontSize: '14px',
            color: '#d32f2f',
          }}
        />
      </MenuItem>
    </Menu>
  )
}
