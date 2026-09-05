import { useState, useCallback } from 'react'
import { Dialog, DialogContent, Box, Typography, TextField, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import WorkerIcon from '../../../../shared/assets/icons/settings/workers.svg?react'
import { useAppDispatch, useAppSelector } from '../../../../app/providers/store-helpers'
import { createSubClinic } from '../../../../app/services/SubClinicService'
import { clinicSelector } from '../../../../app/providers/reducers/ClinicSlice'
import type { ISubClinic } from '../../../../app/providers/types/clinic'

interface AddBranchDialogProps {
  open: boolean
  onClose: () => void
  onSave: (branch: ISubClinic) => void
}

export function AddBranchDialog({ open, onClose, onSave }: AddBranchDialogProps) {
  const dispatch = useAppDispatch()
  const currentClinic = useAppSelector(clinicSelector)
  const { t } = useTranslation(['workers', 'common'])
  const [formData, setFormData] = useState({
    name: '',
    address: '',
  })

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }))
  }

  const handleSave = useCallback(() => {
    if (formData.name.trim()) {
      const newBranch = {
        id: '', // Temporary id, will be replaced by server response
        name: formData.name,
        address: formData.address,
        clinicId: currentClinic?.id || 0,
      }

      // Create the subclinic and let the parent component handle refresh
      dispatch(createSubClinic(newBranch)).then((result) => {
        if (result && result.success) {
          // Call onSave with the server response data if available
          onSave(
            result.data || {
              id: '', // This will be assigned by the server
              name: formData.name,
              address: formData.address,
              usersCount: 0,
            }
          )

          // Reset form
          setFormData({
            name: '',
            address: '',
          })

          onClose()
        }
      })
    }
  }, [formData, currentClinic, dispatch, onSave, onClose])

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2, background: '#f4f7fe' }}>
        <WorkerIcon style={{ color: '#0029d9', marginRight: 8 }} />
        <Typography variant="h6" sx={{ fontWeight: 500, flex: 1 }}>
          {t('workers:branches.addTitle')}
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
