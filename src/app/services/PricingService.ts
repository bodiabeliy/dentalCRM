import request from 'axios'

import $api from './api/index'
import { getCurrentUserNotification } from '../providers/reducers/UserSlice'
import type { AppDispatch } from '../providers/store'
import { getPricing } from '../providers/reducers/PricingSlice'
import { token } from '../../shared/utils/storageUtils'
import type { IPricing, IPricingItem } from '../providers/types/pricing'
import { notifyError, notifySuccess } from '../../shared/utils/toastUtils'
import i18n from '../../shared/utils/i18n'

export const getAllPricing = () => async (dispatch: AppDispatch) => {
  try {
    const response = await $api.get(`/price`)
    dispatch(getPricing(response.data))
    return { success: true, data: response.data }
  } catch (error) {
    let errorMessage = ''
    if (request.isAxiosError(error) && error.response) {
      errorMessage = error.response.data?.message
      dispatch(getCurrentUserNotification(errorMessage))
      return { success: false, error: errorMessage }
    }
  }
}

export const createPricing =
  (pricingData: { name: string; color: number; order: number }) => async (dispatch: AppDispatch) => {
    try {
      const response = await $api.post(`/price`, pricingData, {
        headers: {
          Authorization: token,
        },
      })

      await dispatch(getAllPricing())

      // Add success notification
      // notifySuccess(i18n.t('pricing.created', { ns: 'notifications' }))

      return { success: true, data: response.data }
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

export const updatePricing = (pricing: IPricing) => async (dispatch: AppDispatch) => {
  try {
    const { id, name, order, color } = pricing
    const response = await $api.put(`/price/${id}`, { name, color, order })

    // Fetch the updated list after update
    await dispatch(getAllPricing())

    // Add success notification
    notifySuccess(i18n.t('pricing.updated', { ns: 'notifications' }))

    return { success: true, data: response.data }
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

export const removePricing = (pricingID: number) => async (dispatch: AppDispatch) => {
  try {
    await $api.delete(`/price/${pricingID}`)

    // Fetch the updated list after deletion
    await dispatch(getAllPricing())

    // Add appropriate success notification based on what was deleted
    // if (permissionID === 0) {
    //   notifySuccess(i18n.t('pricing.deleted', { ns: 'notifications' }))
    // } else {
    //   notifySuccess(i18n.t('pricing.permissionRemoved', { ns: 'notifications' }))
    // }

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

// PRICE POSITIONS

export const getAllPricePositions = (groupId: number) => async (dispatch: AppDispatch) => {
  try {
    const response = await $api.get(`/price/${groupId}/price-items`)
    return { success: true, data: response.data }
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

export const createPricePosition =
  (groupId: number, positionData: Omit<IPricingItem, 'id'>) => async (dispatch: AppDispatch) => {
    try {
      const response = await $api.post(`/price/${groupId}/price-items`, positionData, {
        headers: {
          Authorization: token,
        },
      })

      // Fetch the updated pricing list after creation
      await dispatch(getAllPricing())

      // Add success notification
      notifySuccess(i18n.t('pricing.positionCreated', { ns: 'notifications' }))

      return { success: true, data: response.data }
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

export const updatePricePosition = (groupId: number, position: IPricingItem) => async (dispatch: AppDispatch) => {
  try {
    const { id, name, price, cost, executionTime, photo, order, color, priceQuestions } = position

    const response = await $api.put(`/price/${groupId}/price-items/${id}`, {
      name,
      price,
      cost,
      executionTime: executionTime ?? 30,
      photo: photo ?? false,
      order: order ?? 1,
      color: color ?? 1,
      priceQuestions: priceQuestions ?? [],
    })

    // Fetch the updated pricing list after update
    await dispatch(getAllPricing())

    // Add success notification
    // notifySuccess(i18n.t('pricing.positionUpdated', { ns: 'notifications' }))

    return { success: true, data: response.data }
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

export const removePricePosition = (groupId: number, position: IPricingItem) => async (dispatch: AppDispatch) => {
  try {
    const { id } = position

    const response = await $api.delete(`/price/${groupId}/price-items/${id}`, {})

    // Fetch the updated pricing list after update
    await dispatch(getAllPricePositions(groupId))

    // Add success notification
    // notifySuccess(i18n.t('pricing.positionUpdated', { ns: 'notifications' }))

    return { success: true, data: response.data }
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
