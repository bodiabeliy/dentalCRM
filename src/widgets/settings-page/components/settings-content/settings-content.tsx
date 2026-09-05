import { TabPanel } from '../../../../shared/components/ui/tab-panel'
import { ClinicProfileForm } from '../../../../features/settings-profile'
import { StuffsManagement } from '../../../../features/settings-workers'
import { ScheduleSettings } from '../../../../features/settings-schedule'
import { SalarySettings } from '../../../../features/settings-salary'
import { IntegrationsSettings } from '../../../../features/settings-integrations'
import { GeneralSettings } from '../../../../features/settings-general'
import { DictionarySettings } from '../../../../features/settings-dictionary'
import { PriceSettings } from '../../../../features/settings-price'

interface SettingsContentProps {
  activeTab: number
  setSubtitle: (subtitle: string) => void
}

export function SettingsContent({ activeTab, setSubtitle }: SettingsContentProps) {
  return (
    <>
      <TabPanel value={activeTab} index={0}>
        <ClinicProfileForm setSubtitle={setSubtitle} />
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        <StuffsManagement setSubtitle={setSubtitle} />
      </TabPanel>
      <TabPanel value={activeTab} index={2}>
        <ScheduleSettings setSubtitle={setSubtitle} />
      </TabPanel>
      <TabPanel value={activeTab} index={3}>
        <PriceSettings setSubtitle={setSubtitle} />
      </TabPanel>
      <TabPanel value={activeTab} index={4}>
        <SalarySettings setSubtitle={setSubtitle} />
      </TabPanel>
      <TabPanel value={activeTab} index={5}>
        <IntegrationsSettings setSubtitle={setSubtitle} />
      </TabPanel>
      <TabPanel value={activeTab} index={6}>
        <GeneralSettings setSubtitle={setSubtitle} />
      </TabPanel>
      <TabPanel value={activeTab} index={7}>
        <DictionarySettings setSubtitle={setSubtitle} />
      </TabPanel>
    </>
  )
}
