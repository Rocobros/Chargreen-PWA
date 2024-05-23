import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'sonner'

import RegisterValidation from '../func/UpdateVal'
import axiosInstance from '../func/axiosInstance'

function EditarPerfilUsuario() {
  const [userInfo, setUserInfo] = useState({
    Nombre: '',
    ApellidoPaterno: '',
    ApellidoMaterno: '',
    Celular: '',
    Correo: '',
  })
  const [profileData, setProfileData] = useState({})
  const navigate = useNavigate()

  const getUserIdFromJWT = () => {
    const token = localStorage.getItem('jwt')
    if (!token) return null
    const decoded = jwtDecode(token)
    return decoded.id
  }

  useEffect(() => {
    setUserInfo(profileData)
  }, [profileData])

  useEffect(() => {
    const userId = getUserIdFromJWT()
    if (!userId) return
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(`/api/usuarios/${userId}`)
        const nivel = await axiosInstance.get(
          `/api/nivelusuario/${response.data.Nivel}`
        )
        setProfileData({ ...response.data, Nivel: nivel.data.Nombre })
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchUserData()
  }, [])

  const handleInputChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const userId = getUserIdFromJWT()
    if (!userId) return

    const validationError = RegisterValidation(userInfo)

    if (!validationError) {
      axiosInstance.put(`/api/usuarios/${userId}`, userInfo).catch((err) => {
        return toast.error(err.response.data.message)
      })
    }
  }

  return (
    <div className="flex flex-col p-5 space-y-4 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <Toaster />
      <form onSubmit={handleSubmit}>
        <button
          type="submit"
          className="mb-5 self-end px-4 py-2 text-white bg-primary rounded hover:bg-accent"
        >
          Guardar Cambios
        </button>
        <div className="grid grid-cols-2 gap-4">
          <span className="text-right">Nombre:</span>
          <input
            className="text-left"
            name="Nombre"
            value={profileData.Nombre}
            onChange={handleInputChange}
          />

          <span className="text-right">Apellido Paterno:</span>
          <input
            type="text"
            className="text-left"
            name="ApellidoPaterno"
            value={profileData.ApellidoPaterno}
            onChange={handleInputChange}
          />

          <span className="text-right">Apellido Materno:</span>
          <input
            className="text-left"
            name="ApellidoMaterno"
            value={profileData.ApellidoMaterno}
            onChange={handleInputChange}
          />

          <span className="text-right">Teléfono Celular:</span>
          <input
            className="text-left"
            name="Celular"
            value={profileData.Celular}
            onChange={handleInputChange}
          />

          <span className="text-right">Correo:</span>
          <input
            disabled
            className="text-left"
            name="Correo"
            value={profileData.Correo}
            onChange={handleInputChange}
          />

          <span className="text-right">Nivel:</span>
          <input
            disabled
            className="text-left"
            name="Nivel"
            value={profileData.Nivel}
            onChange={handleInputChange}
          />
        </div>
      </form>
    </div>
  )
}

export default EditarPerfilUsuario
