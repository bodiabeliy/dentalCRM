import { Box, useMediaQuery, useTheme } from '@mui/material'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

export function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
      sx={{
        width: '100%',
        minHeight: `calc(100vh - 100px)`,
      }}>
      {value === index && (
        <Box
          sx={{
            height: isMobile ? '100%' : 'auto',
          }}>
          {children}
        </Box>
      )}
    </Box>
  )
}
