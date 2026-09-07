import { List, Typography, type TypographyProps, type Theme, type SxProps, Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { SidebarItemComponent } from '../sidebar-item'
import type { SidebarItem, SidebarSection } from '../../model'

interface SidebarSectionProps {
  section: SidebarSection
  isBlur: boolean
  isCollapsed: boolean
  isMobile: boolean
  expandedItems: Record<string, boolean>
  onToggleItem: (itemId: string) => void
  onItemClick: (item: SidebarItem) => void
  getActiveStyles: (isActive: boolean) => SxProps<Theme>
  getActiveIconStyles: (isActive: boolean) => SxProps<Theme>
  getActiveTextStyles: (isActive: boolean) => TypographyProps<'span', { component?: 'span' }>
  isItemActive: (link?: string) => boolean
}

export function SidebarSectionComponent({
  section,
  isBlur,
  isCollapsed,
  isMobile,
  expandedItems,
  onToggleItem,
  onItemClick,
  getActiveStyles,
  getActiveIconStyles,
  getActiveTextStyles,
  isItemActive,
}: SidebarSectionProps) {
  const { t } = useTranslation(['sidebar'])

  return (
    <>
      {!isCollapsed && section.title && (
        <Typography
          sx={{
            filter: isBlur ? 'blur(3px)' : 'none',
            pointerEvents: isBlur ? 'none' : 'auto',
            fontSize: '14px',
            fontWeight: 500,
            margin: isMobile ? '8px 0 8px 16px' : '8px 0 8px 32px',
            color: '#b9c5fd',
            whiteSpace: 'nowrap',
          }}>
          {t(section.title, { ns: 'sidebar' })}
        </Typography>
      )}
      <List sx={{ p: 0, filter: isBlur ? 'blur(3px)' : 'none', pointerEvents: isBlur ? 'none' : 'auto' }}>
        {section.items?.map((item) => (
          <SidebarItemComponent
            key={item.id}
            item={item}
            isCollapsed={isCollapsed}
            isMobile={isMobile}
            isActive={isItemActive(item.link)}
            isExpanded={expandedItems[item.id]}
            onToggle={() => onToggleItem(item.id)}
            onClick={() => onItemClick(item)}
            getActiveStyles={getActiveStyles}
            getActiveIconStyles={getActiveIconStyles}
            getActiveTextStyles={getActiveTextStyles}
          />
        ))}
        <Box
          sx={{
            backgroundColor: '#9da2fa',
            width: 'calc(100% - 32px)',
            height: '1px',
            margin: '8px 16px',
          }}
        />
      </List>
    </>
  )
}
