import { Link, useLocation, useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'

import { Typography, Button, InputAdornment, TextField, Box, useTheme, IconButton } from '@mui/material'
import loginBg from '../shared/assets/images/login-bg.png'
import LogoIcon from '../shared/assets/icons/logo.svg?react'
import { getSignUpRoute } from '../shared/types/routes'
import { useMediaQuery } from '@mui/material'
import { useAppDispatch } from '../app/providers/store-helpers'
import { useFormValidation } from '../shared/hooks/use-form-field'
import type { IUserRecoveryPassword } from '../app/providers/types/user'
import { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { resetPassword } from '../app/services/UserService'
// Toasts are handled globally
// import { notificationMessageSelector } from '../app/providers/reducers/UserSlice'

export function RecoveryPasswordPage() {
  const { t } = useTranslation(['auth', 'errors'])
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const navigate = useNavigate()
  const location = useLocation()
  // const notificationMessage = useAppSelector(notificationMessageSelector)

  const recoveryCode = location?.state?.formData?.code
  const recoveryEmail = location?.state?.formData?.email

  const dispatch = useAppDispatch()

  const validateSignUp = (data: IUserRecoveryPassword) => ({
    password: !data.password
      ? t('validation.required', { ns: 'errors' })
      : data.password.length < 8
        ? t('validation.min8', { ns: 'errors' })
        : !/[A-Za-z]/.test(data.password) || !/[0-9]/.test(data.password)
          ? t('validation.passwordLettersDigits', { ns: 'errors' })
          : '',
    recoveryPassword: !data.password
      ? t('validation.required', { ns: 'errors' })
      : data.password.length < 8
        ? t('validation.min8', { ns: 'errors' })
        : !/[A-Za-z]/.test(data.password) || !/[0-9]/.test(data.password)
          ? t('validation.passwordLettersDigits', { ns: 'errors' })
          : '',
  })

  const { formData, handleFieldChange, isReadyForSubmit } = useFormValidation<IUserRecoveryPassword>(
    {
      password: '',
      recoveryPassword: '',
    },
    validateSignUp
  )

  const [showPassword, setShowPassword] = useState(false)
  const [showRecoveryPassword, setShowRecoveryPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleClickShowRecoveryPassword = () => setShowRecoveryPassword((show) => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }
  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const submitForm = async () => {
    await dispatch(resetPassword(recoveryEmail, recoveryCode, formData?.password))
    await navigate('/')
    // toast.success(notificationMessage)
  }

  return (
    <Box
      sx={{
        backgroundImage: isMobile ? 'none' : `url(${loginBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: isMobile ? 'rgba(255, 255, 255, 1)' : 'none',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
      }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '66px',
          justifySelf: 'flex-start',
        }}>
        <LogoIcon />
      </Box>
      <Box
        sx={{
          maxWidth: 600,
          width: '100%',
          mx: 'auto',
          my: isMobile ? 0 : 'auto',
          mt: isMobile ? 2 : 'auto',
          bgcolor: 'background.paper',
          borderRadius: 3,
          boxShadow: isMobile ? 0 : 3,
          p: isMobile ? 2 : 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
        }}>
        <Typography variant="h5" color="rgba(21, 22, 24, 0.87)">
          {t('recovery.title', { ns: 'auth' })}
        </Typography>
        <Typography variant="body1" color="rgba(21, 22, 24, 0.6);" gutterBottom>
          {t('recovery.subtitle', { ns: 'auth' })}
        </Typography>
        <form style={{ width: '100%', marginTop: '16px' }}>
          <TextField
            label={t('recovery.password', { ns: 'auth' })}
            variant="outlined"
            fullWidth
            value={formData.password}
            onChange={(event) => handleFieldChange('password', event.target.value)}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showPassword ? 'hide the password' : 'display the password'}
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            sx={{ mt: 2 }}
            label={t('recovery.repeatPassword', { ns: 'auth' })}
            variant="outlined"
            fullWidth
            value={formData.recoveryPassword}
            onChange={(event) => handleFieldChange('recoveryPassword', event.target.value)}
            type={showRecoveryPassword ? 'text' : 'password'}
            error={formData.password != formData.recoveryPassword}
            helperText={formData.password != formData.recoveryPassword && t('recovery.notMatch', { ns: 'auth' })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showRecoveryPassword ? 'hide the password' : 'display the password'}
                    onClick={handleClickShowRecoveryPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end">
                    {showRecoveryPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            variant="contained"
            color="primary"
            disabled={!isReadyForSubmit || formData.password != formData.recoveryPassword}
            fullWidth
            onClick={() => submitForm()}
            sx={{
              mb: 2,
              mt: 4,
              padding: '12px 22px',
              boxShadow:
                '0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)',
              textTransform: 'uppercase',
            }}>
            {t('recovery.submit', { ns: 'auth' })}
          </Button>
        </form>
        <Typography variant="body2" align="left" sx={{ mt: 1, color: 'rgba(21, 22, 24, 0.6)' }}>
          {t('login.noAccount', { ns: 'auth' })}
          <Link
            to={getSignUpRoute()}
            style={{
              color: '#0029d9',
              textDecoration: 'underline',
              textDecorationColor: '#99a9f0',
              marginLeft: '4px',
            }}>
            {t('login.signUp', { ns: 'auth' })}
          </Link>
        </Typography>
      </Box>
    </Box>
  )
}
