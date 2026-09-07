import { useState, useEffect, useCallback } from 'react'
import { Box } from '@mui/material'
import { useNavigate, useLocation } from 'react-router'
import ClinicIcon from '../../../assets/icons/clinic.svg?react'
import { ClinicSelector } from '../../ui/clinic-selector'
import { SidebarSectionComponent, UserProfileComponent } from './ui'
import { useSidebarLayoutContext } from '../../../contexts/sidebar-layout-context'
import { SIDEBAR_SECTIONS, USER_PROFILE } from './model'
import type { SidebarItem } from './model'
import { useAppDispatch, useAppSelector } from '../../../../app/providers/store-helpers'
import { clinicSelector, clinicsSelector, getCurrentClinic } from '../../../../app/providers/reducers/ClinicSlice'
import type { IClinic } from '../../../../app/providers/types/clinic'
import { getClinicById, getClinicsAll } from '../../../../app/services/ClinicService'
import { getLastClinicId } from '../../../utils/storageUtils'
import { userSelector } from '../../../../app/providers/reducers/UserSlice'
import { notifyClinicSwitchSuccess } from '../../../utils/toastUtils'
// import { getAllPricing } from '../../../../app/services/PricingService'
// import { pricingListSelector } from '../../../../app/providers/reducers/PricingSlice'
// Toasts are handled by the global container in AppProviders

interface SidebarProps {
  isCollapsed: boolean
}

export const Sidebar = ({ isCollapsed }: SidebarProps) => {
  const navigate = useNavigate()
  const location = useLocation()

  const { isMobile, forceCloseMobileSidebar, isNavigating, setIsNavigating, setIsSidebarCollapsed } =
    useSidebarLayoutContext()

  // State for expandable items
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})
  const clinicsList = useAppSelector(clinicsSelector)

  const currentClinic = useAppSelector(clinicSelector)
  const currentUser = useAppSelector(userSelector)

  // Remove unused local selectedClinic state
  const isBlur = clinicsList.length > 0 ? false : true
  const dispatch = useAppDispatch()

  // Add a specific effect to update the clinic list whenever location.pathname changes
  // This ensures the clinic list is refreshed when navigating back to dashboard after clinic deletion
  useEffect(() => {
    dispatch(getClinicsAll())
  }, [dispatch, location.pathname, currentUser])

  // Select the appropriate clinic when the clinic list is loaded
  useEffect(() => {
    // If the clinic list becomes empty, reset the current clinic
    if (clinicsList.length === 0) {
      dispatch(
        getCurrentClinic({
          id: '',
          name: '',
          sub_name: '',
          logo: '',
          currenciesIso: [],
          mainCurrencyIso: '',
          sub_address: '',
        })
      )
      // console.log('Clinic list is empty, resetting current clinic')
    }
    // Otherwise, select an appropriate clinic if needed
    else if (clinicsList.length > 0) {
      // Check if we have a saved last clinic ID
      const lastClinicId = getLastClinicId()

      if (lastClinicId && clinicsList[0].id) {
        // Find if the saved clinic exists in the current list
        const savedClinicExists = clinicsList.some((clinic) => clinic.id === lastClinicId)

        if (savedClinicExists) {
          // If the saved clinic exists, select it
          dispatch(getClinicById(lastClinicId))
        } else dispatch(getClinicById(clinicsList[0].id))
      } else {
        // If no last clinic was saved, select the first one{}
        if (clinicsList[0].id) {
          dispatch(getClinicById(clinicsList[0].id))
        }
      }
    }
  }, [clinicsList, currentClinic.name, currentUser, dispatch])

  // Removed duplicate effect for initial clinic selection

  // Auto-expand items based on current route
  useEffect(() => {
    // Don't auto-expand during navigation
    if (isNavigating) return

    const currentPath = location.pathname

    // Find the item that matches the current route
    const findItemByPath = (sections: typeof SIDEBAR_SECTIONS): string | null => {
      for (const section of sections) {
        for (const item of section.items) {
          if (item.link === currentPath && item.hasSubItems) {
            return item.id
          }
        }
      }
      return null
    }

    const itemToExpand = findItemByPath(SIDEBAR_SECTIONS)

    if (itemToExpand) {
      // Add a delay on mobile to avoid conflicts with sidebar closing
      const delay = isMobile ? 200 : 0
      setTimeout(() => {
        setExpandedItems((prev) => ({
          ...prev,
          [itemToExpand]: true,
        }))
      }, delay)
    }
  }, [location.pathname, isMobile, isNavigating])

  const handleClinicSelect = useCallback(
    (clinic: IClinic) => {
      if (clinic?.id) {
        dispatch(getClinicById(clinic.id))
        notifyClinicSwitchSuccess(clinic.name)
      }
    },
    [dispatch, currentClinic]
  )

  const handleNavigation = (item: SidebarItem) => {
    if (item.link && !isNavigating) {
      setIsNavigating(true)

      if (isMobile) {
        forceCloseMobileSidebar()
      }

      navigate(item.link!)

      const delay = isMobile ? 1200 : 200
      setTimeout(() => {
        setIsNavigating(false)

        if (isMobile) {
          forceCloseMobileSidebar()
        }
      }, delay)
    }
  }

  const handleToggleItem = (itemId: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }))
  }

  const handleSettingsClick = () => {
    if (!isNavigating) {
      setIsNavigating(true)

      if (isMobile) {
        forceCloseMobileSidebar()
      }

      navigate(USER_PROFILE.settingsLink)

      const delay = isMobile ? 1200 : 200
      setTimeout(() => {
        setIsNavigating(false)

        if (isMobile) {
          forceCloseMobileSidebar()
        }
      }, delay)
    }
  }

  const isActive = (link?: string) => {
    return link ? location.pathname === link : false
  }

  const getActiveStyles = (isItemActive: boolean) => ({
    bgcolor: isItemActive ? '#5a67d8' : 'transparent',
    '&:hover': { bgcolor: isItemActive ? '#5a67d8' : 'rgba(255,255,255,0.08)' },
  })

  const getActiveIconStyles = (isItemActive: boolean) => ({
    color: isItemActive ? 'white' : 'rgba(255,255,255,0.7)',
    minWidth: isCollapsed ? 'auto' : '32px',
    justifyContent: 'center',
  })

  const getActiveTextStyles = (isItemActive: boolean) => ({
    fontSize: '14px',
    color: isItemActive ? 'white' : 'inherit',
  })

  useEffect(() => {
    if (window.innerWidth < 1500) {
      setIsSidebarCollapsed(true)
    }
  }, [setIsSidebarCollapsed])

  return (
    <Box
      sx={{
        height: '100%',
        bgcolor: '#2c334a',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'padding 0.3s ease-in-out',
        overflow: 'hidden',
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(255, 255, 255, 0.3)',
          borderRadius: '3px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: 'rgba(255, 255, 255, 0.5)',
        },
      }}>
      <Box
        sx={{
          p: isCollapsed ? '12px 8px' : '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: isCollapsed ? 'center' : 'flex-start',
          margin: '16px 8px',
          flexShrink: 0,
        }}>
        {isCollapsed ? (
          <ClinicIcon
            style={{
              fontSize: 24,
              color: 'white',
            }}
          />
        ) : (
          <ClinicSelector clinics={clinicsList} selectedClinic={currentClinic} onClinicSelect={handleClinicSelect} />
        )}
      </Box>
      <Box
        sx={{
          flex: 1,
          overflow: isMobile ? 'auto' : 'hidden',
          display: 'flex',
          flexDirection: 'column',
          ...(isMobile && {
            WebkitOverflowScrolling: 'touch',
            overscrollBehavior: 'contain',
          }),
          ...(!isMobile && {
            '&:hover': {
              overflow: 'auto',
            },
          }),
        }}>
        {SIDEBAR_SECTIONS?.map((section) => (
          <SidebarSectionComponent
            key={section.id}
            section={section}
            isCollapsed={isCollapsed}
            isMobile={isMobile}
            expandedItems={expandedItems}
            onToggleItem={handleToggleItem}
            onItemClick={handleNavigation}
            getActiveStyles={getActiveStyles}
            getActiveIconStyles={getActiveIconStyles}
            getActiveTextStyles={getActiveTextStyles}
            isItemActive={isActive}
            isBlur={isBlur}
          />
        ))}
      </Box>
      <Box sx={{ flexShrink: 0 }}>
        <UserProfileComponent
          isCollapsed={isCollapsed}
          settingsLink={USER_PROFILE.settingsLink}
          onSettingsClick={handleSettingsClick}
        />
      </Box>
    </Box>
  )
}
