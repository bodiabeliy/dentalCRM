import { useMemo, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, IconButton, useMediaQuery, useTheme } from '@mui/material'
import { SettingsNavigation } from '../widgets/settings-page/components/settings-navigation'
import { SettingsContent } from '../widgets/settings-page/components/settings-content'
import { SidebarLayout } from '../shared'
import { SettingsNavigationMobile } from '../widgets/settings-page/components/settings-navigation/settings-navigation-mobile'
import MoreVerticalIcon from '../shared/assets/icons/more-vertical.svg?react'
import BellIcon from '../shared/assets/icons/bell.svg?react'
import { useLocation, useNavigate } from 'react-router'
import {
  getClinicSettingsRoute,
  getClinicSettingsProfileRoute,
  getClinicSettingsWorkersRoute,
  getClinicSettingsScheduleRoute,
  getClinicSettingsPriceRoute,
  getClinicSettingsSalaryRoute,
  getClinicSettingsIntegrationsRoute,
  getClinicSettingsGeneralRoute,
  getClinicSettingsDictionaryRoute,
} from '../shared/types/routes'

export function ClinicSettingsPage() {
  const { t } = useTranslation(['settings'])
  const [subtitle, setSubtitle] = useState('')
  const theme = useTheme()

  const isSmallDesktop = useMediaQuery(theme.breakpoints.down('lg'))
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const navigate = useNavigate()
  const location = useLocation()

  const pathToTabIndex = useMemo(() => {
    return new Map<string, number>([
      [getClinicSettingsRoute(), 0],
      [getClinicSettingsProfileRoute(), 0],
      [getClinicSettingsWorkersRoute(), 1],
      [getClinicSettingsScheduleRoute(), 2],
      [getClinicSettingsPriceRoute(), 3],
      [getClinicSettingsSalaryRoute(), 4],
      [getClinicSettingsIntegrationsRoute(), 5],
      [getClinicSettingsGeneralRoute(), 6],
      [getClinicSettingsDictionaryRoute(), 7],
    ])
  }, [])

  const [activeTab, setActiveTab] = useState(0)
  const [activeTabMobile, setActiveTabMobile] = useState<number | null>(null)

  // Sync active tab with URL
  useEffect(() => {
    const pathname = location.pathname
    // On mobile root route, show the mobile navigation list by default
    if (pathname === getClinicSettingsRoute()) {
      setActiveTab(0)
      setActiveTabMobile(isMobile ? null : 0)
      return
    }
    // handle worker edit deep link: /clinic-settings/workers/:id → tab 1
    if (pathname.startsWith('/clinic-settings/workers/')) {
      setActiveTab(1)
      setActiveTabMobile(1)
      return
    }
    for (const [path, index] of pathToTabIndex) {
      if (pathname === path) {
        setActiveTab(index)
        setActiveTabMobile(index)
        return
      }
    }
    // Default to profile
    setActiveTab(0)
    setActiveTabMobile(0)
  }, [location.pathname, pathToTabIndex, isMobile])

  const navigateToTab = (index: number) => {
    const routes = [
      getClinicSettingsProfileRoute(),
      getClinicSettingsWorkersRoute(),
      getClinicSettingsScheduleRoute(),
      getClinicSettingsPriceRoute(),
      getClinicSettingsSalaryRoute(),
      getClinicSettingsIntegrationsRoute(),
      getClinicSettingsGeneralRoute(),
      getClinicSettingsDictionaryRoute(),
    ]
    navigate(routes[index])
  }

  return (
    <SidebarLayout
      title={t('pageTitle', { ns: 'settings' })}
      subtitle={subtitle}
      rightSidebar={
        <>
          <IconButton
            sx={{
              background: '#f5f7fe',
              border: '1px solid rgba(0, 41, 217, 0.3)',
              borderRadius: '8px',
              width: '40px',
              height: '40px',
            }}
            onClick={() => {
              setActiveTabMobile(null)
            }}>
            <MoreVerticalIcon style={{ color: '#8a4bdc' }} />
          </IconButton>
          <IconButton
            sx={{
              background: '#8a4bdc',
              borderRadius: '8px',
              width: '40px',
              height: '40px',
            }}>
            <BellIcon style={{ color: 'white' }} />
          </IconButton>
        </>
      }>
      {isMobile ? (
        <>
          {activeTabMobile === null && (
            <SettingsNavigationMobile
              onTabChange={(idx) => {
                if (idx !== null) {
                  setActiveTabMobile(idx)
                  navigateToTab(idx)
                }
              }}
            />
          )}
          {activeTabMobile !== null ? <SettingsContent activeTab={activeTabMobile} setSubtitle={setSubtitle} /> : null}
        </>
      ) : (
        <Box
          sx={{ display: 'grid', gridTemplateColumns: isSmallDesktop ? '1fr' : '2fr 10fr', gap: '24px', mt: '16px' }}>
          <SettingsNavigation
            activeTab={activeTab}
            onTabChange={(idx) => {
              setActiveTab(idx)
              navigateToTab(idx)
            }}
          />
          <SettingsContent activeTab={activeTab} setSubtitle={setSubtitle} />
        </Box>
      )}
    </SidebarLayout>
  )
}
