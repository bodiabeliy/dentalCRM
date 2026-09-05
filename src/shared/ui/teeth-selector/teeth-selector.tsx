import { IconButton, Menu, MenuItem } from '@mui/material'
import { useState } from 'react'
import AddTeethIcon from '../../assets/icons/add-teeth.svg?react'

export const teethOptions = [
  {
    label: 'Без формули',
    value: 'without-formula',
  },
  {
    label: 'Зуб',
    value: 'tooth',
  },

  {
    label: 'Щелепа',
    value: 'jaw',
  },
  {
    label: 'Квадрант',
    value: 'quadrant',
  },
  {
    label: 'Сегмент',
    value: 'segment',
  },
  {
    label: 'Всі зуби',
    value: 'all',
  },
  {
    label: 'Молочний зуб',
    value: 'baby-tooth',
  },
  {
    label: 'Щелепа дитини',
    value: 'baby-jaw',
  },

  {
    label: 'Всі зуби дитини',
    value: 'all-baby-teeth',
  },
]

interface TeethSelectorProps {
  onSelect: (option: string) => void
}

export function TeethSelector({ onSelect }: TeethSelectorProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSelect = (option: string) => {
    onSelect(option)
    handleClose()
  }

  return (
    <>
      <IconButton onClick={handleClick}>
        <AddTeethIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: 3,
            minWidth: 220,
            p: 0,
          },
        }}
        MenuListProps={{ sx: { p: 0 } }}>
        {teethOptions.map((option, idx) => (
          <MenuItem
            key={option.value}
            onClick={() => handleSelect(option.value)}
            sx={{ px: 2, py: 1.2, gap: 1, ...(idx === 6 ? { borderTop: '1px solid #eee' } : {}) }}>
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
