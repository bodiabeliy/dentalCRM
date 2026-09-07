import { useCallback, useState } from 'react'
import type { MouseEvent } from 'react'
import { Button, Menu, MenuItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { Add, Business } from '@mui/icons-material'
import ClinicIcon from '../../../assets/icons/clinic.svg?react'
import { useTranslation } from 'react-i18next'
import { getCreateClinicRoute } from '../../../types/routes'
import { useNavigate } from 'react-router'
import { useSidebarLayoutContext } from '../../../contexts/sidebar-layout-context'
import type { IClinic } from '../../../../app/providers/types/clinic'
import { useAppSelector } from '../../../../app/providers/store-helpers'
import { clinicSelector } from '../../../../app/providers/reducers/ClinicSlice'

interface ClinicSelectorProps {
  clinics: IClinic[]
  selectedClinic: IClinic
  onClinicSelect: (clinic: IClinic) => void
  disabled?: boolean
}

export const ClinicSelector = ({ clinics, selectedClinic, onClinicSelect, disabled = false }: ClinicSelectorProps) => {
  const { t } = useTranslation(['sidebar'])

  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const { handleDrawerToggle } = useSidebarLayoutContext()
  const currentClinic = useAppSelector(clinicSelector)
  const currentClinicLogo = currentClinic?.logo && `${process.env.STATIC_FILES_URL}${currentClinic.logo}`
  // Removed unused currentUser to avoid unnecessary re-renders

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    if (!disabled) setAnchorEl(event.currentTarget)
  }
  const handleClose = () => setAnchorEl(null)

  const handleClinicSelect = useCallback(
    (clinic: IClinic) => {
      onClinicSelect(clinic)
      handleClose()
    },
    [onClinicSelect]
  )

  const handleCreateClinic = () => {
    handleClose()
    navigate(getCreateClinicRoute())
    handleDrawerToggle()
  }

  return (
    <>
      <Button
        variant="text"
        onClick={clinics.length > 0 ? handleOpen : handleCreateClinic}
        disabled={disabled}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          width: '100%',
          minWidth: 0,
          color: 'white',
          textTransform: 'none',
          px: 2,
          py: 1,
          borderRadius: '8px',
          fontWeight: 500,
          fontSize: '15px',
          bgcolor: 'rgba(255,255,255,0.06)',
          '&:hover': {
            bgcolor: 'rgba(90,103,216,0.15)',
          },
        }}
        startIcon={
          selectedClinic?.name && clinics.length > 0 ? (
            <>
              {currentClinicLogo ? (
                <img
                  src={currentClinicLogo}
                  style={{ width: 30, height: 30, borderRadius: '8px', marginRight: '12px' }}
                />
              ) : (
                <ClinicIcon />
              )}
            </>
          ) : (
            <Add fontSize="small" />
          )
        }>
        {clinics.length ? selectedClinic?.name : t('clinic-selector.create-clinic', { ns: 'sidebar' })}
      </Button>
      {clinics.length > 0 && (
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            sx: {
              bgcolor: '#2c334a',
              color: 'white',
              minWidth: 220,
              boxShadow: 3,
              borderRadius: 2,
              mt: 1,
              p: 0,
            },
          }}
          MenuListProps={{ sx: { p: 0 } }}>
          {clinics?.map((clinic) => (
            <MenuItem
              key={clinic?.id}
              selected={selectedClinic?.id === clinic?.id}
              onClick={() => handleClinicSelect(clinic)}
              sx={{
                bgcolor: selectedClinic?.id === clinic?.id ? '#343b51' : 'transparent',
                '&:hover': { bgcolor: '#343b51' },
                px: 2,
                py: 1.2,
                gap: 1,
              }}>
              <>
                {clinic?.logo ? (
                  <img
                    src={`${process.env.STATIC_FILES_URL}${clinic?.logo}`}
                    style={{ width: 30, height: 30, borderRadius: '8px', marginRight: '12px' }}
                  />
                ) : (
                  <Business fontSize="small" />
                )}
              </>
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      fontWeight: selectedClinic?.id === clinic?.id ? 600 : 400,
                      fontSize: 15,
                      color: 'white',
                    }}>
                    {clinic?.name}
                  </Typography>
                }
              />
            </MenuItem>
          ))}
          <MenuItem
            onClick={handleCreateClinic}
            sx={{
              color: '#9da2fa',
              fontWeight: 500,
              fontSize: 15,
              gap: 1,
              px: 2,
              py: 1.2,
              '&:hover': {
                color: 'white',
                bgcolor: '#343b51',
              },
            }}>
            <ListItemIcon sx={{ minWidth: 32, color: '#9da2fa' }}>
              <Add fontSize="small" />
            </ListItemIcon>
            {t('clinic-selector.create-clinic', { ns: 'sidebar' })}
          </MenuItem>
        </Menu>
      )}
    </>
  )
}
