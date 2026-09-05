import { useState, useEffect } from 'react'
import { Box, Tabs, Tab, useMediaQuery, useTheme } from '@mui/material'

import { TAB_LABELS } from '../../model/constants'
import { LeadForm } from '../lead-form/lead-form'
import { LeadTabs } from '../lead-tabs'
import { TabPanel } from '../../../../shared/components'

interface LeadInfoContentProps {
  onClick?: () => void
  taskOnClick?: () => void
}

export function LeadInfoContent({ onClick, taskOnClick }: LeadInfoContentProps) {
  const [activeTab, setActiveTab] = useState(0)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  useEffect(() => {}, [])

  const handleClick = onClick ?? (() => {})

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: isMobile ? 'space-between' : 'end',
          px: isMobile ? 2 : 0,
        }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: '#0029d9',
            },
            '&.Mui-selected': {
              color: '#0029d9',
            },
          }}>
          {TAB_LABELS.map((label: string) => (
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
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          height: '100%',
          background: '#fff',
          borderRadius: '16px',
          mt: 0,
          position: 'relative',
        }}>
        <LeadForm isMobile={isMobile} activeTab={activeTab} onClick={handleClick} />
        <TabPanel index={0} value={activeTab}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: isMobile ? 0 : 2,
              pt: 0,
              pr: isMobile ? 1 : 3,
              pb: isMobile ? 1 : 3,
              pl: isMobile ? 1 : 3,
            }}>
            <LeadTabs isMobile={isMobile} tabIndex={0} activeTab={activeTab} taskOnClick={taskOnClick} />
          </Box>
        </TabPanel>
        <TabPanel index={1} value={activeTab}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: isMobile ? 0 : 2,
              pt: 0,
              pr: isMobile ? 1 : 3,
              pb: isMobile ? 1 : 3,
              pl: isMobile ? 1 : 3,
            }}>
            <LeadTabs isMobile={isMobile} tabIndex={1} activeTab={activeTab} taskOnClick={taskOnClick} />
          </Box>
        </TabPanel>
        <TabPanel index={2} value={activeTab}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: isMobile ? 0 : 2,
              pt: 0,
              pr: isMobile ? 1 : 3,
              pb: isMobile ? 1 : 3,
              pl: isMobile ? 1 : 3,
            }}>
            <LeadTabs isMobile={isMobile} tabIndex={2} activeTab={activeTab} taskOnClick={taskOnClick} />
          </Box>
        </TabPanel>
        <TabPanel index={3} value={activeTab}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: isMobile ? 0 : 2,
              pt: 0,
              pr: isMobile ? 1 : 3,
              pb: isMobile ? 1 : 3,
              pl: isMobile ? 1 : 3,
            }}>
            <LeadTabs isMobile={isMobile} tabIndex={3} activeTab={activeTab} taskOnClick={taskOnClick} />
          </Box>
        </TabPanel>
      </Box>
    </>
  )
}
