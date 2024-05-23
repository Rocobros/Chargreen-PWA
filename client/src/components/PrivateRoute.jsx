import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

const PrivateRoute = () => {
  const isAuthenticated = () => {
    const token = localStorage.getItem('jwt')
    if (!token) return false

    try {
      const { exp } = jwtDecode(token)
      if (Date.now() >= exp * 1000) {
        localStorage.removeItem('jwt')
        return false
      }
      return true
    } catch (e) {
      return false
    }
  }

  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute
