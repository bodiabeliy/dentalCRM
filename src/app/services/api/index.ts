import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

const $api = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

$api.interceptors.request.use((configuration) => {
  const token = sessionStorage.getItem('token')
  if (token) {
    configuration.headers.Authorization = `Bearer ${token}`
  }
  return configuration
})

$api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const refreshToken = sessionStorage.getItem('refresh')
      if (!refreshToken) {
        sessionStorage.removeItem('token')
        window.location.href = '/login'
        return Promise.reject(error)
      }

      try {
        const refreshResponse = await axios.post(
          `${API_URL}/auth/refresh`, 
          { refresh_token: refreshToken },
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: '*/*',
            },
          }
        )

        if (refreshResponse.data?.access_token) {
          sessionStorage.setItem('token', refreshResponse.data.accessToken)
          originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.accessToken}`
          return $api(originalRequest)
        }
      } catch (refreshError) {
        sessionStorage.removeItem('token')
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default $api