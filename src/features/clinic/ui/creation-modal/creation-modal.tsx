import { useCallback } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Typography,
  useTheme,
  TextField,
  DialogActions,
  useMediaQuery,
  InputAdornment,
  IconButton,
} from '@mui/material'
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined'
import FileUpload from '../../../../features/file-upload'
import type { IClinic } from '../../../../app/providers/types/clinic'
import { useAppDispatch, useAppSelector } from '../../../../app/providers/store-helpers'
import { clinicLogoSelector } from '../../../../app/providers/reducers/ClinicSlice'
import { useFormValidation } from '../../../../shared/hooks/use-form-field'
import { createClinic, getClinicsAll, uploadClinicImage } from '../../../../app/services/ClinicService'
import { useTranslation } from 'react-i18next'

interface CreationModalProps {
  open: boolean
  onClose: () => void
}

export function CreationModal({ open, onClose }: CreationModalProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const clinicLogo = useAppSelector(clinicLogoSelector)

  const dispatch = useAppDispatch()
  const { t } = useTranslation(['clinic', 'common', 'errors'])

  const validateSignUp = (data: IClinic) => ({
    id: '',
    name: !data.name.trim() ? t('errors:validation.required') : '',
    sub_name: !data.sub_name.trim() ? t('errors:validation.required') : '',
    sub_address: '',
    logo: !data.logo.trim() ? t('errors:validation.required') : '',
  })
  const { formData, handleFieldChange } = useFormValidation<IClinic>(
    {
      id: '',
      name: '',
      logo: '',
      sub_name: '',
      sub_address: '',
    },
    validateSignUp
  )

  const UploadFiles = useCallback(
    async (uploadedFile: File) => {
      if (uploadedFile) {
        await dispatch(uploadClinicImage(uploadedFile))
      }
    },
    [dispatch]
  )

  const formSubmit = useCallback(async () => {
    const createdClinic: IClinic = {
      name: formData.name,
      sub_name: formData.sub_name,
      sub_address: formData.sub_address,
      logo: clinicLogo,
    }
    const result = await dispatch(createClinic(createdClinic))
    if (result?.success) {
      await dispatch(getClinicsAll())
      onClose()
    } else {
      await dispatch(getClinicsAll())
    }
  }, [dispatch, formData, clinicLogo, onClose])

  return (
    <>
      <Dialog
        open={open}
        onClose={() => onClose()}
        PaperProps={{
          sx: {
            width: '100%',
            maxWidth: isMobile ? '100%' : 700,
            borderRadius: isMobile ? 0 : 2,
            m: 2,
            p: 0,
            background: '#fff',
            boxShadow: '0 4px 24px rgba(44,51,74,0.12)',
            display: 'flex',
            overflow: 'visible',
          },
        }}>
        <DialogTitle>
          <Typography variant="h5">{t('clinic:create.title')}</Typography>
        </DialogTitle>
        <DialogContent>
          <FormControl sx={{ width: '100%' }}>
            <TextField
              label={t('clinic:createForm.nameLabel')}
              fullWidth
              value={formData.name}
              onChange={(e) => handleFieldChange('name', e.target.value)}
              sx={{
                mt: 2,
              }}
              placeholder={t('clinic:createForm.namePlaceholder')}
            />
          </FormControl>
          <FormControl sx={{ width: '100%' }}>
            <TextField
              label={t('clinic:createForm.branchNameLabel')}
              fullWidth
              value={formData.sub_name}
              onChange={(e) => handleFieldChange('sub_name', e.target.value)}
              sx={{
                mt: 2,
              }}
              placeholder={t('clinic:createForm.branchNamePlaceholder')}
            />
          </FormControl>
          <FormControl sx={{ width: '100%' }}>
            <TextField
              label={t('clinic:createForm.branchAddressLabel')}
              fullWidth
              value={formData.sub_address}
              onChange={(e) => handleFieldChange('sub_address', e.target.value)}
              sx={{
                mt: 2,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="location" edge="end">
                      <FmdGoodOutlinedIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <Box sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex' }}>
              <Typography variant="h6">{t('clinic:createForm.uploadTitle')}</Typography>
              <Typography sx={{ ml: 1 }} variant="body1">
                {t('clinic:createForm.uploadHint')}
              </Typography>
            </Box>
            <FileUpload
              onFileChange={(file: File | null) => {
                if (file) UploadFiles(file)
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => formSubmit()}
            sx={{
              borderRadius: '8px',
              padding: '12px 22px',
              boxShadow:
                '0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)',
            }}>
            {t('common:actions.create')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
