import request from 'axios'

import $api from './api/index'
import { getCurrentUserNotification } from '../providers/reducers/UserSlice'
import type { AppDispatch } from '../providers/store'
import type { IStaff } from '../providers/types/stuff'
import { token } from '../../shared/utils/storageUtils'
import { getCurrentStuff, getStuffs, isLoading } from '../providers/reducers/StaffSlice'
import delay from '../../shared/utils/delay'
import { notifyUpdateSuccess, notifyDeleteSuccess, notifyError, notifySuccess } from '../../shared/utils/toastUtils'

export const getAllStuffs = () => async (dispatch: AppDispatch) => {
  // Initialize empty arrays for both accepted staff and pending invites
  let acceptedStaff = []
  let pendingInvites = []
  let hasError = false
  let errorMessage = ''

  // First request: Get accepted staff (handle separately to avoid errors blocking the second request)
  try {
    const response = await $api.get(`/staff`)
    if (response?.data && response.data.items) {
      acceptedStaff = response?.data?.items
    }
  } catch (error) {
    console.log('Error fetching accepted staff:', error)
    hasError = true
    if (request.isAxiosError(error) && error.response) {
      errorMessage = error.response.data?.message || 'Error fetching accepted staff'
    }
    // Just log the error but continue with the next request
    // We don't want to dispatch an empty array yet or show notifications
  }

  // Second request: Get pending invites (handle separately)
  try {
    const response = await $api.get(`/clinic-invites/invites?status=pending`)
    if (response.data) {
      pendingInvites = response.data
    }
  } catch (error) {
    hasError = true
    if (request.isAxiosError(error) && error.response) {
      errorMessage = errorMessage || error.response.data?.message || 'Error fetching pending invites'
    }
    // Just log the error and continue
  }

  // Combine both arrays regardless of whether either request succeeded or failed
  const combineStaff = [...acceptedStaff, ...pendingInvites]

  // Dispatch the combined array (even if one of them is empty)
  dispatch(getStuffs(combineStaff))

  // Only show an error notification if both requests failed
  if (hasError && acceptedStaff.length === 0 && pendingInvites.length === 0 && errorMessage) {
    dispatch(getCurrentUserNotification(errorMessage))
    return { success: false, error: errorMessage }
  }

  return { success: true, data: combineStaff }
}

export const getStuffProfileByEmail = (email: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(isLoading(true))
    await delay(500)

    const response = await $api.get(`/clinic-invites/users?email=${email}`)
    dispatch(getCurrentStuff(response.data))
    dispatch(isLoading(false))

    dispatch(getCurrentUserNotification(response.data?.message))
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

export const getStaffById = (staff: IStaff) => async (dispatch: AppDispatch) => {
  try {
    const { id } = staff

    const response = await $api.get(`/staff/${id}`)

    dispatch(getCurrentStuff(response.data))
    dispatch(getCurrentUserNotification(response.data?.message))
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

export const updateStuffProfile = (staffData: IStaff) => async (dispatch: AppDispatch) => {
  try {
    const { id, hourlyRate, subclinics, roles, colors, hourlyRate2 } = staffData

    console.log('color', colors)

    const response = await $api.put(`/staff/${id}`, {
      roleId: roles?.id,
      subClinicId: subclinics?.id,
      color: colors?.id,
      hourlyRate,
      hourlyRate2,
    })

    // Update the current staff in Redux with complete updated data
    // Combine response data with the data we sent to ensure we have all fields
    const updatedStaff = {
      ...staffData,
      ...response.data,
      // Make sure role field is updated based on roles.name for UI display
      role: roles?.name || staffData.role || response.data?.role,
    }
    dispatch(getCurrentStuff(updatedStaff))

    // Also update the staff in the staffs array to ensure the table is updated
    dispatch(async (dispatch, getState) => {
      const { StaffReducer } = getState()
      const currentStaffs = [...StaffReducer.staffs]

      // Find and update the staff in the array
      const updatedStaffs = currentStaffs.map((staff) => (staff.id === id ? { ...staff, ...updatedStaff } : staff))

      // Update the staffs array in Redux
      dispatch(getStuffs(updatedStaffs))
    })

    dispatch(getCurrentUserNotification(response.data?.message || 'Staff updated successfully'))

    // Add success notification
    notifyUpdateSuccess('Профіль персоналу')

    return { success: true, data: updatedStaff }
  } catch (error) {
    let errorMessage = ''
    if (request.isAxiosError(error) && error.response) {
      errorMessage = error.response.data?.message
      dispatch(getCurrentUserNotification(errorMessage))
      notifyError(errorMessage)
      return { success: false, error: errorMessage }
    }
    return { success: false, error: 'Unknown error occurred' }
  }
}

export const uploadProfileImage = (file: File) => async (dispatch: AppDispatch) => {
  try {
    const formData = new FormData()
    formData.append('file', file)
    const response = await $api.post(`/profile`, formData, {
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

    const imageResponse = await $api.put(
      `/profile`,
      { photo: response.data?.url },
      {
        headers: { Authorization: token },
      }
    )
    dispatch(getCurrentUserNotification(imageResponse.data?.url))

    // Add success notification
    notifySuccess('Фото профілю успішно завантажено')
  } catch (error) {
    let errorMessage = ''
    if (request.isAxiosError(error) && error.response) {
      errorMessage = error.response.data?.message
      dispatch(getCurrentUserNotification(errorMessage))
      notifyError(errorMessage)
    }
  }
}

export const updateProfileImage = (formData: IStaff) => async (dispatch: AppDispatch) => {
  try {
    const response = await $api.put(`/profile`, formData)
    console.log('success', response.data)
  } catch (error) {
    let errorMessage = ''
    if (request.isAxiosError(error) && error.response) {
      errorMessage = error.response?.data?.message
      dispatch(getCurrentUserNotification(errorMessage))
    }
  }
}

export const deleteStaffProfile = (id: number) => async (dispatch: AppDispatch) => {
  try {
    const response = await $api.delete(`/staff/${id}`)
    dispatch(getCurrentUserNotification(response.data?.message || 'Staff deleted successfully'))

    // Add success notification
    notifyDeleteSuccess('Співробітник')

    // Refresh the staff list after deletion
    await getAllStuffs()(dispatch)

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
