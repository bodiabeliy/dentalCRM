import { useCallback, useState } from 'react'
import { Box, Button, Dialog, DialogContent, Typography, CircularProgress } from '@mui/material'
import { useTranslation } from 'react-i18next'

import ClinicIcon from '../../../../shared/assets/icons/clinic.svg?react'
import { useAppDispatch } from '../../../../app/providers/store-helpers'
import { getClinicsAll, removeClinic } from '../../../../app/services/ClinicService'
import { getCurrentClinic } from '../../../../app/providers/reducers/ClinicSlice'
import type { IClinic } from '../../../../app/providers/types/clinic'
import { useNavigate } from 'react-router'
import { removeLastClinicId } from '../../../../shared/utils/storageUtils'

interface DeleteClinicDialogProps {
  open: boolean
  clinic: IClinic | null
  onClose: () => void
}

export function DeleteClinicDialog({ open = true, clinic, onClose }: DeleteClinicDialogProps) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [isDeleting, setIsDeleting] = useState(false)
  const { t } = useTranslation(['settings', 'common'])

  const handleDelete = useCallback(async () => {
    setIsDeleting(true)
    console.log('ss')

    // 1. First, delete the clinic
    const result = await dispatch(removeClinic())

    if (result?.success) {
      // 2. Reset current clinic in Redux
      dispatch(
        getCurrentClinic({
          id: '',
          name: '',
          sub_name: '',
          logo: '',
          currenciesIso: [],
          mainCurrencyIso: '',
          sub_address: '',
        })
      )

      // 3. Remove the last clinic ID from sessionStorage
      removeLastClinicId()

      // 4. Update the clinics list
      await dispatch(getClinicsAll())

      onClose()

      navigate('/', { replace: true })
    }
  }, [dispatch, navigate, onClose])

  return (
    <Dialog
      open={open}
      onClose={isDeleting ? undefined : onClose}
      maxWidth="sm"
      fullWidth
      disableEscapeKeyDown={isDeleting}>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2, background: '#f4f7fe' }}>
        <ClinicIcon style={{ color: '#0029d9', marginRight: 8 }} />
        <Typography variant="h6" sx={{ fontWeight: 500, flex: 1 }}>
          {t('settings:clinicProfile.deleteDialog.title')}
        </Typography>
      </Box>
      <DialogContent sx={{ pb: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="body1" sx={{ fontWeight: 500, flex: 1 }}>
          {t('settings:clinicProfile.deleteDialog.confirm', { name: clinic?.name })}
        </Typography>

        <Typography variant="body2" sx={{ color: '#666' }}>
          {t('settings:clinicProfile.deleteDialog.warning')}
        </Typography>
      </DialogContent>

      <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'flex-start', px: 3, pb: 3, pt: 1, mt: 2 }}>
        <Button
          variant="outlined"
          sx={{ borderColor: '#0029d9', color: '#0029d9', padding: '12px 22px' }}
          onClick={onClose}
          disabled={isDeleting}>
          {t('common:actions.cancel')}
        </Button>
        <Button
          variant="contained"
          sx={{ bgcolor: 'red', padding: '12px 22px', flex: 1 }}
          onClick={handleDelete}
          disabled={isDeleting}>
          {isDeleting ? (
            <>
              <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
              {t('common:status.deleting')}
            </>
          ) : (
            t('common:actions.delete')
          )}
        </Button>
      </Box>
    </Dialog>
  )
}
