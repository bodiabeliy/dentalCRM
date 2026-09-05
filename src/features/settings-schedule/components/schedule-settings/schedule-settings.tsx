import { Box, Button, useMediaQuery, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import { SettingsSection } from '../settings-section/settings-section'
import { WorkingDaysSection } from '../working-days-section/working-days-section'
import { DaysOffSection } from '../days-off-section/days-off-section'
import { CabinetsManagementSection } from '../cabinets-management-section/cabinets-management-section'
import type { Cabinet } from '../cabinets-management-section/cabinets-management-section'
import type { WorkingDay } from '../working-days-section/working-days-section'

export function ScheduleSettings({ setSubtitle }: { setSubtitle: (subtitle: string) => void }) {
  useEffect(() => {
    setSubtitle('Розклад')
  }, [setSubtitle])

  const [settings, setSettings] = useState({ showVisitsInColor: true, minFreeTime: '' })
  const [workingDays, setWorkingDays] = useState<WorkingDay[]>([])
  const [daysOff, setDaysOff] = useState<Date[]>([])
  const [cabinets, setCabinets] = useState<Cabinet[]>([])
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 3, p: isMobile ? 2 : 0 }}>
      <Box sx={{ display: 'flex', gap: isMobile ? 5 : 10, flexDirection: isMobile ? 'column' : 'row' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <SettingsSection settings={settings} setSettings={setSettings} />
          <WorkingDaysSection workingDays={workingDays} setWorkingDays={setWorkingDays} />
        </Box>
        <DaysOffSection daysOff={daysOff} setDaysOff={setDaysOff} />
      </Box>
      <CabinetsManagementSection cabinets={cabinets} setCabinets={setCabinets} />
      <Box display="flex" gap={2} mt={2}>
        <Button variant="outlined" sx={{ borderRadius: 2, fontWeight: 500 }}>
          Скасувати
        </Button>
        <Button variant="contained" sx={{ borderRadius: 2, fontWeight: 500 }}>
          Зберегти зміни
        </Button>
      </Box>
    </Box>
  )
}
