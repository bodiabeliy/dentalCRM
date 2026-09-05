import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { DICTIONARY_SETTINGS_TABS } from '../../model/constant'
import ChevronRightIcon from '../../../../shared/assets/icons/chevron.svg?react'
import { LeadsStatuses } from '../leads-statuses/leads-statuses'

const DICTIONARY_SETTINGS_COMPONENTS = {
  'leads-statuses': LeadsStatuses,
}

export function DictionarySettings({ setSubtitle }: { setSubtitle: (subtitle: string) => void }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [activeTab, setActiveTab] = useState<string | null>(null)

  useEffect(() => {
    setSubtitle('Довідники')
  }, [setSubtitle])

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
  }

  return (
    <Box
      sx={{
        boxShadow:
          '0 2px 3px -1px rgba(0, 0, 0, 0.1), 0 1px 12px 0 rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
        background: '#fff',
        borderRadius: '16px',
        m: isMobile ? 0 : 2,
        mt: isMobile ? 2 : 0,
        position: 'relative',
        p: activeTab && activeTab in DICTIONARY_SETTINGS_COMPONENTS ? 0 : 3,
        display: activeTab && activeTab in DICTIONARY_SETTINGS_COMPONENTS ? 'block' : 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: isMobile ? '20px' : '60px 20px',
        width: '100%',
      }}>
      {activeTab && activeTab in DICTIONARY_SETTINGS_COMPONENTS ? (
        React.createElement(DICTIONARY_SETTINGS_COMPONENTS[activeTab as keyof typeof DICTIONARY_SETTINGS_COMPONENTS])
      ) : (
        <>
          {DICTIONARY_SETTINGS_TABS.map((tab) => (
            <Box
              key={tab.id}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  color: tab.color,
                }}>
                <tab.Icon />
                <Typography
                  variant="h6"
                  sx={{
                    textTransform: 'uppercase',
                    fontWeight: 500,
                    fontSize: '15px',
                    lineHeight: '173%',
                    letterSpacing: '0.03em',
                    color: 'rgba(21, 22, 24, 0.87)',
                  }}>
                  {tab.title}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                  gap: '16px',
                }}>
                {tab.subitems.map((subitem) => (
                  <Box
                    key={subitem.id}
                    sx={{
                      border: `1px solid ${tab.color}`,
                      borderRadius: '8px',
                      minHeight: '56px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      p: 2,
                      cursor: subitem.tab ? 'pointer' : 'default',
                    }}
                    onClick={() => {
                      if (subitem.tab) {
                        handleTabClick(subitem.tab)
                      }
                    }}>
                    <Typography variant="body1">{subitem.title}</Typography>
                    <ChevronRightIcon
                      style={{
                        color: tab.color,
                        width: '24px',
                        height: '24px',
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </>
      )}
    </Box>
  )
}
