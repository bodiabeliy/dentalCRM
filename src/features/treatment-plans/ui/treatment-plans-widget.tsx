import { Box, Button, useMediaQuery, useTheme } from '@mui/material'
import { KeyboardArrowUp as ArrowUpIcon, KeyboardArrowDown as ArrowDownIcon, Add as AddIcon } from '@mui/icons-material'
import { treatmentPlansModel } from '../model/treatment-plans-model'
import { TreatmentPlanCard } from './treatment-plan-card'
import { TreatmentPlanCreateWidget } from './treatment-plan-create-widget'
import { useState } from 'react'

export function TreatmentPlansWidget() {
  const agreedPlan = treatmentPlansModel.getAgreedPlan()
  const treatmentPlans = treatmentPlansModel.getTreatmentPlans()
  const [isAllPlans, setIsAllPlans] = useState(false)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box sx={{ p: isMobile ? 2 : 3 }}>
      {!isCreateOpen ? (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2, mb: 3 }}>
          <Button
            variant="outlined"
            startIcon={!isAllPlans ? <ArrowDownIcon /> : <ArrowUpIcon />}
            sx={{
              textTransform: 'none',
              borderColor: '#7324d5',
              color: '#7324d5',
            }}
            onClick={() => setIsAllPlans(!isAllPlans)}>
            ВСІ ПЛАНИ
          </Button>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            sx={{
              textTransform: 'none',
              borderColor: '#0029d9',
              color: '#0029d9',
            }}
            onClick={() => setIsCreateOpen(true)}>
            {isMobile ? 'СТВОРИТИ' : 'СТВОРИТИ ПЛАН ЛІКУВАННЯ'}
          </Button>
        </Box>
      ) : null}
      {isCreateOpen && <TreatmentPlanCreateWidget onClose={() => setIsCreateOpen(false)} />}
      {!isCreateOpen && agreedPlan && <TreatmentPlanCard plan={agreedPlan} isAgreed={true} />}
      {!isCreateOpen && isAllPlans && (
        <Box sx={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 3, mt: 3 }}>
          {treatmentPlans.map((plan) => (
            <TreatmentPlanCard key={plan.id} plan={plan} isAgreed={false} />
          ))}
        </Box>
      )}
    </Box>
  )
}
