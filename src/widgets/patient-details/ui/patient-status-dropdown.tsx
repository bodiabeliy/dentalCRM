import { Menu, MenuItem, Typography } from '@mui/material'
import { STATUS_LABELS, STATUS_COLORS } from '../../../features/patients/model/constants'
import type { Patient } from '../../../features/patients/model/types'
import StatusIcon from '../../../shared/assets/icons/status.svg?react'

interface PatientStatusDropdownProps {
  patient: Patient
  onStatusChange: (status: Patient['status']) => void
  anchorEl: HTMLElement
}

export function PatientStatusDropdown({ patient, onStatusChange, anchorEl }: PatientStatusDropdownProps) {
  return (
    <Menu
      anchorEl={anchorEl}
      open={true}
      onClose={() => onStatusChange(patient.status)}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      PaperProps={{
        sx: {
          mt: 1,
          minWidth: 250,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
          borderRadius: 2,
        },
      }}>
      {Object.entries(STATUS_LABELS).map(([status, label]) => (
        <MenuItem
          key={status}
          onClick={() => onStatusChange(status as Patient['status'])}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            py: 1.5,
            px: 2,
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
          }}>
          <StatusIcon
            style={{
              color: STATUS_COLORS[status as keyof typeof STATUS_COLORS],
              width: '16px',
              height: '19px',
            }}
          />
          <Typography variant="body2">{String(label)}</Typography>
        </MenuItem>
      ))}
    </Menu>
  )
}
