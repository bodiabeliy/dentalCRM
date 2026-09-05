import { useCallback } from 'react'
import { Box, Button, Dialog, DialogContent, Typography } from '@mui/material'

import StuffIcon from '../../../shared/assets/icons/lead.svg?react'

import {} from '@mui/x-date-pickers'
import type { IStaff } from '../../../app/providers/types/stuff'
import { useAppDispatch, useAppSelector } from '../../../app/providers/store-helpers'
import { staffSelector } from '../../../app/providers/reducers/StaffSlice'
import { deleteStaffProfile, getAllStuffs } from '../../../app/services/StaffService'
import { useTranslation } from 'react-i18next'

// import { useAppDispatch } from '../../../app/providers/store-helpers'

interface CreationModalProps {
  open: boolean
  onClose: () => void
  onSave: (data: IStaff) => void
}

export function DeleteStaffModal({ open = true, onClose }: CreationModalProps) {
  const dispatch = useAppDispatch()
  const currentStaff = useAppSelector(staffSelector)
  const { t } = useTranslation(['workers', 'common'])

  const closeModal = useCallback(() => {
    onClose()
  }, [onClose])

  const formSubmit = useCallback(() => {
    console.log('currentStaff', currentStaff)

    dispatch(deleteStaffProfile(currentStaff.id))
    dispatch(getAllStuffs())
    closeModal()
  }, [currentStaff, dispatch, closeModal])

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <Box sx={{ display: 'flex', alignItems: 'center', p: 2, background: '#f4f7fe' }}>
          <StuffIcon style={{ color: '#0029d9', marginRight: 8 }} />
          <Typography variant="h6" sx={{ fontWeight: 500, flex: 1 }}>
            {t('workers:deleteStaff.title')}
          </Typography>
        </Box>
        <DialogContent sx={{ pb: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="body1" sx={{ fontWeight: 500, flex: 1 }}>
            {t('workers:deleteStaff.confirm', { name: currentStaff.firstname })}
          </Typography>
        </DialogContent>

        <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'flex-start', px: 3, pb: 3, pt: 1, mt: 2 }}>
          <Button
            variant="outlined"
            sx={{ borderColor: '#0029d9', color: '#0029d9', padding: '12px 22px' }}
            onClick={() => closeModal()}>
            {t('common:actions.cancel')}
          </Button>
          <Button
            variant="contained"
            sx={{ bgcolor: '#0029d9', padding: '12px 22px', flex: 1 }}
            onClick={() => formSubmit()}>
            {t('common:actions.delete')}
          </Button>
        </Box>
      </Dialog>
    </>
  )
}
