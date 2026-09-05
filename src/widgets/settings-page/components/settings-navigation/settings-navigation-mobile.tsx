import { Box, Button } from '@mui/material'
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
  onTabChange: (newValue: number | null) => void
}

export function SettingsNavigationMobile({ onTabChange }: SettingsNavigationProps) {
  const { t } = useTranslation(['settings'])
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        alignItems: 'flex-start',
        p: '16px',
      }}>
      <Button
        variant="text"
        sx={{
          color: 'rgba(21, 22, 24, 0.87)',
        }}
        onClick={() => onTabChange(0)}>
        <TabLabel icon={<ProfileIcon />} label={t('tabs.clinicProfile', { ns: 'settings' })} />
      </Button>
      <Button
        variant="text"
        sx={{
          color: 'rgba(21, 22, 24, 0.87)',
        }}
        onClick={() => onTabChange(1)}>
        <TabLabel icon={<WorkersIcon />} label={t('tabs.workers', { ns: 'settings' })} />
      </Button>
      <Button
        variant="text"
        sx={{
          color: 'rgba(21, 22, 24, 0.87)',
        }}
        onClick={() => onTabChange(2)}>
        <TabLabel icon={<ScheduleIcon />} label={t('tabs.schedule', { ns: 'settings' })} />
      </Button>
      <Button
        variant="text"
        sx={{
          color: 'rgba(21, 22, 24, 0.87)',
        }}
        onClick={() => onTabChange(3)}>
        <TabLabel icon={<PriceIcon />} label={t('tabs.price', { ns: 'settings' })} />
      </Button>
      <Button
        variant="text"
        sx={{
          color: 'rgba(21, 22, 24, 0.87)',
        }}
        onClick={() => onTabChange(4)}>
        <TabLabel icon={<CashIcon />} label={t('tabs.salary', { ns: 'settings' })} />
      </Button>
      <Button
        variant="text"
        sx={{
          color: 'rgba(21, 22, 24, 0.87)',
        }}
        onClick={() => onTabChange(5)}>
        <TabLabel icon={<IntegrationsIcon />} label={t('tabs.integrations', { ns: 'settings' })} />
      </Button>
      <Button
        variant="text"
        sx={{
          color: 'rgba(21, 22, 24, 0.87)',
        }}
        onClick={() => onTabChange(6)}>
        <TabLabel icon={<SettingsIcon />} label={t('tabs.general', { ns: 'settings' })} />
      </Button>
      <Button
        variant="text"
        sx={{
          color: 'rgba(21, 22, 24, 0.87)',
        }}
        onClick={() => onTabChange(7)}>
        <TabLabel icon={<DictionaryIcon />} label={t('tabs.dictionary', { ns: 'settings' })} />
      </Button>
    </Box>
  )
}
