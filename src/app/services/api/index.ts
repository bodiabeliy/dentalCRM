import axios from 'axios'

const $api = axios.create({
  baseURL:import.meta.env.VITE_API_URL,
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

$api.interceptors.request.use((configuration) => {
  // Use access token from sessionStorage for authorization
  const token = sessionStorage.getItem('token')
  if (token) {
    configuration.headers.Authorization = `Bearer ${token}`
  }
  return configuration
})

$api.interceptors.response.use(
  (response) => {
    return response
  },
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
          `${process.env.VITE_API_URL}/auth/refresh`,
          { refresh_token: refreshToken },
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: '*/*',
            },
          }
        )

        if (refreshResponse.data?.access_token) {
          // Store the new tokens
          sessionStorage.setItem('token', refreshResponse.data.accessToken)

          // Update the Authorization header for the original request
          originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.accessToken}`

          // Retry the original request
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
