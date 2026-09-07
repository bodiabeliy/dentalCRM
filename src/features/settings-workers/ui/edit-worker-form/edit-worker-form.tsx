import { useCallback, useEffect } from 'react'
import { Box, Button, TextField, MenuItem, Select, Typography, FormControl, InputLabel } from '@mui/material'
import ColorIcon from '../../../../shared/assets/icons/status.svg?react'
import type { IStaff } from '../../../../app/providers/types/stuff'
import { useFormValidation } from '../../../../shared/hooks/use-form-field'
import { useAppDispatch, useAppSelector } from '../../../../app/providers/store-helpers'
import { getCurrentStuff, staffSelector } from '../../../../app/providers/reducers/StaffSlice'
import { updateStuffProfile } from '../../../../app/services/StaffService'
import { rolesSelector } from '../../../../app/providers/reducers/RoleSlice'
import { clinicRefernciesSelector, clinicSelector } from '../../../../app/providers/reducers/ClinicSlice'
import AvatarImage from '../../../../shared/assets/images/avatar.png'
import { getClinicRefercies } from '../../../../app/services/ClinicService'
import { useTranslation } from 'react-i18next'

interface EditStaffFormProps {
  staff: IStaff
  onCancel: () => void
  onSave: (data: IStaff) => void
}

export function EditStaffForm({ onCancel, staff, onSave }: EditStaffFormProps) {
  const currentStaff = useAppSelector(staffSelector)
  const rolesList = useAppSelector(rolesSelector)
  const currentClinic = useAppSelector(clinicSelector)
  const clinicReferencies = useAppSelector(clinicRefernciesSelector)
  const userAvatar = currentStaff?.photo ? `${process.env.STATIC_FILES_URL + currentStaff?.photo}` : AvatarImage

  const dispatch = useAppDispatch()
  const { t } = useTranslation(['settings', 'workers', 'common'])

  useEffect(() => {
    dispatch(getClinicRefercies())
  }, [dispatch])

  const validateSignUp = () => ({
    id: '',
    firstname: '',
    lastname: '',
    surname: '',
    email: '',
    color: '',
    role: '',
  })

  const { formData, setFormData, handleFieldChange } = useFormValidation<IStaff>(
    {
      id: 0,
      firstname: '',
      lastname: '',
      surname: '',
      email: '',
      role: '',
      roles: { id: 0, name: '' },
      subclinics: { id: 0, name: '' },
      colors: {
        id: 0,
        color: '',
        name: '',
      },
      hourlyRate: 0,
      hourlyRate2: 0,
    },
    validateSignUp
  )

  // Initialize form data from staff/currentStaff
  useEffect(() => {
    if (currentStaff) {
      let colorsObject = currentStaff.colors
      if ((!colorsObject || !colorsObject.id) && currentStaff.color && clinicReferencies?.clinicColors?.length) {
        const matchingColor = clinicReferencies.clinicColors.find((color) => color.id === Number(currentStaff.color))

        if (matchingColor) {
          colorsObject = {
            id: matchingColor.id,
            name: matchingColor.name,
            color: matchingColor.color,
            order: matchingColor.order,
          }
        }
      }

      setFormData({
        id: currentStaff.id,
        firstname: currentStaff.firstname,
        lastname: currentStaff.lastname,
        surname: currentStaff.surname,
        email: currentStaff.email,
        phone: currentStaff.phone,
        role: currentStaff.role,
        subclinics: currentStaff.subclinics || { id: 0, name: '' },
        roles: currentStaff.roles || { id: 0, name: '' },
        colors: colorsObject,
        color: currentStaff.color, // Keep this for backward compatibility
        hourlyRate: currentStaff.hourlyRate || 0,
        hourlyRate2: currentStaff.hourlyRate2 || 0,
      })
    }
  }, [currentStaff, staff, setFormData, clinicReferencies])

  const formSubmit = useCallback(async () => {
    const updateStaff: IStaff = {
      id: currentStaff?.id || staff.id,
      firstname: formData.firstname,
      lastname: formData.lastname,
      surname: formData.surname,
      email: formData.email,
      phone: formData.phone,
      roles: formData.roles,
      subclinics: formData.subclinics,
      colors: formData?.colors,
      hourlyRate: formData.hourlyRate,
      hourlyRate2: formData.hourlyRate2,
      // Preserve other important fields that might be needed by the UI
      role: formData.roles?.name || currentStaff?.role || '',
      status: currentStaff?.status,
    }

    const result = await dispatch(updateStuffProfile(updateStaff))

    if (result?.success) {
      onSave(updateStaff)
      await dispatch(getCurrentStuff({ ...updateStaff }))
    }
  }, [currentStaff, formData, staff, dispatch, onSave])

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        p: 3,
        pt: 0,
        background: '#fff',
      }}>
      <Box sx={{ flexGrow: 1, minHeight: 0, overflow: 'auto' }}>
        <Typography fontWeight={600} fontSize={20}>
          {t('settings:profile.profilePhoto')}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
          <img src={userAvatar} style={{ width: 40, height: 40, borderRadius: '8px', marginRight: '12px' }} />
        </Box>
        <Box sx={{ display: 'flex', gap: 2, my: 4 }}>
          <TextField
            label={t('settings:profile.firstName')}
            value={formData?.firstname}
            onChange={(event) => handleFieldChange('firstname', event.target.value)}
            fullWidth
            disabled
          />
          <TextField
            label={t('settings:profile.lastName')}
            value={formData?.lastname}
            onChange={(event) => handleFieldChange('lastname', event.target.value)}
            fullWidth
            disabled
          />
        </Box>
        <TextField
          label={t('settings:profile.middleName')}
          value={formData?.surname}
          onChange={(event) => handleFieldChange('surname', event.target.value)}
          fullWidth
          sx={{ mb: 4 }}
          disabled
        />
        <TextField
          label="Email"
          value={formData?.email}
          onChange={(event) => handleFieldChange('email', event.target.value)}
          fullWidth
          sx={{ mb: 4 }}
          disabled
        />
        <TextField
          label={t('workers:editWorker.phoneLabel')}
          value={formData.phone || ''}
          onChange={(event) => handleFieldChange('phone', event.target.value)}
          fullWidth
          sx={{ mb: 4 }}
          disabled
          InputLabelProps={{ shrink: true }}
        />
        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <FormControl fullWidth>
            <InputLabel id="role-label">{t('workers:invite.roleLabel')}</InputLabel>
            <Select
              labelId="role-label"
              label={t('workers:invite.roleLabel')}
              value={formData?.roles?.name || ''}
              onChange={(e) => {
                // Find the selected role by name
                const selectedRole = rolesList?.items?.find((role) => role.name === e.target.value)
                if (selectedRole) {
                  // Update the roles object with id and name
                  handleFieldChange('roles', {
                    id: Number(selectedRole.id),
                    name: selectedRole.name,
                  })
                }
              }}>
              {clinicReferencies.roles.map((roleOption) => (
                <MenuItem key={roleOption.id} value={roleOption.name}>
                  {roleOption.name}
                </MenuItem>
              )) || []}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="branch-label">{t('workers:invite.branchLabel')}</InputLabel>
            <Select
              labelId="branch-label"
              label={t('workers:invite.branchLabel')}
              value={formData?.subclinics?.name || ''}
              onChange={(e) => {
                // Find the selected subclinic by name
                const selectedSubclinic = currentClinic?.subClinics?.find(
                  (subclinic) => subclinic.name === e.target.value
                )
                if (selectedSubclinic) {
                  // Update the subclinics object with id and name
                  handleFieldChange('subclinics', {
                    id: Number(selectedSubclinic.id),
                    name: selectedSubclinic.name,
                  })
                }
              }}>
              {clinicReferencies?.subClinics.map((branchOption) => (
                <MenuItem key={branchOption.id} value={branchOption.name}>
                  {branchOption.name}
                </MenuItem>
              )) || []}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            label={t('workers:editWorker.hourlyRate1', { defaultValue: 'Hourly rate 1' })}
            value={formData?.hourlyRate || ''}
            onChange={(event) => handleFieldChange('hourlyRate', Number(event.target.value))}
            fullWidth
            type="number"
          />
          <TextField
            label={t('workers:editWorker.hourlyRate2', { defaultValue: 'Hourly rate 2' })}
            value={formData?.hourlyRate2 || ''}
            onChange={(event) => handleFieldChange('hourlyRate2', Number(event.target.value))}
            fullWidth
            type="number"
          />
        </Box>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="color-label">{t('workers:invite.userColorLabel')}</InputLabel>
          <Select
            labelId="color-label"
            label={t('workers:invite.userColorLabel')}
            value={formData?.colors?.name || ''}
            displayEmpty
            renderValue={(selected) => {
              if (!selected) return ''
              const item = (clinicReferencies?.clinicColors || []).find((c) => c.name === selected)
              if (!item) return selected as string
              return (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ColorIcon style={{ color: item.color }} />
                  {item.name}
                </Box>
              )
            }}
            sx={{
              '& .MuiSelect-select': {
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              },
            }}
            onChange={(e) => {
              // Find the selected color by name
              const selectedColor = clinicReferencies?.clinicColors?.find(
                (colorOption) => colorOption.name === e.target.value
              )
              if (selectedColor) {
                // Update the full colors object
                handleFieldChange('colors', {
                  id: selectedColor.id,
                  name: selectedColor.name,
                  color: selectedColor.color,
                  order: selectedColor.order,
                })
                // Also set the color string for backward compatibility
                handleFieldChange('color', selectedColor.name)
              }
            }}>
            {(clinicReferencies?.clinicColors || []).map((colorOption) => (
              <MenuItem
                key={colorOption.id}
                value={colorOption.name}
                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <ColorIcon style={{ color: colorOption.color }} />
                {colorOption.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          mt: 2,
        }}>
        <Button variant="outlined" onClick={onCancel}>
          {t('common:actions.cancel')}
        </Button>

        <Button
          variant="contained"
          onClick={formSubmit}
          sx={{
            borderRadius: '8px',
            padding: '6px 16px',
            boxShadow:
              '0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)',
            background: '#0029d9',
            textTransform: 'uppercase',
          }}>
          {t('settings:profile.saveChanges')}
        </Button>
      </Box>
    </Box>
  )
}
