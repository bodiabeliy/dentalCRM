import { useState } from 'react'
import { useMediaQuery, useTheme } from '@mui/material'

const COLLAPSED_DRAWER_WIDTH = 80
const EXPANDED_DRAWER_WIDTH = 256

export function useSidebarLayout() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!isSidebarCollapsed)
  }

  const drawerWidth = isMobile
    ? EXPANDED_DRAWER_WIDTH
    : isSidebarCollapsed
      ? COLLAPSED_DRAWER_WIDTH
      : EXPANDED_DRAWER_WIDTH

  return {
    isMobile,
    mobileOpen,
    isSidebarCollapsed,
    drawerWidth,
    handleDrawerToggle,
    handleSidebarToggle,
  }
}
