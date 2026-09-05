import axios from 'axios'
import {
  notifyError,
  notifyBadRequestError,
  notifyUnauthorizedError,
  notifyForbiddenError,
  notifyNotFoundError,
  notifyServerError,
  notifyNetworkError,
  notifyTimeoutError,
} from '../utils/toastUtils'

const APIVITE_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export const apiClient = axios.create({
  baseURL: APIVITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.error('API Error:', error)

    // Add global error handling for API requests
    if (error.response) {
      // Server responded with an error status
      const errorMessage = error.response.data?.message || 'Помилка сервера'
      const statusCode = error.response.status

      // Handle different status codes with specific error messages
      switch (statusCode) {
        case 400:
          notifyBadRequestError(errorMessage)
          break
        case 401:
          notifyUnauthorizedError(errorMessage)
          break
        case 403:
          notifyForbiddenError(errorMessage)
          break
        case 404:
          notifyNotFoundError(errorMessage)
          break
        case 500:
        case 501:
        case 502:
        case 503:
        case 504:
          notifyServerError(errorMessage)
          break
        default:
          notifyError(errorMessage)
      }
    } else if (error.code === 'ECONNABORTED') {
      // Request timeout
      notifyTimeoutError()
    } else if (error.request) {
      // Request was made but no response received
      notifyNetworkError('Немає відповіді від сервера. Перевірте підключення до інтернету.')
    } else {
      // Something happened in setting up the request
      notifyError('Помилка запиту')
    }

    return Promise.reject(error)
  }
)

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}
