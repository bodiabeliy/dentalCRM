import request from 'axios'

import $api from './api/index'
import { getCurrentUserNotification } from '../providers/reducers/UserSlice'
import type { AppDispatch } from '../providers/store'
import { getRoles } from '../providers/reducers/RoleSlice'
import { token } from '../../shared/utils/storageUtils'
import type { IRole, IRolePermition } from '../providers/types/role'
import { notifyError, notifySuccess } from '../../shared/utils/toastUtils'
import i18n from '../../shared/utils/i18n'

export const getAllRoles = () => async (dispatch: AppDispatch) => {
  try {
    const response = await $api.get(`/roles`)
    const payload = { items: Array.isArray(response.data) ? response.data : (response.data?.items ?? []) }
    dispatch(getRoles(payload))
    return { success: true, data: payload }
  } catch (error) {
    let errorMessage = ''
    if (request.isAxiosError(error) && error.response) {
      errorMessage = error.response.data?.message
      dispatch(getCurrentUserNotification(errorMessage))
      return { success: false, error: errorMessage }
    }
  }
}

export const createRole = (role: IRole) => async (dispatch: AppDispatch) => {
  try {
    const response = await $api.post(`/roles`, role, {
      headers: {
        Authorization: token,
      },
    })

    // Fetch the updated list after creation
    await dispatch(getAllRoles())

    // Add success notification
    notifySuccess(i18n.t('role.created', { ns: 'notifications' }))

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

export const updateRole = (role: IRole) => async (dispatch: AppDispatch) => {
  try {
    const { id, order } = role
    const response = await $api.put(`/roles/${id}`, { order })

    // Fetch the updated list after update
    await dispatch(getAllRoles())

    // Add success notification
    notifySuccess(i18n.t('role.updated', { ns: 'notifications' }))

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

export const setRolePermissions = (roleID: number, permissions?: IRolePermition[]) => async (dispatch: AppDispatch) => {
  try {
    console.log('Permissions to set:', permissions)

    if (!permissions || !permissions.length) {
      console.error('No permissions provided to set')
      return { success: false, error: 'No permissions provided' }
    }

    // Ensure we have the permission ID
    const permissionId = permissions[0]?.id
    if (!permissionId) {
      console.error('Permission ID is required')
      return { success: false, error: 'Permission ID is required' }
    }

    // Get the assigned value (true/false)
    const assigned = permissions[0]?.assigned || false

    if (assigned) {
      console.log(`Assigning permission ID ${permissionId} to role ID ${roleID}`)
      const response = await $api.post(`/roles/${roleID}/permissions`, {
        permissions: permissionId, // Send just the ID as shown in your role data
      })
      console.log('Permission assignment response:', response.data)
      notifySuccess(i18n.t('role.permissionAdded', { ns: 'notifications' }))
    }
    // If removing permission, use DELETE
    else {
      console.log(`Removing permission ID ${permissionId} from role ID ${roleID}`)
      const response = await $api.delete(`/roles/${roleID}/permissions/${permissionId}`)
      console.log('Permission removal response:', response.data)

      // Show success notification
      notifySuccess(i18n.t('role.permissionRemoved', { ns: 'notifications' }))
    }

    // Fetch the updated list after changing permissions
    await dispatch(getAllRoles())

    return { success: true }
  } catch (error) {
    let errorMessage = ''
    console.error('Error in setRolePermissions:', error)

    if (request.isAxiosError(error) && error.response) {
      errorMessage = error.response.data?.message
      dispatch(getCurrentUserNotification(errorMessage))
      notifyError(errorMessage)
      return { success: false, error: errorMessage }
    }

    return { success: false, error: 'Unknown error occurred' }
  }
}

export const removeRoles = (roleID: number, permissionID: number) => async (dispatch: AppDispatch) => {
  try {
    console.log('Removing role with ID:', roleID)

    // If permissionID is 0, we're deleting the entire role
    // Otherwise we're just removing a specific permission
    const endpoint = permissionID === 0 ? `/roles/${roleID}` : `/roles/${roleID}/permissions/${permissionID}`

    const response = await $api.delete(endpoint)
    console.log('Role deletion response:', response.data)

    // Fetch the updated list after deletion
    await dispatch(getAllRoles())

    // Add appropriate success notification based on what was deleted
    if (permissionID === 0) {
      notifySuccess(i18n.t('role.deleted', { ns: 'notifications' }))
    } else {
      notifySuccess(i18n.t('role.permissionRemoved', { ns: 'notifications' }))
    }

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
