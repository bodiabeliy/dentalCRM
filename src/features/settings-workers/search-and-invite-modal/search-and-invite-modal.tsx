import { useCallback, useState, type ChangeEvent, useEffect } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
  Avatar,
  IconButton,
} from '@mui/material'

import StuffIcon from '../../../shared/assets/icons/lead.svg?react'
import ColorIcon from '../../../shared/assets/icons/status.svg?react'
import ErrorSearchIcon from '../../../shared/assets/icons/error-search.svg?react'
import SuccessSearchIcon from '../../../shared/assets/icons/success-error.svg?react'

import {} from '@mui/x-date-pickers'
import { useTranslation } from 'react-i18next'
import type { IStaff, IStaffInvited } from '../../../app/providers/types/stuff'
import { useFormValidation } from '../../../shared/hooks/use-form-field'
import { getAllStuffs, getStuffProfileByEmail } from '../../../app/services/StaffService'
import { useAppDispatch, useAppSelector } from '../../../app/providers/store-helpers'
import { isLoadingSelector, staffSelector } from '../../../app/providers/reducers/StaffSlice'
import useDebounce from '../../../shared/hooks/useDebounce'
import { getAllRoles } from '../../../app/services/RoleService'
import { rolesSelector } from '../../../app/providers/reducers/RoleSlice'
import { subClinicSelector } from '../../../app/providers/reducers/SubClinicSlice'
import { getAllSubClinics } from '../../../app/services/SubClinicService'
import { createInvites, getClinicRefercies } from '../../../app/services/ClinicService'
import { clinicRefernciesSelector, clinicSelector } from '../../../app/providers/reducers/ClinicSlice'
// import { useAppDispatch } from '../../../app/providers/store-helpers'

interface CreationModalProps {
  open: boolean
  onClose: () => void
  onSave: (data: IStaff) => void
}

export function SearchAndInviteModal({ open = true, onClose }: CreationModalProps) {
  const dispatch = useAppDispatch()
  const searchAndInvitedUser = useAppSelector(staffSelector) as unknown as IStaff[]
  const isSearchLoading = useAppSelector(isLoadingSelector)
  const currentClinic = useAppSelector(clinicSelector)
  // const staffList = useAppSelector(staffsSelector)

  // console.log("staffList", staffList);

  const rolesList = useAppSelector(rolesSelector)
  const subClinicsList = useAppSelector(subClinicSelector)
  const clinicReferencies = useAppSelector(clinicRefernciesSelector)

  const [isFinded, setIsFinded] = useState(false)
  const [searchEmail, setSearchEmail] = useState('')
  const { t } = useTranslation(['workers', 'common', 'errors'])

  useEffect(() => {
    dispatch(getAllRoles())
    dispatch(getAllSubClinics())
    dispatch(getAllStuffs())
  }, [dispatch])

  useEffect(() => {
    dispatch(getAllSubClinics())
  }, [currentClinic, dispatch])

  useEffect(() => {
    dispatch(getClinicRefercies())
  }, [dispatch])

  // Debounce the search input to wait for user to stop typing (500ms)
  const debouncedSearchEmail = useDebounce(searchEmail, 500)

  const validateSignUp = (data: IStaff) => ({
    id: '',
    firstname: !data.firstname.trim() ? t('validation.required', { ns: 'errors' }) : '',
    lastname: '',
    surname: '',
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data?.email?.trim()) ? '' : t('validation.invalidEmail', { ns: 'errors' }),
    role: '',
  })
  const { formData, handleFieldChange, errors } = useFormValidation<IStaff>(
    {
      id: 1,
      firstname: '',
      lastname: '',
      surname: '',
      email: '',
      role: '',
      roles: { id: 0, name: '' },
      subclinics: { id: 0, name: '' },
      colors: {
        id: 0,
        name: '',
        color: '',
      },
    },
    validateSignUp
  )

  // Effect to call API when debounced email changes
  useEffect(() => {
    if (debouncedSearchEmail && !errors.email) {
      dispatch(getStuffProfileByEmail(debouncedSearchEmail))
    }
  }, [debouncedSearchEmail, dispatch, errors.email])

  const openSearchAndInvitedUserForm = useCallback(() => {
    setIsFinded(true)
  }, [])

  const formSubmit = useCallback(() => {
    const invitedForm: IStaffInvited = {
      email: searchAndInvitedUser[0]?.email,
      roleId: formData.roles?.id,
      subClinicId: formData.subclinics?.id,
      colorId: formData.colors?.id ? Number(formData.colors.id) : undefined,
    }
    dispatch(createInvites(invitedForm))

    // inline close to avoid stale ref and ordering issues
    setIsFinded(false)
    onClose()
  }, [formData, searchAndInvitedUser, dispatch, onClose])

  const findStuffByEmail = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value
      handleFieldChange('email', value)
      setSearchEmail(value)
    },
    [handleFieldChange]
  )

  const clearInput = useCallback(() => {
    handleFieldChange('email', '')
  }, [handleFieldChange])

  const closeModal = useCallback(() => {
    setIsFinded(false)
    onClose()
  }, [onClose])

  return (
    <>
      {}
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <Box sx={{ display: 'flex', alignItems: 'center', p: 2, background: '#f4f7fe' }}>
          <StuffIcon style={{ color: '#0029d9', marginRight: 8 }} />
          <Typography variant="h6" sx={{ fontWeight: 500, flex: 1 }}>
            {t('workers:tabs.workers')}
          </Typography>
        </Box>
        {!isFinded ? (
          <DialogContent sx={{ pb: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl>
              <TextField
                label="Email"
                fullWidth
                value={formData?.email}
                onChange={(event) => findStuffByEmail(event)}
                helperText={
                  isSearchLoading
                    ? t('workers:invite.searching')
                    : formData.email && !searchAndInvitedUser[0]?.email
                      ? t('workers:invite.notFound')
                      : ''
                }
                InputProps={{
                  endAdornment: (
                    <>
                      <InputAdornment position="end"></InputAdornment>
                      {!isSearchLoading && formData.email && !searchAndInvitedUser[0]?.email && (
                        <IconButton onClick={() => clearInput()}>
                          <ErrorSearchIcon />
                        </IconButton>
                      )}
                    </>
                  ),
                }}
              />
            </FormControl>
          </DialogContent>
        ) : (
          <DialogContent sx={{ pb: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl>
              <TextField
                label="Email"
                fullWidth
                value={searchAndInvitedUser[0]?.email}
                // onChange={(event) => handleFieldChange('email', event.target.value)}
                InputProps={{
                  endAdornment: (
                    <>
                      <InputAdornment position="end"></InputAdornment>
                      <SuccessSearchIcon />
                    </>
                  ),
                }}
              />
            </FormControl>
            <FormControl>
              <TextField
                label={t('workers:invite.employeeLabel')}
                value={`${searchAndInvitedUser[0]?.firstname} ${searchAndInvitedUser[0]?.lastname}`}
                // onChange={(event) => handleFieldChange('email', event.target.value)}
                fullWidth
                sx={{ background: '#fff', borderRadius: 2 }}
                InputProps={{
                  startAdornment: (
                    <>
                      <InputAdornment position="start"></InputAdornment>
                      {searchAndInvitedUser[0]?.photo ? (
                        <img
                          src={`${process.env.STATIC_FILES_URL ?? ''}${searchAndInvitedUser[0].photo}`}
                          style={{ width: 40, height: 40, fontSize: 28, borderRadius: '12px', marginRight: '15px' }}
                        />
                      ) : (
                        <Avatar
                          sx={{ width: 40, height: 40, marginRight: '12px', fontSize: 28, borderRadius: '12px' }}
                        />
                      )}
                    </>
                  ),
                }}
              />
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>{t('workers:invite.roleLabel')}</InputLabel>
              <Select
                value={formData.roles?.name || ''}
                label={t('workers:invite.roleLabel')}
                onChange={(e) => {
                  // Find the selected role object by name
                  const selectedRole = rolesList?.items?.find((role) => role.name === e.target.value)
                  if (selectedRole) {
                    // Update both the role string and roles object
                    handleFieldChange('role', selectedRole.name)
                    handleFieldChange('roles', {
                      id: selectedRole.id,
                      name: selectedRole.name,
                    })
                  }
                }}>
                {rolesList?.items.map((role) => (
                  <MenuItem key={role.id} value={role.name}>
                    {role.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>{t('workers:invite.branchLabel')}</InputLabel>
              <Select
                value={formData.subclinics?.name || ''}
                label={t('workers:invite.branchLabel')}
                onChange={(e) => {
                  // Find the selected subclinic object by name
                  const selectedSubClinic = subClinicsList.find((clinic) => clinic.name === e.target.value)
                  if (selectedSubClinic) {
                    // Update the entire subclinics object with id and name
                    handleFieldChange('subclinics', {
                      id: Number(selectedSubClinic.id),
                      name: selectedSubClinic.name,
                    })
                  }
                }}>
                {subClinicsList.map((subClinicItem) => (
                  <MenuItem key={subClinicItem.address} value={subClinicItem.name}>
                    {subClinicItem.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="color-label">{t('workers:invite.userColorLabel')}</InputLabel>
              <Select
                labelId="color-label"
                label={t('workers:invite.userColorLabel')}
                value={formData.colors?.name || ''}
                displayEmpty
                renderValue={(selected) => {
                  if (!selected) return ''
                  const selectedColor = clinicReferencies.clinicColors?.find((color) => color.name === selected)
                  if (!selectedColor) return selected
                  return (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <ColorIcon style={{ color: selectedColor.color }} />
                      {selectedColor.name}
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
                  const selectedColor = clinicReferencies.clinicColors?.find(
                    (colorOption) => colorOption.name === e.target.value
                  )
                  if (selectedColor) {
                    // Update colors object with proper id as number
                    handleFieldChange('colors', {
                      id: Number(selectedColor.id),
                      name: selectedColor.name,
                      color: selectedColor.color,
                    })
                    // Also set color string for backward compatibility
                    handleFieldChange('color', selectedColor.name)
                  }
                }}>
                {(clinicReferencies.clinicColors || []).map((colorOption) => (
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
          </DialogContent>
        )}

        <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'flex-start', px: 3, pb: 3, pt: 1, mt: 2 }}>
          <Button
            variant="outlined"
            sx={{ borderColor: '#0029d9', color: '#0029d9', padding: '12px 22px' }}
            onClick={() => closeModal()}>
            {t('common:actions.cancel')}
          </Button>
          <Button
            disabled={!formData.email.includes(searchAndInvitedUser[0]?.email)}
            variant="contained"
            sx={{ bgcolor: '#0029d9', padding: '12px 22px', flex: 1 }}
            onClick={!isFinded ? openSearchAndInvitedUserForm : () => formSubmit()}>
            {!isFinded ? t('workers:invite.searchButton') : t('workers:invite.inviteButton')}
          </Button>
        </Box>
      </Dialog>
    </>
  )
}
