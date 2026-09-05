import { useState, useEffect } from 'react'
import { useLocation } from 'react-router'

import { Box, Button, IconButton, useMediaQuery, useTheme } from '@mui/material'
import { SidebarLayout } from '../../shared'

import MoreVerticalIcon from '../../shared/assets/icons/more-vertical.svg?react'
import BellIcon from '../../shared/assets/icons/bell.svg?react'
import { EditModal } from '../../features/leads/ui/edit-modal'
import type { Lead } from '../../features/leads'
import { CreateLeadTaskModal } from '../../features/leads/ui/creation-leads-tasks-modal'
import { LeadInfoContent } from '../../features/leads/ui/lead-form'
import { useTranslation } from 'react-i18next'

export function LeadInfoPage() {
  const { t } = useTranslation('leads')

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [createActionsModal, setCreateActionsModal] = useState(false)
  const [createTaskModal, setCreateTaskModal] = useState(false)

  // const navigate = useNavigate();
  const location = useLocation()
  const { name } = location.state.lead

  const handleCreateActionsSave = (data: Lead) => {
    console.log('Create actions saved:', data)
  }

  useEffect(() => {}, [])

  const handleAddLead = () => {
    setCreateActionsModal(true)
    console.log('edit lead clicked')
  }

  const handleAddLeadTask = () => {
    setCreateTaskModal(true)
  }

  return (
    <>
      <SidebarLayout
        title={isMobile ? ' ' : 'Ліди'}
        subtitle={name}
        rightSidebar={
          <>
            <>
              <Button
                variant="outlined"
                fullWidth={isMobile}
                sx={{
                  borderColor: '#0029d9',
                  color: '#0029d9',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  fontSize: '14px',
                }}>
                {t('leadInfoBookButton')}
              </Button>
              <Button
                variant="outlined"
                fullWidth={isMobile}
                sx={{
                  borderColor: '#8a4bdc',
                  color: '#8a4bdc',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  fontSize: '14px',

                  position: 'relative',
                }}>
                {t('leadInfoPatientButton')}
              </Button>
            </>
            <IconButton
              sx={{
                background: '#f5f7fe',
                border: '1px solid rgba(0, 41, 217, 0.3)',
                borderRadius: '8px',
                width: '40px',
                height: '40px',
              }}>
              <MoreVerticalIcon style={{ color: '#8a4bdc' }} />
            </IconButton>
            <IconButton
              sx={{
                background: '#8a4bdc',
                borderRadius: '8px',
                width: '40px',
                height: '40px',
              }}>
              <BellIcon style={{ color: 'white' }} />
            </IconButton>
          </>
        }>
        <Box
          sx={{
            display: 'grid',
            marginLeft: !isMobile ? '30px' : '0px',
            gridTemplateColumns: '1fr',
            gap: '24px',
            mt: '16px',
          }}>
          <LeadInfoContent onClick={handleAddLead} taskOnClick={handleAddLeadTask} />
        </Box>
        <EditModal
          open={createActionsModal}
          onClose={() => setCreateActionsModal(false)}
          onSave={handleCreateActionsSave}
        />
        <CreateLeadTaskModal
          open={createTaskModal}
          onClose={() => setCreateTaskModal(false)}
          onSave={handleAddLeadTask}
        />
      </SidebarLayout>
    </>
  )
}
