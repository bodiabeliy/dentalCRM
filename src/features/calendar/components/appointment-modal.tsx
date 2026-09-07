/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import { Dialog, Button, MenuItem, Box, Typography, useTheme, useMediaQuery, Menu } from '@mui/material'
import PlaylistAddCheckIcon from '../../../shared/assets/icons/playlistAddCheck.svg?react'
import MessageIcon from '../../../shared/assets/icons/message.svg?react'
import PersonPinIcon from '../../../shared/assets/icons/person-pin.svg?react'
import HistoryIcon from '../../../shared/assets/icons/history.svg?react'
import SavingsIcon from '../../../shared/assets/icons/savings.svg?react'
import ChevronIcon from '../../../shared/assets/icons/chevron.svg?react'
import type { Status } from '../../schedule/types/schedule-types'
import { EVENT_STATUSES } from '../../schedule/constants/schedule-constants'
import StatusIcon from '../../../shared/assets/icons/status.svg?react'
import { useTranslation } from 'react-i18next'
import { Avatar } from '../../../shared/components/ui/avatar'

interface AppointmentModalProps {
  open: boolean
  onClose: () => void
  patient: {
    name: string
    avatar: string
    age: number
    phone: string
  }
  doctor: {
    name: string
  }
  date: string
  time: string
  status: Status
  note?: string
  advance: number
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  open,
  onClose,
  patient,
  doctor,
  // @ts-expect-error TODO: fix this
  date,
  // @ts-expect-error TODO: fix this
  time,
  status,
  note,
  advance,
}) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [currentStatus, setCurrentStatus] = useState<string>(
    () => EVENT_STATUSES.find((s) => s.value === status.value)?.value || EVENT_STATUSES[0].value
  )
  const { t } = useTranslation()

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleStatusChange = (status: string) => {
    setCurrentStatus(status)
    handleMenuClose()
  }

  const statusObj = EVENT_STATUSES.find((s) => s.value === currentStatus)

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          width: '100%',
          maxWidth: isMobile ? '100%' : 550,
          borderRadius: isMobile ? 0 : 2,
          m: 2,
          p: 0,
          background: 'transparent',
          boxShadow: 'none',
          overflow: 'visible',
          height: 'auto',
        },
      }}>
      <Box
        sx={{
          background: '#fff',
          borderRadius: isMobile ? 0 : 2,
          overflow: 'hidden',
          boxShadow: '0 4px 24px rgba(44,51,74,0.12)',
          height: isMobile ? '100%' : 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}>
        <Box
          sx={{
            position: 'relative',
          }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: isMobile ? 1 : 2,
              p: isMobile ? '12px 16px' : '7px 24px',
              background: '#eff3ff',
              justifyContent: 'space-between',
            }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {/* <CameraIcon style={{ width: isMobile ? 20 : 24, height: isMobile ? 20 : 24 }} /> */}
              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    fontSize: isMobile ? 18 : 20,
                    fontWeight: 500,
                    lineHeight: '160%',
                    letterSpacing: '0.01em',
                    color: 'rgba(21, 22, 24, 0.87)',
                  }}>
                  21 Грудня
                </Typography>
                <Typography
                  sx={{
                    fontSize: isMobile ? 13 : 14,
                    color: 'rgba(21, 22, 24, 0.6)',
                    lineHeight: '143%',
                    letterSpacing: '0.01em',
                  }}>
                  Вівторок 12:00 - 13:00
                </Typography>
              </Box>
            </Box>
            <Button
              variant="contained"
              onClick={handleMenuOpen}
              sx={{
                boxShadow:
                  '0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)',
                background: statusObj?.color,
                borderRadius: '8px',
                padding: isMobile ? '8px 12px' : '8px 16px',
                fontSize: isMobile ? 12 : 14,
                height: 32,
                width: 'max-content',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                '&:hover': {
                  background: statusObj?.color,
                },
              }}>
              {statusObj?.value ? t(statusObj.value) : ''}
              <ChevronIcon
                style={{
                  width: isMobile ? 16 : 18,
                  height: isMobile ? 16 : 18,
                  transform: anchorEl ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s',
                }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              MenuListProps={{
                'aria-labelledby': 'status-button',
              }}
              PaperProps={{
                style: {
                  width: 200,
                  boxShadow: '0 4px 24px rgba(44,51,74,0.12)',
                  borderRadius: '8px',
                },
              }}>
              {EVENT_STATUSES?.map((status) => (
                <MenuItem
                  key={status.value}
                  onClick={() => handleStatusChange(status.value)}
                  sx={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 16px' }}>
                  <StatusIcon style={{ color: status.color, width: 20, height: 20 }} />
                  <Typography>{t(status.value)}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: isMobile ? 2 : 3,
              p: isMobile ? '16px' : '24px',
              pb: 0,
              justifyContent: 'space-between',
              alignItems: isMobile ? 'stretch' : 'center',
              flexDirection: isMobile ? 'column' : 'row',
            }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', width: '100%' }}>
              <Avatar
                src={patient.avatar}
                alt={patient.name}
                width={isMobile ? 56 : 62}
                height={isMobile ? 56 : 62}
                borderRadius="8px"
                style={{
                  flexShrink: 0,
                }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: isMobile ? 13 : 14,
                    lineHeight: '143%',
                    letterSpacing: '0.01em',
                    color: 'rgba(21, 22, 24, 0.6)',
                  }}>
                  123
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: isMobile ? 15 : 16,
                    lineHeight: '150%',
                    letterSpacing: '0.01em',
                    color: 'rgba(21, 22, 24, 0.87)',
                  }}>
                  {patient.name}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ width: '100%', textAlign: isMobile ? 'left' : 'right' }}>
              <Box>
                <Typography
                  sx={{
                    fontSize: isMobile ? 13 : 14,
                    fontWeight: 400,
                    lineHeight: '143%',
                    letterSpacing: '0.01em',
                    textAlign: isMobile ? 'left' : 'right',
                    color: 'rgba(21, 22, 24, 0.87)',
                    mb: '8px',
                  }}>
                  29 років <span style={{ color: 'rgba(21, 22, 24, 0.6)' }}>22.06.1995</span>
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: isMobile ? 13 : 14,
                    fontWeight: 400,
                    lineHeight: '143%',
                    letterSpacing: '0.01em',
                    textAlign: isMobile ? 'left' : 'right',
                    color: 'rgba(21, 22, 24, 0.6)',
                  }}>
                  {patient.phone}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ p: isMobile ? '0 16px' : '0 24px', flex: 1 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: isMobile ? 'flex-start' : 'center',
              mt: '8px',
              borderBottom: '1px solid rgba(21, 22, 24, 0.12)',
              pb: '8px',
              flexDirection: isMobile ? 'column' : 'row',
              gap: isMobile ? 1 : 0,
            }}>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: isMobile ? 13 : 14,
                lineHeight: '143%',
                letterSpacing: '0.01em',
                color: 'rgba(21, 22, 24, 0.6)',
              }}>
              Лікар:
              {doctor.name}
            </Typography>
            <Box sx={{ display: 'flex', gap: '4px', alignItems: 'center', color: 'rgba(0, 41, 217, 1)' }}>
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: isMobile ? 15 : 16,
                  lineHeight: '150%',
                  letterSpacing: '0.01em',
                  textAlign: isMobile ? 'left' : 'right',
                  color: '#0029d9',
                }}>
                Аванс:
                {advance.toFixed(2)}
              </Typography>
            </Box>
          </Box>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: isMobile ? 13 : 14,
              lineHeight: '143%',
              letterSpacing: '0.01em',
              color: '#d32f2f',
              marginTop: '4px',
            }}>
            Алегрія на препарат # 5
          </Typography>
          {note && (
            <Box
              sx={{
                fontWeight: 400,
                fontSize: isMobile ? 15 : 16,
                lineHeight: '150%',
                letterSpacing: '0.01em',
                color: 'rgba(21, 22, 24, 0.87)',
                my: '16px',
                background: 'rgba(0, 0, 0, 0.06)',
                borderRadius: '8px',
                p: '8px',
              }}>
              <Typography
                sx={{
                  fontSize: isMobile ? 12 : 13,
                }}>
                {note}
              </Typography>
            </Box>
          )}
        </Box>
        <Box sx={{ p: isMobile ? 2 : 2, mt: 'auto' }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: isMobile ? '8px' : '12px',
              mb: isMobile ? '8px' : '12px',
            }}>
            <Button
              variant="outlined"
              sx={{
                borderColor: 'rgba(0, 0, 255, 0.12)',
                backgroundColor: 'white',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                border: '1px solid rgba(0, 41, 217, 0.5)',
                borderRadius: '8px',
                padding: '6px 16px',
                fontWeight: 500,
                fontSize: isMobile ? 13 : 14,
                lineHeight: '171%',
                letterSpacing: '0.03em',
                textTransform: 'uppercase',
                color: '#0029d9',
                minHeight: isMobile ? 48 : 'auto',
                '&:hover': {
                  borderColor: 'rgb(0, 0, 255)',
                  backgroundColor: 'white',
                },
              }}>
              <PlaylistAddCheckIcon style={{ width: isMobile ? 20 : 24, height: isMobile ? 20 : 24 }} />
              <Typography sx={{ fontSize: isMobile ? 13 : 14, fontWeight: 500 }}>{t('plans')}</Typography>
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: 'rgba(0, 0, 255, 0.12)',
                backgroundColor: 'white',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                border: '1px solid rgba(0, 41, 217, 0.5)',
                borderRadius: '8px',
                padding: '6px 16px',
                fontWeight: 500,
                fontSize: isMobile ? 13 : 14,
                lineHeight: '171%',
                letterSpacing: '0.03em',
                textTransform: 'uppercase',
                color: '#0029d9',
                minHeight: isMobile ? 48 : 'auto',
                '&:hover': {
                  borderColor: 'rgb(0, 0, 255)',
                  backgroundColor: 'white',
                },
              }}>
              <MessageIcon style={{ width: isMobile ? 20 : 24, height: isMobile ? 20 : 24 }} />
              <Typography sx={{ fontSize: isMobile ? 13 : 14, fontWeight: 500 }}>{t('communication')}</Typography>
            </Button>
          </Box>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr 1fr 1fr',
              gap: isMobile ? '8px' : '12px',
            }}>
            <Button
              variant="outlined"
              sx={{
                borderColor: 'rgba(0, 0, 255, 0.12)',
                backgroundColor: 'white',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                border: '1px solid rgba(0, 41, 217, 0.5)',
                borderRadius: '8px',
                padding: '6px 16px',
                fontWeight: 500,
                fontSize: isMobile ? 12 : 14,
                lineHeight: '171%',
                letterSpacing: '0.03em',
                textTransform: 'uppercase',
                color: '#0029d9',
                minHeight: isMobile ? 48 : 'auto',
                '&:hover': {
                  borderColor: 'rgb(0, 0, 255)',
                  backgroundColor: 'white',
                },
              }}>
              <PersonPinIcon style={{ width: isMobile ? 18 : 24, height: isMobile ? 18 : 24 }} />
              <Typography sx={{ fontSize: isMobile ? 12 : 14, fontWeight: 500 }}>{t('visits')}</Typography>
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: 'rgba(0, 0, 255, 0.12)',
                backgroundColor: 'white',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                border: '1px solid rgba(0, 41, 217, 0.5)',
                borderRadius: '8px',
                padding: '6px 16px',
                fontWeight: 500,
                fontSize: isMobile ? 12 : 14,
                lineHeight: '171%',
                letterSpacing: '0.03em',
                textTransform: 'uppercase',
                color: '#0029d9',
                minHeight: isMobile ? 48 : 'auto',
                '&:hover': {
                  borderColor: 'rgb(0, 0, 255)',
                  backgroundColor: 'white',
                },
              }}>
              <HistoryIcon style={{ width: isMobile ? 18 : 24, height: isMobile ? 18 : 24 }} />
              <Typography sx={{ fontSize: isMobile ? 12 : 14, fontWeight: 500 }}>{t('history')}</Typography>
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: 'rgba(0, 0, 255, 0.12)',
                backgroundColor: 'white',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                border: '1px solid rgba(0, 41, 217, 0.5)',
                borderRadius: '8px',
                padding: '6px 16px',
                fontWeight: 500,
                fontSize: isMobile ? 12 : 14,
                lineHeight: '171%',
                letterSpacing: '0.03em',
                textTransform: 'uppercase',
                color: '#0029d9',
                minHeight: isMobile ? 48 : 'auto',
                gridColumn: isMobile ? 'span 2' : 'span 1',
                '&:hover': {
                  borderColor: 'rgb(0, 0, 255)',
                  backgroundColor: 'white',
                },
              }}>
              <SavingsIcon style={{ width: isMobile ? 18 : 24, height: isMobile ? 18 : 24 }} />
              <Typography sx={{ fontSize: isMobile ? 12 : 14, fontWeight: 500 }}>{t('finance')}</Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}
