import { IconButton } from '@mui/material'
import UsersIcon from '../../../shared/assets/icons/users.svg?react'
import BellIcon from '../../../shared/assets/icons/bell.svg?react'
import PencilEditIcon from '../../../shared/assets/icons/pencil_edit.svg?react'

interface PatientDetailsActionsProps {
  onUsersClick?: () => void
  onEditClick?: () => void
  onBellClick?: () => void
}

export function PatientDetailsActions({ onUsersClick, onEditClick, onBellClick }: PatientDetailsActionsProps) {
  return (
    <>
      <IconButton
        onClick={onUsersClick}
        sx={{
          width: 40,
          height: 40,
          bgcolor: '#f5f7fe',
          color: '#8a4bdc',
          borderRadius: '8px',
          border: '1px solid #acb9f3',
        }}>
        <UsersIcon style={{ fontSize: '24px' }} />
      </IconButton>
      <IconButton
        onClick={onEditClick}
        sx={{
          width: 40,
          height: 40,
          bgcolor: '#f5f7fe',
          color: '#8a4bdc',
          borderRadius: '8px',
          border: '1px solid #acb9f3',
        }}>
        <PencilEditIcon style={{ fontSize: '24px' }} />
      </IconButton>
      <IconButton
        onClick={onBellClick}
        sx={{
          width: 40,
          height: 40,
          bgcolor: '#8a4bdc',
          color: 'white',
          borderRadius: '8px',
          '&:hover': {
            bgcolor: 'white',
            color: '#8a4bdc',
            border: '1px solid #8a4bdc',
          },
        }}>
        <BellIcon style={{ fontSize: '24px' }} />
      </IconButton>
    </>
  )
}
