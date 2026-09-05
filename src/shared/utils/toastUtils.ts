import { toast } from 'react-toastify'
import i18n from './i18n'

/**
 * Utility functions for displaying toast notifications consistently across the application
 */

// Success notifications
export const notifySuccess = (message: string) => {
  toast.success(message)
}

// Error notifications
export const notifyError = (message: string) => {
  toast.error(message)
}

// Info notifications
export const notifyInfo = (message: string) => {
  toast.info(message)
}

// Warning notifications
export const notifyWarning = (message: string) => {
  toast.warning(message)
}

// Operation success notifications
export const notifyCreateSuccess = (entityName: string) => {
  notifySuccess(i18n.t('created', { ns: 'notifications', entity: entityName }))
}

export const notifyUpdateSuccess = (entityName: string) => {
  notifySuccess(i18n.t('updated', { ns: 'notifications', entity: entityName }))
}

export const notifyDeleteSuccess = (entityName: string) => {
  notifySuccess(i18n.t('deleted', { ns: 'notifications', entity: entityName }))
}

// Operation error notifications
export const notifyCreateError = (entityName: string, errorMessage?: string) => {
  notifyError(errorMessage || i18n.t('errors.create', { ns: 'errors', entity: entityName }))
}

export const notifyUpdateError = (entityName: string, errorMessage?: string) => {
  notifyError(errorMessage || i18n.t('errors.update', { ns: 'errors', entity: entityName }))
}

export const notifyDeleteError = (entityName: string, errorMessage?: string) => {
  notifyError(errorMessage || i18n.t('errors.delete', { ns: 'errors', entity: entityName }))
}

export const notifyFetchError = (entityName: string, errorMessage?: string) => {
  notifyError(errorMessage || i18n.t('errors.fetch', { ns: 'errors', entity: entityName }))
}

// HTTP status code specific error notifications
export const notifyBadRequestError = (message?: string) => {
  notifyError(message || i18n.t('badRequest', { ns: 'errors' }))
}

export const notifyUnauthorizedError = (message?: string) => {
  notifyError(message || i18n.t('unauthorized', { ns: 'errors' }))
}

export const notifyForbiddenError = (message?: string) => {
  notifyError(message || i18n.t('forbidden', { ns: 'errors' }))
}

export const notifyNotFoundError = (message?: string) => {
  notifyError(message || i18n.t('notFound', { ns: 'errors' }))
}

export const notifyServerError = (message?: string) => {
  notifyError(message || i18n.t('serverErrorDetailed', { ns: 'errors' }))
}

export const notifyNetworkError = (message?: string) => {
  notifyError(message || i18n.t('networkError', { ns: 'errors' }))
}

export const notifyTimeoutError = (message?: string) => {
  notifyError(message || i18n.t('timeout', { ns: 'errors' }))
}

// Operation specific notifications
export const notifyLoginSuccess = () => {
  notifySuccess(i18n.t('loginSuccess', { ns: 'notifications' }))
}

export const notifyLogoutSuccess = () => {
  notifySuccess(i18n.t('logoutSuccess', { ns: 'notifications' }))
}

export const notifyClinicSwitchSuccess = (clinicName: string) => {
  notifySuccess(i18n.t('clinicSwitch', { ns: 'notifications', clinicName }))
}

export const notifyInviteSuccess = () => {
  notifySuccess(i18n.t('inviteSent', { ns: 'notifications' }))
}

export const notifyInviteAcceptSuccess = () => {
  notifySuccess(i18n.t('inviteAccepted', { ns: 'notifications' }))
}

export const notifyInviteDeclineSuccess = () => {
  notifySuccess(i18n.t('inviteDeclined', { ns: 'notifications' }))
}
