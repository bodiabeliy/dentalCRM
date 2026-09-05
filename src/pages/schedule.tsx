import { IconButton } from '@mui/material'
import { ScheduleMain, SchedulePopups } from '../features/schedule'
import { SidebarLayout } from '../shared'
import UsersIcon from '../shared/assets/icons/users.svg?react'
import BellIcon from '../shared/assets/icons/bell.svg?react'
import SettingsIcon from '../shared/assets/icons/settings.svg?react'
import { useState } from 'react'
import { SettingsModal } from '../features/settings'

export function SchedulePage() {
  const [openSettingsModal, setOpenSettingsModal] = useState(false)
  return (
    <SidebarLayout
      title="Розклад"
      rightSidebar={
        <>
          <IconButton
            sx={{
              width: 40,
              height: 40,
              bgcolor: '#f5f7fe',
              color: '#8a4bdc',
              borderRadius: '8px',
              border: '1px solid #acb9f3',
            }}>
            <UsersIcon style={{ fontSize: '24px' }} />
          </IconButton>
          <IconButton
            onClick={() => setOpenSettingsModal(true)}
            sx={{
              width: 40,
              height: 40,
              bgcolor: '#f5f7fe',
              color: '#8a4bdc',
              borderRadius: '8px',
              border: '1px solid #acb9f3',
            }}>
            <SettingsIcon style={{ fontSize: '24px' }} />
          </IconButton>
          <IconButton
            sx={{
              width: 40,
              height: 40,
              bgcolor: '#8a4bdc',
              color: 'white',
              borderRadius: '8px',
              '&:hover': {
                bgcolor: 'white',
                color: '#8a4bdc',
                border: '1px solid #8a4bdc',
              },
            }}>
            <BellIcon style={{ fontSize: '24px' }} />
          </IconButton>
        </>
      }>
      <ScheduleMain />
      <SchedulePopups />
      <SettingsModal open={openSettingsModal} onClose={() => setOpenSettingsModal(false)} />
    </SidebarLayout>
  )
}
