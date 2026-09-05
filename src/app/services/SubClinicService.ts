import request from 'axios'

import $api from './api/index'
import { getCurrentUserNotification } from '../providers/reducers/UserSlice'
import type { AppDispatch } from '../providers/store'
import { getSubClinic, getSubClinics } from '../providers/reducers/SubClinicSlice'
import type { ISubClinic } from '../providers/types/clinic'
import { token } from '../../shared/utils/storageUtils'
import {
  notifyCreateSuccess,
  notifyUpdateSuccess,
  notifyDeleteSuccess,
  notifyError,
} from '../../shared/utils/toastUtils'

export const getAllSubClinics = () => async (dispatch: AppDispatch) => {
  try {
    const response = await $api.get(`/subclinics`)
    dispatch(getSubClinics(response.data))
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

export const getSubClinicById = (subClinicID: number) => async (dispatch: AppDispatch) => {
  try {
    const response = await $api.get(`/subclinics/${subClinicID}`, {
      headers: {
        Authorization: token,
      },
    })
    dispatch(getSubClinic(response.data))
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

export const createSubClinic = (subClinic: ISubClinic) => async (dispatch: AppDispatch) => {
  try {
    const response = await $api.post(`/subclinics`, subClinic)
    dispatch(getSubClinic(response.data))

    // Fetch the updated list after creation to ensure the UI is up-to-date
    const updatedResponse = await $api.get('/subclinics')
    dispatch(getSubClinics(updatedResponse.data))

    dispatch(getCurrentUserNotification(response.data?.message || 'Філію успішно створено'))

    // Add success notification
    notifyCreateSuccess('Філія')

    return { success: true, data: response.data }
  } catch (error) {
    let errorMessage = ''
    if (request.isAxiosError(error) && error.response) {
      errorMessage = error.response.data?.message
      dispatch(getCurrentUserNotification(errorMessage))
      notifyError(errorMessage)
      return { success: false, error: errorMessage }
    }
    return { success: false, error: 'Виникла помилка при створенні філії' }
  }
}

export const editSubClinic = (subClinic: ISubClinic) => async (dispatch: AppDispatch) => {
  try {
    const { id, name, address } = subClinic
    const response = await $api.put(`/subclinics/${id}`, { name, address })
    console.log('getSubClinic put', response.data)

    // Add success notification
    notifyUpdateSuccess('Філія')

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

export const removeSubClinic = (subClinicId: number) => async (dispatch: AppDispatch) => {
  try {
    console.log('Removing subclinic with ID:', subClinicId)

    const response = await $api.delete(`/subclinics/${subClinicId}`)
    console.log('Subclinic deletion response:', response.data)

    // Fetch the updated list after deletion
    const updatedResponse = await $api.get('/subclinics')
    dispatch(getSubClinics(updatedResponse.data))

    // Add success notification
    notifyDeleteSuccess('Філія')

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
