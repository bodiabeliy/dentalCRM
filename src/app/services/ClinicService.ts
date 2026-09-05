import request from 'axios'

import $api from './api/index'
import { getCurrentUserNotification } from '../providers/reducers/UserSlice'
import type { AppDispatch } from '../providers/store'
import type { IClinic } from '../providers/types/clinic'
import {
  createLogo,
  getClinicInvities,
  getClinicReferencies,
  getClinics,
  getCurrentClinic,
} from '../providers/reducers/ClinicSlice'
import { saveLastClinicId, token } from '../../shared/utils/storageUtils'
import type { IStaffInvited } from '../providers/types/stuff'
import {
  notifyCreateSuccess,
  notifyUpdateSuccess,
  notifyDeleteSuccess,
  notifyError,
  notifyInviteSuccess,
  notifyInviteAcceptSuccess,
  notifyInviteDeclineSuccess,
  notifySuccess,
  notifyCreateError,
} from '../../shared/utils/toastUtils'

export const createClinic = (clinic: IClinic) => async (dispatch: AppDispatch) => {
  try {
    const response = await $api.post(`/clinics`, clinic)
    dispatch(getCurrentUserNotification(response.data?.message))
    sessionStorage.setItem('token', response.data?.accessToken)

    // Add success notification
    notifyCreateSuccess('Клініка')

    return { success: true }
  } catch (error) {
    let errorMessage = ''
    console.log(error)

    if (request.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.message
      notifyCreateError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }
}

export const getClinicsAll = () => async (dispatch: AppDispatch) => {
  try {
    const response = await $api.get(`/clinics/all`, {
      headers: {
        Authorization: token,
      },
    })
    dispatch(getClinics(response.data))
    return { success: true }
  } catch (error) {
    let errorMessage = ''
    if (request.isAxiosError(error) && error.response) {
      errorMessage = error.response.data?.message
      dispatch(getCurrentUserNotification(errorMessage))
      return { success: false, error: errorMessage }
    }
  }
}

export const getClinicInfo = () => async (dispatch: AppDispatch) => {
  try {
    const response = await $api.get(`/clinics`, {
      headers: {
        Authorization: token,
      },
    })
    dispatch(getCurrentClinic(response.data))
    console.log('response.data', response.data)

    // saveLastClinicId()
    return { success: true }
  } catch (error) {
    let errorMessage = ''
    if (request.isAxiosError(error) && error.response) {
      errorMessage = error.response.data?.message
      dispatch(getCurrentUserNotification(errorMessage))
      return { success: false, error: errorMessage }
    }
  }
}

export const getClinicById = (clinicId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await $api.post(`/clinics/switch`, { clinicId })
    dispatch(getCurrentUserNotification(response.data?.message))
    dispatch(getCurrentClinic(response.data.clinic))

    // Save the token from the response
    sessionStorage.setItem('token', response.data.accessToken)

    // Save the selected clinic ID in sessionStorage for persisting across sessions
    saveLastClinicId(clinicId)

    return { success: true }
  } catch (error) {
    let errorMessage = ''
    if (request.isAxiosError(error) && error.response) {
      errorMessage = error.response.data?.message
      // notifyError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }
}

export const uploadClinicImage = (file: File) => async (dispatch: AppDispatch) => {
  try {
    const formData = new FormData()
    formData.append('file', file)
    const response = await $api.post(`/clinics/upload`, formData, {
      headers: { Authorization: token, 'Content-Type': 'multipart/form-data' },
      onDownloadProgress: (progressEvent) => {
        const totalLength = progressEvent.lengthComputable && progressEvent.total
        console.log('total length', totalLength)
        if (totalLength) {
          const progress = Math.round((progressEvent.loaded * 100) / totalLength)
          console.log('progress', progress)
        }
      },
    })
    dispatch(createLogo(response.data?.url))

    // Notify successful upload
    notifySuccess('Фото клініки успішно завантажено')
  } catch (error) {
    let errorMessage = ''
    if (request.isAxiosError(error) && error.response) {
      errorMessage = error.response.data?.message
      dispatch(getCurrentUserNotification(errorMessage))
      notifyError(errorMessage)
    }
  }
}

export const updateClinicInfo = (formData: IClinic) => async (dispatch: AppDispatch) => {
  try {
    const response = await $api.put(`/clinics`, formData)
    dispatch(getCurrentUserNotification(response.data?.message))

    // Add success notification
    notifyUpdateSuccess('Клініка')

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

export const removeClinic = () => async (dispatch: AppDispatch) => {
  try {
    const response = await $api.delete(`/clinics`)
    dispatch(getCurrentUserNotification(response.data?.message))
    sessionStorage.setItem('token', response.data?.authResult.accessToken)

    // Add success notification
    notifyDeleteSuccess('Клініка')

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

// invite section

export const createInvites = (invite: IStaffInvited) => async (dispatch: AppDispatch) => {
  try {
    const response = await $api.post(`/clinic-invites`, invite)
    dispatch(getCurrentUserNotification(response.data?.message || 'Invite sent successfully'))

    // Notify successful invite
    notifyInviteSuccess()

    // Refresh the staff list to include the new invite
    const staffService = await import('./StaffService')
    await staffService.getAllStuffs()(dispatch)

    return { success: true }
  } catch (error) {
    let errorMessage = ''
    if (request.isAxiosError(error) && error.response) {
      errorMessage = error.response.data?.message
      dispatch(getCurrentUserNotification(errorMessage))
      notifyError(errorMessage)
      return { success: false, error: errorMessage }
    }
    return { success: false, error: 'An unknown error occurred' }
  }
}

export const getInvities = (email: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await $api.get(`/clinic-invites?${email}`, {
      headers: {
        Authorization: token,
      },
    })
    dispatch(getClinicInvities(response.data))
    return { success: true }
  } catch (error) {
    let errorMessage = ''
    if (request.isAxiosError(error) && error.response) {
      errorMessage = error.response.data?.message
      dispatch(getCurrentUserNotification(errorMessage))
      notifyError(errorMessage)
    }
    return { success: false, error: 'An unknown error occurred' }
  }
}

export const acceptInvite = (inviteId: number) => async (dispatch: AppDispatch) => {
  try {
    const response = await $api.post(`/clinic-invites/accept/${inviteId}`)
    dispatch(getCurrentUserNotification(response.data?.message || 'Invite accepted successfully'))
    sessionStorage.setItem('token', response.data.accessToken)

    // Notify successful acceptance
    notifyInviteAcceptSuccess()

    // Refresh the staff list after accepting the invite
    const staffService = await import('./StaffService')
    await staffService.getAllStuffs()(dispatch)

    return { success: true }
  } catch (error) {
    let errorMessage = ''
    if (request.isAxiosError(error) && error.response) {
      errorMessage = error.response.data?.message
      dispatch(getCurrentUserNotification(errorMessage))
      notifyError(errorMessage)
    }
    return { success: false, error: 'An unknown error occurred' }
  }
}

export const decileInvite = (inviteId: number) => async (dispatch: AppDispatch) => {
  try {
    const response = await $api.post(`/clinic-invites/decline/${inviteId}`)
    dispatch(getCurrentUserNotification(response.data?.message || 'Invite declined successfully'))

    // Notify successful decline
    notifyInviteDeclineSuccess()

    // Refresh the staff list after declining the invite
    const staffService = await import('./StaffService')
    await staffService.getAllStuffs()(dispatch)

    return { success: true }
  } catch (error) {
    let errorMessage = ''
    if (request.isAxiosError(error) && error.response) {
      errorMessage = error.response.data?.message
      dispatch(getCurrentUserNotification(errorMessage))
      notifyError(errorMessage)
    }
    return { success: false, error: 'An unknown error occurred' }
  }
}

// referencies
export const getClinicRefercies = () => async (dispatch: AppDispatch) => {
  try {
    const response = await $api.get(`/clinics/references`, {
      headers: {
        Authorization: token,
      },
    })
    dispatch(getClinicReferencies(response.data))
  } catch (error) {
    let errorMessage = ''
    if (request.isAxiosError(error) && error.response) {
      errorMessage = error.response.data?.message
      dispatch(getCurrentUserNotification(errorMessage))
    }
  }
}
