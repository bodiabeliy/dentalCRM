import { Tab, Tabs, useMediaQuery, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import ProfileIcon from '../../../../shared/assets/icons/settings/profile.svg?react'
import WorkersIcon from '../../../../shared/assets/icons/settings/workers.svg?react'
import ScheduleIcon from '../../../../shared/assets/icons/settings/schedule.svg?react'
import CashIcon from '../../../../shared/assets/icons/settings/cash.svg?react'
import IntegrationsIcon from '../../../../shared/assets/icons/settings/integrations.svg?react'
import SettingsIcon from '../../../../shared/assets/icons/settings/settings.svg?react'
import DictionaryIcon from '../../../../shared/assets/icons/settings/dictionary.svg?react'
import PriceIcon from '../../../../shared/assets/icons/settings/price.svg?react'
import { TabLabel } from '../../../../shared/components/ui/tab-label'

interface SettingsNavigationProps {
  activeTab: number
  onTabChange: (newValue: number) => void
}

export function SettingsNavigation({ activeTab, onTabChange }: SettingsNavigationProps) {
  const theme = useTheme()
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'))
  const { t } = useTranslation(['settings'])

  return (
    <Tabs
      value={activeTab}
      onChange={(_, newValue) => {
        onTabChange(newValue)
      }}
      variant="scrollable"
      orientation={isTablet ? 'horizontal' : 'vertical'}
      sx={{
        '& .MuiTabs-flexContainer': {
          flexDirection: isTablet ? 'row' : 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        },
        '& .MuiTabs-indicator': {
          backgroundColor: '#0029d9',
        },
      }}>
      <Tab
        sx={{
          '&.Mui-selected': {
            color: '#0029d9',
          },
        }}
        label={<TabLabel icon={<ProfileIcon />} label={t('tabs.clinicProfile', { ns: 'settings' })} />}
      />
      <Tab
        sx={{
          '&.Mui-selected': {
            color: '#0029d9',
          },
        }}
        label={<TabLabel icon={<WorkersIcon />} label={t('tabs.workers', { ns: 'settings' })} />}
      />
      <Tab
        sx={{
          '&.Mui-selected': {
            color: '#0029d9',
          },
        }}
        label={<TabLabel icon={<ScheduleIcon />} label={t('tabs.schedule', { ns: 'settings' })} />}
      />
      <Tab
        sx={{
          '&.Mui-selected': {
            color: '#0029d9',
          },
        }}
        label={<TabLabel icon={<PriceIcon />} label={t('tabs.price', { ns: 'settings' })} />}
      />
      <Tab
        sx={{
          '&.Mui-selected': {
            color: '#0029d9',
          },
        }}
        label={<TabLabel icon={<CashIcon />} label={t('tabs.salary', { ns: 'settings' })} />}
      />
      <Tab
        sx={{
          '&.Mui-selected': {
            color: '#0029d9',
          },
        }}
        label={<TabLabel icon={<IntegrationsIcon />} label={t('tabs.integrations', { ns: 'settings' })} />}
      />
      <Tab
        sx={{
          '&.Mui-selected': {
            color: '#0029d9',
          },
        }}
        label={<TabLabel icon={<SettingsIcon />} label={t('tabs.general', { ns: 'settings' })} />}
      />
      <Tab
        sx={{
          '&.Mui-selected': {
            color: '#0029d9',
          },
        }}
        label={<TabLabel icon={<DictionaryIcon />} label={t('tabs.dictionary', { ns: 'settings' })} />}
      />
    </Tabs>
  )
}
