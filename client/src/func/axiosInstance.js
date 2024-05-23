import axios from 'axios'
const url = import.meta.env.VITE_API_URL

const axiosInstance = axios.create({
  baseURL: url,
})

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log(error.response.data.message)
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
