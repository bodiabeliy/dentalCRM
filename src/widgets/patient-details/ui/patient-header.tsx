import { Box, Typography, Tabs, Tab, useTheme, useMediaQuery } from '@mui/material'
import { KeyboardArrowDown as ArrowDownIcon } from '@mui/icons-material'
import type { Patient } from '../../../features/patients/model/types'
import { PatientStatusDropdown } from './patient-status-dropdown'
import { PhoneDropdown } from './phone-dropdown'
import { useState, useRef } from 'react'
import { STATUS_COLORS } from '../../../features/patients/model/constants'
import { Avatar } from '../../../shared/components/ui/avatar'

interface PatientHeaderProps {
  patient: Patient
  tabValue: number
  onTabChange: (event: React.SyntheticEvent, newValue: number) => void
  onStatusChange?: (status: Patient['status']) => void
}

export function PatientHeader({ patient, tabValue, onTabChange, onStatusChange }: PatientHeaderProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))
  const [showStatusDropdown, setShowStatusDropdown] = useState(false)
  const [showPhoneDropdown, setShowPhoneDropdown] = useState(false)
  const statusBarRef = useRef<HTMLDivElement>(null)
  const phoneRef = useRef<HTMLDivElement>(null)
  const phoneRefMobile = useRef<HTMLDivElement>(null)

  const handleStatusBarClick = () => {
    if (onStatusChange) {
      setShowStatusDropdown(!showStatusDropdown)
    }
  }

  const handleStatusChange = (status: Patient['status']) => {
    onStatusChange?.(status)
    setShowStatusDropdown(false)
  }

  const handlePhoneClick = () => {
    setShowPhoneDropdown(!showPhoneDropdown)
  }

  const handleCallHistoryClick = () => {
    onTabChange({} as React.SyntheticEvent, 6)
    setShowPhoneDropdown(false)
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: isMobile ? 'flex-start' : 'flex-end',
          boxShadow:
            '0 2px 3px -1px rgba(0, 0, 0, 0.1), 0 1px 12px 0 rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
          p: isMobile ? 2 : 3,
          pb: isMobile ? 0 : 1,
          pt: 1,
          flexShrink: 0,
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: isMobile ? 'flex-start' : 'space-between',
          position: 'relative',
        }}>
        <Box
          ref={statusBarRef}
          onClick={handleStatusBarClick}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: '8px',
            height: '100%',
            backgroundColor: STATUS_COLORS[patient.status],
            cursor: onStatusChange ? 'pointer' : 'default',
          }}
        />
        <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar
              src={patient.avatar}
              width={74}
              height={74}
              borderRadius="8px"
              sx={{
                fontSize: '24px',
                fontWeight: 500,
                color: 'rgba(21, 22, 24, 0.87)',
              }}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}>
              <Typography variant="body2">
                132 <span style={{ color: '#d32f2f' }}>Алергія на препарат # 5</span>
              </Typography>
              <Typography variant="h6">{patient.name}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 5 }}>
                <Typography variant="body2">29 років</Typography>
                <Box sx={{ flex: 1, display: isMobile ? 'flex' : 'none', flexDirection: 'column' }}>
                  <Box
                    ref={phoneRefMobile}
                    onClick={handlePhoneClick}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      cursor: 'pointer',
                      '&:hover': { opacity: 0.7 },
                    }}>
                    <Typography variant="body2">+380(11)111-11-11</Typography>
                    <ArrowDownIcon sx={{ color: '#666', fontSize: 20 }} />
                  </Box>
                  <Typography variant="body2">Основний номер</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box sx={{ flex: 1, display: isMobile ? 'none' : 'flex', flexDirection: 'column' }}>
            <Box
              ref={phoneRef}
              onClick={handlePhoneClick}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                cursor: 'pointer',
                '&:hover': { opacity: 0.7 },
              }}>
              <Typography variant="body2">+380(11)111-11-11</Typography>
              <ArrowDownIcon sx={{ color: '#666', fontSize: 20 }} />
            </Box>
            <Typography variant="body2">Основний номер</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: isMobile ? '100%' : 'auto',
            maxWidth: isMobile ? '100%' : 'auto',
            overflow: isMobile ? 'hidden' : 'visible',
            mt: isMobile ? 1 : 0,
            display: 'flex',
            justifyContent: 'flex-end',
          }}>
          <Tabs
            value={tabValue}
            onChange={onTabChange}
            variant={isMobile ? 'scrollable' : 'standard'}
            scrollButtons={isMobile ? 'auto' : false}
            allowScrollButtonsMobile={isMobile}
            sx={{
              '& .MuiTabs-scrollButtons': {
                '&.Mui-disabled': { opacity: 0.3 },
              },
            }}>
            <Tab
              label="Документи"
              sx={{ textTransform: 'none', fontWeight: 400, minWidth: isMobile ? 'auto' : undefined }}
            />
            <Tab
              label="Візити"
              sx={{ textTransform: 'none', fontWeight: 400, minWidth: isMobile ? 'auto' : undefined }}
            />
            <Tab
              label="Плани лікування"
              sx={{ textTransform: 'none', fontWeight: 400, minWidth: isMobile ? 'auto' : undefined }}
            />
            <Tab
              label="Історія лікування"
              sx={{ textTransform: 'none', fontWeight: 400, minWidth: isMobile ? 'auto' : undefined }}
            />
            <Tab
              label="Фінанси"
              sx={{ textTransform: 'none', fontWeight: 400, minWidth: isMobile ? 'auto' : undefined }}
            />
            <Tab
              label="Чати"
              sx={{ textTransform: 'none', fontWeight: 400, minWidth: isMobile ? 'auto' : undefined }}
            />
          </Tabs>
        </Box>
      </Box>
      {onStatusChange && showStatusDropdown && statusBarRef.current && (
        <PatientStatusDropdown patient={patient} onStatusChange={handleStatusChange} anchorEl={statusBarRef.current} />
      )}
      {showPhoneDropdown && (isMobile ? phoneRefMobile.current : phoneRef.current) && (
        <PhoneDropdown
          phoneNumbers={[
            { number: '+380(11)111-11-11', label: 'Основний номер' },
            { number: '+380(11)111-11-11', label: 'Другий номер' },
          ]}
          onCallHistoryClick={handleCallHistoryClick}
          anchorEl={isMobile ? phoneRefMobile.current : phoneRef.current}
          onClose={() => setShowPhoneDropdown(false)}
        />
      )}
    </>
  )
}
