import { Box, useTheme, useMediaQuery, Tabs, Tab } from '@mui/material'
import { useEffect } from 'react'
import { TAB_LABELS } from '../../model/constants'
import { usePriceSettings } from '../../model/hooks'
import { PriceContent } from '../../ui/price-content/price-content'
import { NomenclatureContent } from '../../ui/nomenclature-content/nomenclature-content'
import { TemplatesContent } from '../../ui/price-content/templates-content'

export function PriceSettings({ setSubtitle }: { setSubtitle: (subtitle: string) => void }) {
  useEffect(() => {
    setSubtitle('Прайс')
  }, [setSubtitle])

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const { activeTab, setActiveTab } = usePriceSettings()

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mr: 2 }}>
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: '#0029d9',
            },
            '&.Mui-selected': {
              color: '#0029d9',
            },
            ml: 'auto',
            maxWidth: '100%',
          }}>
          {TAB_LABELS.map((label) => (
            <Tab
              key={label}
              sx={{
                '&.Mui-selected': {
                  color: '#0029d9',
                },
                textTransform: 'none',
              }}
              label={label}
            />
          ))}
        </Tabs>
      </Box>
      {activeTab === 0 ? (
        <Box
          sx={{
            boxShadow:
              '0 2px 3px -1px rgba(0, 0, 0, 0.1), 0 1px 12px 0 rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
            background: '#fff',
            borderRadius: '16px',
            m: isMobile ? 0 : 2,
            mt: isMobile ? 0 : 2,
            position: 'relative',
            p: 2,
          }}>
          <PriceContent />
        </Box>
      ) : null}
      {activeTab === 1 && (
        <Box
          sx={{
            boxShadow:
              '0 2px 3px -1px rgba(0, 0, 0, 0.1), 0 1px 12px 0 rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
            background: '#fff',
            borderRadius: '16px',
            m: 2,
            mt: isMobile ? 0 : 2,
            position: 'relative',
            p: 2,
          }}>
          <NomenclatureContent />
        </Box>
      )}
      {activeTab === 4 && <TemplatesContent />}
    </>
  )
}
