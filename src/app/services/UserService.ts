import request from 'axios'

import $api from './api/index'
import {
  getCurrentUser,
  getCurrentUserNotification,
  getCurrentUserSuccess,
  isAuth,
} from '../providers/reducers/UserSlice'
import type { AppDispatch } from '../providers/store'
import type { IUser, IUserDto } from '../providers/types/user'

import { CONFIRMATION_TYPES } from './api/constants'
import { token } from '../../shared/utils/storageUtils'
import {
  notifyCreateSuccess,
  notifyLoginSuccess,
  notifyLogoutSuccess,
  notifySuccess,
  notifyError,
} from '../../shared/utils/toastUtils'

export const registerUser = (formData: IUser) => async (dispatch: AppDispatch) => {
  try {
    const response = await $api.post('/auth/register', formData)
    console.log('response rergister', response.data)
    dispatch(getCurrentUserSuccess())
    notifyCreateSuccess('Обліковий запис')
  } catch (error) {
    let errorMessage = ''
    if (request.isAxiosError(error) && error.response) {
      errorMessage = error.response?.data?.message
      dispatch(getCurrentUserNotification(errorMessage))
      notifyError(errorMessage)
    }
  }
}
export const login = (formData: IUserDto) => async (dispatch: AppDispatch) => {
  const { email, password } = formData
  try {
    const response = await $api.post(`/auth/login`, {
      email,
      password,
    })
    console.log('Login response:', response)

    // Store the access token in sessionStorage for API requests
    if (response.data.accessToken) {
      sessionStorage.setItem('token', response.data.accessToken)
      dispatch(isAuth(true))
      notifyLoginSuccess()
    } else {
      console.error('No access token received in login response')
    }

    // The refresh token will be automatically saved as HttpOnly cookie by the server
    // No need to manually set it with Cookies API

    return { success: true, data: response.data }
  } catch (error) {
    let errorMessage = ''
    if (request.isAxiosError(error) && error.response) {
      errorMessage = error.response?.data?.message
      dispatch(getCurrentUserNotification(errorMessage))
      notifyError(errorMessage)
    }
    return { success: false, error: errorMessage }
  }
}

export const logout = () => async (dispatch: AppDispatch) => {
  try {
    // The API call will clear the HttpOnly refresh token cookie
    await $api.post(`/auth/logout`)

    // Clear authentication state locally
    dispatch(isAuth(false))
    sessionStorage.removeItem('token')

    // Also clear the last clinic ID to prevent the next user from seeing the previous user's clinic
    // sessionStorage.removeItem('lastClinicId')

    notifyLogoutSuccess()

    return { success: true }
  } catch (error) {
    let errorMessage = ''
    if (request.isAxiosError(error) && error.response) {
      errorMessage = error.response.data?.message
      dispatch(getCurrentUserNotification(errorMessage))
      notifyError(errorMessage)
    }

    // Even if the API call fails, clear local auth state
    dispatch(isAuth(false))
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('lastClinicId')

    return { success: false, error: errorMessage }
  }
}

export const getUser = () => async (dispatch: AppDispatch) => {
  try {
    const response = await $api.get(`/auth/me`, {
      headers: {
        Authorization: token,
      },
    })
    dispatch(getCurrentUser(response.data))
  } catch (error) {
    sessionStorage.removeItem('token')
    let errorMessage = ''
    if (request.isAxiosError(error) && error.response) {
      errorMessage = error.response.data?.message
      dispatch(getCurrentUserNotification(errorMessage))
      notifyError(errorMessage || 'Помилка при отриманні даних користувача')
    }
  }
}
export const refreshToken = () => async (dispatch: AppDispatch) => {
  try {
    // withCredentials is now configured in the $api instance
    const response = await $api.post('/auth/refresh')

    if (response.data?.accessToken) {
      // Store the new access token
      sessionStorage.setItem('token', response.data.accessToken)
      console.log('New token received and stored:', response.data.accessToken)

      // Return success
      return { success: true, data: response.data }
    } else {
      console.error('No access token in refresh response:', response.data)
      notifyError('Помилка при оновленні токена')
      return { success: false, error: 'No access token received' }
    }
  } catch (error) {
    console.error('Error refreshing token:', error)
    let errorMessage = ''
    if (request.isAxiosError(error) && error.response) {
      errorMessage = error.response.data?.message
      dispatch(getCurrentUserNotification(errorMessage))
      notifyError(errorMessage || 'Помилка при оновленні токена')

      // If we get 401 on refresh attempt, the user should be logged out
      if (error.response.status === 401) {
        dispatch(isAuth(false))
        sessionStorage.removeItem('token')
      }
    }
    return { success: false, error: errorMessage }
  }
}

export const codeRequestConfirmate = (email: string, confirmationType: string) => async (dispatch: AppDispatch) => {
  if (confirmationType == CONFIRMATION_TYPES.resetPassword) {
    try {
      const response = await $api.post(`/auth/request-password-reset`, { email })
      console.log('response request confirm', response.data)
      dispatch(getCurrentUserNotification(response.data?.message))
      notifySuccess('Код для відновлення паролю надіслано на вашу електронну пошту')
    } catch (error) {
      let errorMessage = ''
      if (request.isAxiosError(error) && error.response) {
        errorMessage = error.response.data?.message
        dispatch(getCurrentUserNotification(errorMessage))
        notifyError(errorMessage)
      }
    }
  }
  if (confirmationType == CONFIRMATION_TYPES.registerAccount) {
    try {
      const response = await $api.post(`/auth/request-confirm-email`, { email })
      console.log('response request confirm', response.data)
      notifySuccess('Код підтвердження надіслано на вашу електронну пошту')
    } catch (error) {
      let errorMessage = ''
      if (request.isAxiosError(error) && error.response) {
        errorMessage = error.response?.data?.message
        dispatch(getCurrentUserNotification(errorMessage))
        notifyError(errorMessage)
      }
    }
  }
}

export const codeConfirmate = (email: string, code: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await $api.post(`/auth/confirm-email`, { email, code })
    sessionStorage.setItem('token', response.data.accessToken)
    dispatch(isAuth(true))
    notifySuccess('Електронну пошту підтверджено успішно')
  } catch (error) {
    let errorMessage = ''
    if (request.isAxiosError(error) && error.response) {
      errorMessage = error.response.data?.message
      dispatch(getCurrentUserNotification(errorMessage))
      notifyError(errorMessage)
    }
  }
}
export const resetPassword = (email: string, code: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await $api.post(`/auth/reset-password`, { email, code, password })
    console.log('success', response.data)
    sessionStorage.setItem('token', response.data.accessToken)
    notifySuccess('Пароль успішно змінено')
  } catch (error) {
    let errorMessage = ''
    if (request.isAxiosError(error) && error.response) {
      errorMessage = error.response.data?.message
      dispatch(getCurrentUserNotification(errorMessage))
      notifyError(errorMessage)
    }
  }
}
