import { useCallback } from 'react'
import { Box, Button, Dialog, DialogContent, Typography } from '@mui/material'

import RoleIcon from '../../../../shared/assets/icons/settings/workers.svg?react' // Using the worker icon for now
import { useAppDispatch } from '../../../../app/providers/store-helpers'
import { removeRoles } from '../../../../app/services/RoleService'
import type { IRole } from '../../../../app/providers/types/role'
import { useTranslation } from 'react-i18next'

interface DeletePermissionDialogProps {
  open: boolean
  role: IRole | null
  onClose: () => void
}

export function DeletePermissionDialog({ open = true, role, onClose }: DeletePermissionDialogProps) {
  const dispatch = useAppDispatch()
  const { t } = useTranslation(['workers', 'common'])

  const handleDelete = useCallback(async () => {
    if (role && role.id) {
      // We're passing 0 as permissionID as we're deleting the entire role
      // In a real implementation, you might want to update this based on actual API requirements
      await dispatch(removeRoles(role.id, 0))
      onClose()
    }
  }, [role, dispatch, onClose])

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2, background: '#f4f7fe' }}>
        <RoleIcon style={{ color: '#0029d9', marginRight: 8 }} />
        <Typography variant="h6" sx={{ fontWeight: 500, flex: 1 }}>
          {t('workers:permissions.deleteRoleTitle')}
        </Typography>
      </Box>
      <DialogContent sx={{ pb: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="body1" sx={{ fontWeight: 500, flex: 1 }}>
          {t('workers:permissions.deleteRoleConfirm', { name: role?.name })}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {t('workers:permissions.deleteRoleWarning')}
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
