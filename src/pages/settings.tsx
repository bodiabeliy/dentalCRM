import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  useMediaQuery,
  useTheme,
  IconButton,
  InputAdornment,
} from '@mui/material'
import type { SelectChangeEvent } from '@mui/material/Select'
import PhoneInput from 'react-phone-number-input'
import MuiPhoneInput from '../shared/components/ui/mui-phone-input/mui-phone-input'
import { SidebarLayout } from '../shared'
import AvatarImage from '../shared/assets/images/avatar.png'

import MoreVerticalIcon from '../shared/assets/icons/more-vertical.svg?react'
import BellIcon from '../shared/assets/icons/bell.svg?react'
import { getUser } from '../app/services/UserService'
import { useAppDispatch, useAppSelector } from '../app/providers/store-helpers'
import { userSelector } from '../app/providers/reducers/UserSlice'
import { useFormValidation } from '../shared/hooks/use-form-field'
import type { IProfile, IUser, Language } from '../app/providers/types/user'
import { systemLanguage } from '../app/constants'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { updateUserProfile, uploadProfileImage } from '../app/services/ProfileService'
import i18n from '../shared/utils/i18n'

export default function SettingsPage() {
  const { t } = useTranslation(['settings', 'common', 'errors'])
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const dispatch = useAppDispatch()
  const currentUser = useAppSelector(userSelector)
  const userAvatar = currentUser.photo ? `${process.env.STATIC_FILES_URL + currentUser.photo}` : AvatarImage

  // console.log('currentUser', currentUser)

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  const validateSignUp = (data: IUser) => ({
    firstname: !data.firstname.trim()
      ? t('validation.required', { ns: 'errors' })
      : /^[a-zA-Zа-яА-ЯёЁіІїЇєЄ'’\- ]+$/u.test(data.firstname)
        ? ''
        : t('validation.onlyLettersSpaces', { ns: 'errors' }),
    lastname: !data.lastname.trim()
      ? t('validation.required', { ns: 'errors' })
      : /^[a-zA-Zа-яА-ЯёЁіІїЇєЄ'’\- ]+$/i.test(data.lastname)
        ? ''
        : t('validation.onlyLettersSpaces', { ns: 'errors' }),
    surname: !data.surname.trim()
      ? t('validation.required', { ns: 'errors' })
      : /^[a-zA-Zа-яА-ЯёЁіІїЇєЄ'’\- ]+$/i.test(data.surname)
        ? ''
        : t('validation.onlyLettersSpaces', { ns: 'errors' }),
    phone: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/.test(data.phone)
      ? ''
      : t('validation.invalidPhone', { ns: 'errors' }),
    email: !data.email.trim()
      ? t('validation.required', { ns: 'errors' })
      : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())
        ? ''
        : t('validation.invalidEmail', { ns: 'errors' }),
    password: !data.password?.trim()
      ? t('validation.required', { ns: 'errors' })
      : data?.password?.length < 8
        ? t('validation.min8', { ns: 'errors' })
        : '',
  })
  const { formData, setFormData, handleFieldChange, errors } = useFormValidation<IUser>(
    {
      firstname: '',
      lastname: '',
      surname: '',
      phone: '',
      email: '',
      password: '',
      lang: '',
    },
    validateSignUp
  )

  // Helpers to map UI values (UKR/UK) to backend/i18n codes (uk/en) and back
  const toLangCode = useCallback((name?: string) => {
    const original = (name || '').trim()
    const upper = original.toUpperCase()
    const norm = original.toLowerCase()
    // UI option names
    if (upper === 'UKR') return 'uk'
    if (upper === 'UK') return 'en'
    // ISO codes or human titles
    if (norm === 'uk' || norm === 'українська' || norm === 'ukrainian') return 'uk'
    if (norm === 'en' || norm === 'english') return 'en'
    // Fallback: try matching systemLanguage by title/name
    const match = systemLanguage.find((l) => l.title.toLowerCase() === norm || l.name.toLowerCase() === norm)
    if (match) return match.name.toUpperCase() === 'UKR' ? 'uk' : 'en'
    return norm
  }, [])

  const toLangName = useCallback((code?: string) => {
    const norm = (code || '').toLowerCase().trim()
    // Map ISO codes to UI names
    if (norm === 'uk') return 'UKR'
    if (norm === 'en') return 'UK'
    // Accept already-in-UI-name values
    if (norm === 'ukr' || norm === 'uk') return norm.toUpperCase() as 'UKR' | 'UK'
    // Map localized or titled values to UI names
    if (norm === 'українська' || norm === 'ukrainian') return 'UKR'
    if (norm === 'english') return 'UK'
    // Fallback: try systemLanguage titles
    const match = systemLanguage.find((l) => l.title.toLowerCase() === norm || l.name.toLowerCase() === norm)
    if (match) return match.name
    return (code || '').toUpperCase()
  }, [])

  useEffect(() => {
    if (currentUser) {
      let stored: string | null = null
      try {
        stored = sessionStorage.getItem('appLanguage')
      } catch {
        // ignore storage errors
      }
      const i18nCode = (i18n.language || '').split('-')[0]
      const preferred = stored || i18nCode || currentUser.lang
      const uiLang = toLangName(preferred) || systemLanguage[0]?.name
      setFormData({
        firstname: currentUser.firstname,
        lastname: currentUser.lastname,
        surname: currentUser.surname,
        phone: currentUser.phone,
        email: currentUser.email,
        password: currentUser.password,
        lang: uiLang!,
      })
    }
  }, [currentUser, setFormData, toLangName, i18n.language])

  const [newPassword, setNewPassword] = useState('')
  const [repeatedPassword, setRepeatedPassword] = useState('')

  // showing password section

  // main password
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  // main new pass
  const [showUpdatedPassword, setShowUptatedPassword] = useState(false)
  const handleClickShowUpdatedPassword = () => setShowUptatedPassword((show) => !show)

  const handleMouseDownUpdatedPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const handleMouseUpUpdatedPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  // main new pass
  const [showRepeatedUpdatedPassword, setShowRepeateUptatedPassword] = useState(false)
  const handleClickShowRepeateUpdatedfPassword = () => setShowRepeateUptatedPassword((show) => !show)

  const handleMouseDownRepeateUpdatedPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const handleMouseUpRepeateUpdatedPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  // lang change handler
  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    const uiName = event.target.value as string // e.g., 'UKR' or 'UK'
    handleFieldChange('lang', uiName)
    const i18nLang = toLangCode(uiName)
    i18n.changeLanguage(i18nLang)
    try {
      sessionStorage.setItem('appLanguage', i18nLang)
    } catch {
      // ignore storage errors (privacy mode or disabled storage)
    }
  }

  const resetForm = () => {
    setFormData({
      firstname: currentUser?.firstname,
      lastname: currentUser?.lastname,
      surname: currentUser.surname,
      phone: currentUser.phone,
      email: currentUser.email,
      password: currentUser.password,
      lang: toLangName(currentUser?.lang),
    })
    setNewPassword('')
    setRepeatedPassword('')
  }

  // upload file
  const UploadFiles = useCallback(
    async (uploadedFile: File) => {
      if (uploadedFile) {
        await dispatch(uploadProfileImage(uploadedFile)) // Wait for image upload to finish
        const updateProfile: IProfile = {
          ...currentUser,
          photo: formData.photo,
        }
        await dispatch(updateUserProfile(updateProfile))
        // await dispatch(getUser()) // Fetch updated user data
      }
    },
    [currentUser, formData, dispatch]
  )

  const formSubmit = useCallback(async () => {
    const updateProfile: IProfile = {
      firstname: formData?.firstname,
      lastname: formData?.lastname,
      surname: formData.surname,
      email: formData.email,
      phone: formData.phone,
      lang: toLangCode(formData?.lang),
      photo: formData.photo,
      current_password: formData.password,
      new_password: newPassword ? newPassword : formData.password,
      repeat_password: repeatedPassword ? repeatedPassword : formData.password,
      password: formData.password,
    }

    await dispatch(updateUserProfile(updateProfile))
  }, [formData, newPassword, repeatedPassword, dispatch, toLangCode])

  return (
    <SidebarLayout
      title={t('settings:profile.title')}
      rightSidebar={
        <>
          <IconButton
            sx={{
              background: '#f5f7fe',
              border: '1px solid rgba(0, 41, 217, 0.3)',
              borderRadius: '8px',
              width: '40px',
              height: '40px',
            }}>
            <MoreVerticalIcon style={{ color: '#8a4bdc' }} />
          </IconButton>
          <IconButton
            sx={{
              background: '#8a4bdc',
              borderRadius: '8px',
              width: '40px',
              height: '40px',
            }}>
            <BellIcon style={{ color: 'white' }} />
          </IconButton>
        </>
      }>
      <Box
        sx={{
          maxWidth: 950,
          mx: 'auto',
          mt: isMobile ? 2 : 4,
          bgcolor: 'white',
          borderRadius: 3,
          boxShadow: isMobile ? 0 : 2,
          p: isMobile ? 2 : 4,
          width: '100%',
        }}>
        <Typography variant="h6" sx={{ fontWeight: 500, mb: 2 }}>
          {t('settings:profile.profilePhoto')}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <img src={userAvatar} style={{ width: 40, height: 40, borderRadius: '8px', marginRight: '12px' }} />
          <Button variant="text" sx={{ color: '#0029d9', fontWeight: 500, textTransform: 'uppercase' }}>
            {t('settings:profile.change').toUpperCase()}
          </Button>
          <TextField
            sx={{ transform: 'translate(-80px)', opacity: 0, maxWidth: '200px' }}
            id="outlined-basic"
            type="file"
            inputProps={{
              multiple: false,
            }}
            onChange={(event) => {
              const file = (event.target as HTMLInputElement).files?.[0]
              if (file) UploadFiles(file)
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <TextField
            label={t('settings:profile.firstName')}
            fullWidth
            value={formData?.firstname}
            onChange={(event) => handleFieldChange('firstname', event.target.value)}
            error={!!errors.firstname}
            helperText={errors.firstname}
          />
          <TextField
            label={t('settings:profile.lastName')}
            fullWidth
            value={formData?.lastname}
            onChange={(event) => handleFieldChange('lastname', event.target.value)}
            error={!!errors.lastname}
            helperText={errors.lastname}
          />
        </Box>
        <TextField
          label={t('settings:profile.middleName')}
          fullWidth
          sx={{ mb: 4 }}
          value={formData?.surname}
          onChange={(event) => handleFieldChange('surname', event.target.value)}
          error={!!errors.surname}
          helperText={errors.surname}
        />
        {!isMobile ? (
          <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
            <TextField
              label={t('settings:profile.email')}
              fullWidth
              value={formData?.email}
              onChange={(event) => handleFieldChange('email', event.target.value)}
              error={!!errors.email}
              helperText={errors.email}
            />
            <PhoneInput
              id="phone-input-profile"
              placeholder={t('settings:profile.phonePlaceholder')}
              value={formData?.phone}
              defaultCountry="UA"
              onChange={(value) => handleFieldChange('phone', value ?? '')}
              displayInitialValueAsLocal
              international={false}
              withCountryCallingCode={false}
              maxLength={15}
              countrySelectComponent={MuiPhoneInput}
            />
          </Box>
        ) : (
          <>
            <TextField
              sx={{ mb: 4 }}
              label={t('settings:profile.email')}
              fullWidth
              value={formData?.email}
              onChange={(event) => handleFieldChange('email', event.target.value)}
              error={!!errors.email}
              helperText={errors.email}
            />
          </>
        )}

        <FormControl sx={{ mt: 4 }} fullWidth>
          <InputLabel>{t('settings:profile.interfaceLanguage')}</InputLabel>
          <Select value={formData.lang} label={t('settings:profile.interfaceLanguage')} onChange={handleLanguageChange}>
            {systemLanguage?.map((currentLanguage: Language) => (
              <MenuItem key={currentLanguage.name} value={currentLanguage.name} disabled={!currentLanguage.isAvialable}>
                {currentLanguage.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography variant="h6" sx={{ fontWeight: 500, mt: 3, mb: 2 }}>
          {t('settings:profile.changePassword')}
        </Typography>
        <TextField
          label={t('settings:profile.currentPassword')}
          fullWidth
          sx={{ mb: 4 }}
          value={formData.password}
          onChange={(event) => handleFieldChange('password', event.target.value)}
          // error={!!errors.password}
          // helperText={errors.password}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={showPassword ? t('common:aria.hidePassword') : t('common:aria.showPassword')}
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpUpdatedPassword}
                  edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label={t('settings:profile.newPassword')}
          fullWidth
          sx={{ mb: 4 }}
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
          type={showUpdatedPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={showUpdatedPassword ? t('common:aria.hidePassword') : t('common:aria.showPassword')}
                  onClick={handleClickShowUpdatedPassword}
                  onMouseDown={handleMouseDownUpdatedPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end">
                  {showUpdatedPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label={t('settings:profile.repeatPassword')}
          fullWidth
          sx={{ mb: 4 }}
          value={repeatedPassword}
          onChange={(event) => setRepeatedPassword(event.target.value)}
          error={newPassword != repeatedPassword}
          helperText={newPassword != repeatedPassword && t('settings:profile.passwordsMismatch')}
          type={showRepeatedUpdatedPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showRepeatedUpdatedPassword ? t('common:aria.hidePassword') : t('common:aria.showPassword')
                  }
                  onClick={handleClickShowRepeateUpdatedfPassword}
                  onMouseDown={handleMouseDownRepeateUpdatedPassword}
                  onMouseUp={handleMouseUpRepeateUpdatedPassword}
                  edge="end">
                  {showRepeatedUpdatedPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-start' }}>
          <Button variant="outlined" onClick={() => resetForm()}>
            {t('common:actions.cancel')}
          </Button>
          <Button variant="contained" onClick={() => formSubmit()} sx={{ bgcolor: '#0029d9' }}>
            {t('settings:profile.saveChanges')}
          </Button>
        </Box>
      </Box>
    </SidebarLayout>
  )
}
