import { React, useEffect, useState } from 'react'
import axiosInstance from '../func/axiosInstance'
import { jwtDecode } from 'jwt-decode'

const Home = () => {
  const [userData, setUserData] = useState({})
  const token = localStorage.getItem('jwt')
  const { id } = jwtDecode(token)

  useEffect(() => {
    const fetchUser = async () => {
      let response
      try {
        response = await axiosInstance.get(`/api/usuarios/${id}`)
      } catch (error) {
        console.error('Failed to fetch data:', error.message)
      } finally {
        setUserData(response.data)
      }
    }

    fetchUser()
  }, [])

  return (
    <div
      className="bg-background h-fit w-screen p-2 overflow-y-auto"
      style={{ paddingBottom: 'var(--navbar-height)' }}
    >
      <div className="overflow-y-scroll p-4">
        <h1 className="font-primary font-bold text-4xl text-center">
          Bienvendio, {userData.Nombre}
        </h1>
      </div>
    </div>
  )
}

export default Home
