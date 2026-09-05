import { useCallback } from 'react'
import { Box, Button, Dialog, DialogContent, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import WorkerIcon from '../../../../shared/assets/icons/settings/workers.svg?react'
import { useAppDispatch } from '../../../../app/providers/store-helpers'
import { removeSubClinic } from '../../../../app/services/SubClinicService'
import type { ISubClinic } from '../../../../app/providers/types/clinic'

interface DeleteBranchDialogProps {
  open: boolean
  branch: ISubClinic | null
  onClose: () => void
}

export function DeleteBranchDialog({ open = true, branch, onClose }: DeleteBranchDialogProps) {
  const dispatch = useAppDispatch()
  const { t } = useTranslation(['workers', 'common'])

  const handleDelete = useCallback(() => {
    if (branch && branch.id) {
      dispatch(removeSubClinic(Number(branch.id)))
      onClose()
    }
  }, [branch, dispatch, onClose])

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2, background: '#f4f7fe' }}>
        <WorkerIcon style={{ color: '#0029d9', marginRight: 8 }} />
        <Typography variant="h6" sx={{ fontWeight: 500, flex: 1 }}>
          {t('workers:deleteBranch.title')}
        </Typography>
      </Box>
      <DialogContent sx={{ pb: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="body1" sx={{ fontWeight: 500, flex: 1 }}>
          {t('workers:deleteBranch.confirm', { name: branch?.name })}
        </Typography>
      </DialogContent>

      <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'flex-start', px: 3, pb: 3, pt: 1, mt: 2 }}>
        <Button
          variant="outlined"
          sx={{ borderColor: '#0029d9', color: '#0029d9', padding: '12px 22px' }}
          onClick={onClose}>
          {t('common:actions.cancel')}
        </Button>
        <Button variant="contained" sx={{ bgcolor: '#0029d9', padding: '12px 22px', flex: 1 }} onClick={handleDelete}>
          {t('common:actions.delete')}
        </Button>
      </Box>
    </Dialog>
  )
}
