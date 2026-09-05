import {
  Box,
  InputAdornment,
  Tab,
  Tabs,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
  MenuItem,
  Select,
} from '@mui/material'
import { Search } from '@mui/icons-material'
import { CustomDatePicker } from './custom-date-picker'
import { useTranslation } from 'react-i18next'

import EyeIcon from '../../../shared/assets/icons/eye.svg?react'

interface ScheduleHeaderProps {
  selectedDate: Date
  setSelectedDate: (date: Date) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  activeTab: number
  setActiveTab: (tab: number) => void
}

export function ScheduleHeader({
  selectedDate,
  setSelectedDate,
  searchQuery,
  setSearchQuery,
  activeTab,
  setActiveTab,
}: ScheduleHeaderProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { t } = useTranslation()
  return (
    <>
      <Box
        sx={{
          p: { xs: '16px', md: '10px 24px' },
          bgcolor: 'white',
          display: 'flex',
          alignItems: { xs: 'stretch', md: 'center' },
          gap: '16px',
          justifyContent: 'space-between',
        }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: '8px', md: '16px' },
          }}>
          <CustomDatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
          {!isMobile ? (
            <TextField
              placeholder={t('schedule-header.search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Search sx={{ fontSize: 24, color: '#6e6e6e' }} />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: '8px',
                  background: '#fff',
                  fontSize: '1rem',
                  paddingRight: '12px',
                  paddingLeft: '20px',
                  height: '40px',
                  width: { xs: '100%', sm: 'auto' },
                  '& input': {
                    fontSize: '1rem',
                    color: '#444',
                    padding: '16px 0',
                  },
                  '& fieldset': {
                    borderColor: '#bbb',
                    borderWidth: '1px',
                  },
                  '&:hover fieldset': {
                    borderColor: '#bbb',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#bbb',
                  },
                  boxShadow: 'none',
                },
              }}
              inputProps={{
                style: {
                  fontSize: '1rem',
                  color: '#444',
                  padding: '16px 0',
                },
              }}
              sx={{
                width: { xs: '100%', sm: 'auto' },
                minWidth: { sm: '220px' },
                borderRadius: '8px',
                background: '#fff',
                boxShadow: 'none',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  background: '#fff',
                  boxShadow: 'none',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#bbb',
                  borderWidth: '1px',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#bbb',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#bbb',
                },
              }}
            />
          ) : null}
          <Button
            variant="outlined"
            startIcon={<EyeIcon style={{ fontSize: '16px' }} />}
            sx={{
              color: '#7324d5',
              borderColor: '#7324d5',
              fontSize: '12px',
              textTransform: 'none',
              borderRadius: '8px',
              width: { xs: '44px', sm: 'auto' },
              minWidth: { md: '130px', xs: '44px' },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: { xs: '44px', md: '36px' },
              '& .MuiButton-startIcon': {
                marginRight: { xs: '0', md: '8px' },
                marginLeft: { xs: '0', md: '-4px' },
              },
            }}>
            {!isMobile ? t('schedule-header.cancelled-upper') : null}
          </Button>
        </Box>
        {!isMobile ? (
          <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
            variant={isMobile ? 'scrollable' : 'standard'}
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              minHeight: '32px',
              width: { xs: '100%', md: 'auto' },
              '& .MuiTab-root': {
                textTransform: 'none',
                fontSize: '14px',
                color: '#718096',
                minHeight: '32px',
                px: 2,
                '&.Mui-selected': { color: '#0029d9' },
              },
              '& .MuiTabs-indicator': { backgroundColor: '#0029d9', height: '2px' },
            }}>
            <Tab label={t('schedule-header.doctor-and-patients')} />
            <Tab label={t('schedule-header.assistants')} />
            <Tab label={t('schedule-header.admins-and-others')} />
          </Tabs>
        ) : (
          <Select
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value as number)}
            sx={{
              width: { xs: '100%', md: 'auto' },
              height: '44px',
              borderRadius: '8px',
              border: '1px solid #c0c0c0',
            }}>
            <MenuItem value={0}>{t('schedule-header.doctor-and-patients')}</MenuItem>
            <MenuItem value={1}>{t('schedule-header.assistants')}</MenuItem>
            <MenuItem value={2}>{t('schedule-header.admins-and-others')}</MenuItem>
          </Select>
        )}
      </Box>
    </>
  )
}
