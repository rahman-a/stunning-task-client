import axios from 'axios'

// Create axios instance with default config
export const apiClient = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`)
    return config
  },
  (error) => {
    console.error('❌ Request error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(
      `✅ ${response.status} ${response.config.method?.toUpperCase()} ${
        response.config.url
      }`
    )
    return response
  },
  (error) => {
    console.error(
      '❌ Response error:',
      error.response?.status,
      error.response?.data
    )
    return Promise.reject(error)
  }
)
