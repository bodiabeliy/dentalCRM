import { Box, Typography, IconButton, Menu, MenuItem, ListItemText, TextField } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { useState, useRef } from 'react'
import ChevronIcon from '../../../../shared/assets/icons/chevron.svg?react'
import { Avatar } from '../../../../shared/components/ui/avatar'

interface VisitHeaderProps {
  visitNumber: number
  doctorImage: string
  doctorName: string
  onDelete: () => void
  onDoctorSelect?: (doctorId: string) => void
  visitName?: string
  onVisitNameChange?: (name: string) => void
}

const mockEmployees = [
  { id: '1', name: 'Олена Сергіївна', category: 'Всі співробітники' },
  { id: '2', name: 'Ігор Володимирович', category: 'Всі співробітники' },
  { id: '3', name: 'Марія Петрівна', category: 'Адміністратори' },
  { id: '4', name: 'Omar Alexander', category: 'Адміністратори' },
]

export function VisitHeader({
  visitNumber,
  doctorImage,
  onDelete,
  onDoctorSelect,
  visitName,
  onVisitNameChange,
}: VisitHeaderProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedDoctor, setSelectedDoctor] = useState('1') // Default to first doctor
  const avatarRef = useRef<HTMLElement>(null)

  const open = Boolean(anchorEl)

  const handleAvatarClick = () => {
    if (avatarRef.current) {
      setAnchorEl(avatarRef.current)
    }
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleDoctorSelect = (doctorId: string) => {
    setSelectedDoctor(doctorId)
    onDoctorSelect?.(doctorId)
    handleClose()
  }

  const groupedEmployees = mockEmployees.reduce(
    (acc, employee) => {
      if (!acc[employee.category]) {
        acc[employee.category] = []
      }
      acc[employee.category].push(employee)
      return acc
    },
    {} as Record<string, typeof mockEmployees>
  )

  return (
    <Box
      sx={{
        bgcolor: '#f5f7fe',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 1,
        p: { xs: 0.5, sm: 1 },
      }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
        <Box ref={avatarRef}>
          <Avatar
            src={doctorImage}
            alt="doctor"
            width={32}
            height={32}
            style={{
              borderRadius: '8px',
              cursor: 'pointer',
            }}
            onClick={handleAvatarClick}
          />
        </Box>
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: { xs: 12, sm: 14 },
            lineHeight: '150%',
            letterSpacing: '0.01em',
            color: 'rgba(21, 22, 24, 0.87)',
          }}>
          Візит {visitNumber}
        </Typography>
        <TextField
          placeholder="Вкажіть назву візиту"
          value={visitName || ''}
          onChange={(e) => onVisitNameChange?.(e.target.value)}
          variant="standard"
          sx={{
            '& .MuiInput-root': {
              fontWeight: 400,
              fontSize: { xs: 12, sm: 16 },
              lineHeight: '150%',
              letterSpacing: '0.01em',
              color: 'rgba(21, 22, 24, 0.6)',
              '&:before': { borderBottom: 'none' },
              '&:after': { borderBottom: 'none' },
              '&:hover:before': { borderBottom: 'none' },
            },
            '& .MuiInput-input': {
              padding: 0,
              '&::placeholder': {
                color: 'rgba(21, 22, 24, 0.6)',
                opacity: 1,
              },
            },
          }}
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
        <IconButton sx={{ p: 0 }}>
          <ChevronIcon style={{ transform: 'rotate(90deg)', width: 24, height: 24 }} />
        </IconButton>
        <IconButton onClick={onDelete}>
          <Delete />
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            minWidth: 250,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            borderRadius: '8px',
            maxHeight: 300,
            overflow: 'auto',
          },
        }}
        MenuListProps={{ sx: { p: 0 } }}>
        {Object.entries(groupedEmployees)?.map(([category, employees]) => (
          <Box key={category}>
            <MenuItem
              sx={{
                backgroundColor: '#',
                color: '#0029d9',
                fontWeight: 500,
                fontSize: 14,
                py: 1,
                px: 2,
                '&:hover': {
                  backgroundColor: '#f0f4ff',
                },
              }}>
              <ListItemText
                primary={category}
                primaryTypographyProps={{
                  fontWeight: 500,
                  fontSize: 16,
                  lineHeight: '150%',
                  letterSpacing: '0.01em',
                  color: '#0029d9',
                  pl: 2,
                }}
              />
            </MenuItem>
            {employees?.map((employee) => (
              <MenuItem
                key={employee.id}
                onClick={() => handleDoctorSelect(employee.id)}
                selected={selectedDoctor === employee.id}
                sx={{
                  backgroundColor: selectedDoctor === employee.id ? '#f0f4ff' : 'transparent',
                  color: selectedDoctor === employee.id ? '#0029d9' : 'rgba(21, 22, 24, 0.87)',
                  py: 1.5,
                  px: 2,
                  '&:hover': {
                    backgroundColor: '#f8f9fb',
                  },
                }}>
                <ListItemText
                  primary={employee.name}
                  primaryTypographyProps={{
                    fontWeight: selectedDoctor === employee.id ? 500 : 400,
                  }}
                />
              </MenuItem>
            ))}
          </Box>
        ))}
      </Menu>
    </Box>
  )
}
