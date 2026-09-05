import { type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Drawer, useMediaQuery, useTheme } from '@mui/material'
import { Sidebar } from './sidebar'
import { useSidebarLayoutContext } from '../../contexts/sidebar-layout-context'
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import { Menu as MenuIcon } from '@mui/icons-material'
import BurgerIcon from '../../assets/icons/burger.svg?react'

interface SidebarLayoutProps {
  children: ReactNode
  title?: string
  subtitle?: string
  rightSidebar: ReactNode
}

export function SidebarLayout({ children, title, subtitle, rightSidebar }: SidebarLayoutProps) {
  const { t } = useTranslation(['common'])
  const theme = useTheme()
  const {
    isMobile,
    mobileOpen,
    isSidebarCollapsed,
    drawerWidth,
    handleDrawerToggle,
    handleSidebarToggle,
    closeMobileSidebar,
    isNavigating,
  } = useSidebarLayoutContext()

  const isTablet = useMediaQuery(theme.breakpoints.down('md'))

  const drawerContent = <Sidebar isCollapsed={isMobile ? false : isSidebarCollapsed} />

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', width: '100vw', bgcolor: '#f8f9fa', position: 'relative' }}>
      <Box
        component="nav"
        sx={{
          width: { md: drawerWidth },
          flexShrink: { md: 0 },
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}>
        {isMobile ? (
          <Drawer
            variant="temporary"
            open={mobileOpen && !isNavigating}
            onClose={() => {
              if (!isNavigating) {
                closeMobileSidebar()
              }
            }}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                background: '#2c334a',
                overflow: 'hidden',
                overscrollBehavior: 'contain',
                WebkitOverflowScrolling: 'touch',
              },
            }}>
            {drawerContent}
          </Drawer>
        ) : (
          <Drawer
            variant="permanent"
            sx={{
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                transition: theme.transitions.create('width', {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.leavingScreen,
                }),
                overflowX: 'hidden',
              },
            }}
            open>
            {drawerContent}
          </Drawer>
        )}
      </Box>
      {!isMobile && (
        <IconButton
          onClick={handleSidebarToggle}
          sx={{
            position: 'absolute',
            top: '19px',
            left: isSidebarCollapsed ? '54px' : '211px',
            backgroundColor: 'white',
            zIndex: 1201,
            cursor: 'pointer',
            width: 33,
            height: 33,
            borderRadius: '72px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            transition: 'left 0.3s cubic-bezier(0.4,0,0.2,1)',
            '&:hover': {
              backgroundColor: 'white',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            },
          }}>
          <BurgerIcon
            style={{
              color: 'rgba(0, 0, 0, 0.56)',
              transform: isSidebarCollapsed ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease-in-out',
              width: 18,
              height: 18,
            }}
          />
        </IconButton>
      )}
      <Box
        component="main"
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'white',
          width: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` },
          minHeight: 0,
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}>
        {title ? (
          <AppBar
            position="static"
            elevation={0}
            sx={{
              bgcolor: 'white',
              color: 'black',
              borderBottom: '1px solid #e2e8f0',
              boxShadow: `
            0px 2px 3px -1px rgba(0,0,0,0.1),
            0px 1px 12px 0px rgba(0,0,0,0.1),
            0px 1px 3px 0px rgba(0,0,0,0.05)
          `,
            }}>
            <Toolbar sx={{ justifyContent: 'space-between', py: '12px', px: { xs: 2, md: 3 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {isMobile && (
                  <IconButton
                    color="inherit"
                    aria-label={t('aria.openDrawer', { ns: 'common' })}
                    edge="start"
                    onClick={(e) => {
                      if (isNavigating) {
                        e.preventDefault()
                        e.stopPropagation()
                        return
                      }
                      handleDrawerToggle()
                    }}
                    sx={{ mr: 1, color: 'black' }}>
                    <MenuIcon />
                  </IconButton>
                )}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Typography variant="h5">{title}</Typography>
                  {subtitle && !isTablet && (
                    <Typography variant="body1">
                      {' '}
                      <span style={{ marginRight: '4px' }}>/</span> {subtitle}
                    </Typography>
                  )}
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>{rightSidebar}</Box>
            </Toolbar>
          </AppBar>
        ) : null}
        {children}
      </Box>
    </Box>
  )
}
