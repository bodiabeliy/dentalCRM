import { useState, useEffect, useCallback } from 'react'
import { Dialog, DialogContent, Box, Typography, TextField, Button } from '@mui/material'
import WorkerIcon from '../../../../shared/assets/icons/settings/workers.svg?react'
import { useAppDispatch } from '../../../../app/providers/store-helpers'
import { editSubClinic } from '../../../../app/services/SubClinicService'
import type { ISubClinic } from '../../../../app/providers/types/clinic'
import { useTranslation } from 'react-i18next'

interface EditBranchDialogProps {
  open: boolean
  branch: ISubClinic | null
  onClose: () => void
  onSave: (branch: ISubClinic) => void
}

export function EditBranchDialog({ open, branch, onClose, onSave }: EditBranchDialogProps) {
  const dispatch = useAppDispatch()
  const { t } = useTranslation(['workers', 'common'])
  const [formData, setFormData] = useState<ISubClinic>({
    id: '',
    name: '',
    address: '',
    usersCount: 0,
  })

  useEffect(() => {
    if (branch) {
      setFormData({
        id: branch.id,
        name: branch.name,
        address: branch.address || '',
        usersCount: branch.usersCount,
      })
    }
  }, [branch])

  const handleChange = (field: keyof ISubClinic) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }))
  }

  const handleSave = useCallback(() => {
    if (formData.id) {
      dispatch(editSubClinic(formData))
      onSave(formData)
      onClose()
    }
  }, [formData, dispatch, onSave, onClose])

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2, background: '#f4f7fe' }}>
        <WorkerIcon style={{ color: '#0029d9', marginRight: 8 }} />
        <Typography variant="h6" sx={{ fontWeight: 500, flex: 1 }}>
          {t('workers:branches.editTitle')}
        </Typography>
      </Box>
      <DialogContent sx={{ pb: 0 }}>
        <TextField
          label={t('workers:branches.nameLabel')}
          fullWidth
          sx={{ background: '#fff', borderRadius: 2, mt: 2 }}
          value={formData.name}
          onChange={handleChange('name')}
        />
        <TextField
          label={t('workers:branches.addressLabel')}
          fullWidth
          sx={{ background: '#fff', borderRadius: 2, my: 2 }}
          value={formData.address}
          onChange={handleChange('address')}
        />
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
