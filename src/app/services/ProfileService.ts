import request from 'axios'

import $api from './api/index'
import { getCurrentUserNotification } from '../providers/reducers/UserSlice'
import type { AppDispatch } from '../providers/store'
import type { IProfile } from '../providers/types/user'
import { token } from '../../shared/utils/storageUtils'
import { notifyUpdateSuccess, notifyError, notifySuccess } from '../../shared/utils/toastUtils'
import i18n from '../../shared/utils/i18n'

export const updateUserProfile = (userProfile: IProfile) => async (dispatch: AppDispatch) => {
  try {
    const response = await $api.put(`/profile`, userProfile)
    dispatch(getCurrentUserNotification(response.data?.message))

    // Add success notification (use localized entity title)
    notifyUpdateSuccess(i18n.t('profile.title', { ns: 'settings' }))

    return { success: true }
  } catch (error) {
    let errorMessage = ''
    if (request.isAxiosError(error) && error.response) {
      errorMessage = error.response.data?.message
      dispatch(getCurrentUserNotification(errorMessage))
      notifyError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }
}

export const uploadProfileImage = (file: File) => async (dispatch: AppDispatch) => {
  try {
    const formData = new FormData()
    formData.append('photo', file)
    const imageResponse = await $api.put(`/profile`, formData, {
      headers: { Authorization: token, 'Content-Type': 'multipart/form-data' },
    })
    dispatch(getCurrentUserNotification(imageResponse.data?.url))

    // Add success notification
    notifySuccess(i18n.t('profilePhotoUpdated', { ns: 'notifications' }))
  } catch (error) {
    let errorMessage = ''
    if (request.isAxiosError(error) && error.response) {
      errorMessage = error.response.data?.message
      dispatch(getCurrentUserNotification(errorMessage))
      notifyError(errorMessage)
    }
  }
}
