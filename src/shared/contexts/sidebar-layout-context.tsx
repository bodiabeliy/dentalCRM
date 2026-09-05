import { createContext, useContext, useState, useMemo, type ReactNode } from 'react'
import { useMediaQuery, useTheme } from '@mui/material'

const COLLAPSED_DRAWER_WIDTH = 80
const EXPANDED_DRAWER_WIDTH = 256

const SidebarLayoutContext = createContext<{
  isMobile: boolean
  mobileOpen: boolean
  isSidebarCollapsed: boolean
  drawerWidth: number
  handleDrawerToggle: () => void
  handleSidebarToggle: () => void
  closeMobileSidebar: () => void
  forceCloseMobileSidebar: () => void
  isNavigating: boolean
  setIsNavigating: (navigating: boolean) => void
  setIsSidebarCollapsed: (collapsed: boolean) => void
} | null>(null)

export function SidebarLayoutProvider({ children }: { children: ReactNode }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)

  const handleDrawerToggle = () => {
    if (!isNavigating) {
      setMobileOpen((open) => !open)
    }
  }

  const forceCloseMobileSidebar = () => {
    setMobileOpen(false)
  }

  const handleSidebarToggle = () => setIsSidebarCollapsed((collapsed) => !collapsed)
  const closeMobileSidebar = () => {
    setMobileOpen(false)
  }

  const drawerWidth = isMobile
    ? EXPANDED_DRAWER_WIDTH
    : isSidebarCollapsed
      ? COLLAPSED_DRAWER_WIDTH
      : EXPANDED_DRAWER_WIDTH

  const value = useMemo(
    () => ({
      isMobile,
      mobileOpen,
      isSidebarCollapsed,
      drawerWidth,
      handleDrawerToggle,
      handleSidebarToggle,
      closeMobileSidebar,
      forceCloseMobileSidebar,
      isNavigating,
      setIsNavigating,
      setIsSidebarCollapsed,
    }),
    [isMobile, mobileOpen, isSidebarCollapsed, drawerWidth, isNavigating]
  )

  return <SidebarLayoutContext.Provider value={value}>{children}</SidebarLayoutContext.Provider>
}

export function useSidebarLayoutContext() {
  const ctx = useContext(SidebarLayoutContext)
  if (!ctx) throw new Error('useSidebarLayoutContext must be used within SidebarLayoutProvider')
  return ctx
}
