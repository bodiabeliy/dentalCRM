import { useState, useEffect, useCallback } from 'react'
import { Dialog, DialogContent, Box, Typography, TextField, Button, Checkbox, FormControlLabel } from '@mui/material'
import { useTranslation } from 'react-i18next'
import RoleIcon from '../../../../shared/assets/icons/settings/workers.svg?react' // Using the worker icon for now
import { useAppDispatch } from '../../../../app/providers/store-helpers'
import { setRolePermissions } from '../../../../app/services/RoleService'
import type { IRole, IRolePermition } from '../../../../app/providers/types/role'

interface EditPermissionDialogProps {
  open: boolean
  role: IRole | null
  onClose: () => void
  onSave: (role: IRole) => void
}

export function EditPermissionDialog({ open, role, onClose, onSave }: EditPermissionDialogProps) {
  const dispatch = useAppDispatch()
  const { t } = useTranslation(['workers', 'common'])
  const [formData, setFormData] = useState<IRole>({
    id: 0,
    name: '',
    code: '',
    order: 0,
    permissions: [],
  })

  useEffect(() => {
    if (role) {
      setFormData({
        id: role.id,
        name: role.name,
        code: role.code,
        order: role.order,
        permissions: [...role.permissions],
      })
    }
  }, [role])

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      name: e.target.value,
    }))
  }

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      code: e.target.value,
    }))
  }

  const handlePermissionChange = (permission: IRolePermition) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.map((p) => (p.id === permission.id ? { ...p, assigned: !p.assigned } : p)),
    }))
  }

  const handleSave = useCallback(() => {
    if (formData.id) {
      dispatch(setRolePermissions(formData.id, formData.permissions))
      onSave(formData)
      onClose()
    }
  }, [formData, dispatch, onSave, onClose])

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2, background: '#f4f7fe' }}>
        <RoleIcon style={{ color: '#0029d9', marginRight: 8 }} />
        <Typography variant="h6" sx={{ fontWeight: 500, flex: 1 }}>
          {role ? t('workers:permissions.editRoleTitle') : t('workers:permissions.addRoleTitle')}
        </Typography>
      </Box>
      <DialogContent sx={{ pb: 0 }}>
        <TextField
          label={t('workers:permissions.roleName')}
          fullWidth
          sx={{ background: '#fff', borderRadius: 2, mt: 2 }}
          value={formData.name}
          onChange={handleNameChange}
        />
        <TextField
          label={t('workers:permissions.roleCode')}
          fullWidth
          sx={{ background: '#fff', borderRadius: 2, my: 2 }}
          value={formData.code}
          onChange={handleCodeChange}
        />

        <Typography variant="h6" sx={{ fontWeight: 500, mt: 3, mb: 1 }}>
          {t('workers:permissions.title')}
        </Typography>

        <Box sx={{ maxHeight: '300px', overflowY: 'auto', mt: 2, mb: 2 }}>
          {formData.permissions.map((permission) => (
            <FormControlLabel
              key={permission.id}
              control={
                <Checkbox checked={permission.assigned || false} onChange={() => handlePermissionChange(permission)} />
              }
              label={
                <Box>
                  <Typography variant="body1">{permission.code}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {permission.description}
                  </Typography>
                </Box>
              }
              sx={{ display: 'block', mb: 1 }}
            />
          ))}
        </Box>
      </DialogContent>
      <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'flex-start', px: 3, pb: 3, pt: 1 }}>
        <Button
          variant="outlined"
          sx={{ borderColor: '#0029d9', color: '#0029d9', padding: '12px 22px' }}
          onClick={onClose}>
          {t('common:actions.cancel')}
        </Button>
        <Button
          variant="contained"
          sx={{ bgcolor: '#0029d9', padding: '12px 22px', flex: 1 }}
          onClick={handleSave}
          disabled={!formData.name.trim()}>
          {t('common:actions.save')}
        </Button>
      </Box>
    </Dialog>
  )
}
