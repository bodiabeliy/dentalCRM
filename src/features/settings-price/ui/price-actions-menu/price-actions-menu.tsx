import { Menu, MenuItem } from '@mui/material'
import type { PriceAction } from '../../model/types'

interface PriceActionsMenuProps {
  anchorEl: HTMLElement | null
  open: boolean
  onClose: () => void
  actions: PriceAction[]
}

export function PriceActionsMenu({ anchorEl, open, onClose, actions }: PriceActionsMenuProps) {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
      {actions.map((action) => (
        <MenuItem
          key={action.label}
          onClick={action.onClick}
          sx={{
            color: 'rgba(21, 22, 24, 0.87)',
          }}>
          <action.Icon style={{ fillOpacity: 0.54, marginRight: '8px' }} />
          {action.label}
        </MenuItem>
      ))}
    </Menu>
  )
}
