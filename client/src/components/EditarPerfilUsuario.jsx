import React, { useState, useEffect } from 'react'
import axiosInstance from '../func/axiosInstance'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import Switch from './FormComponents/Switch'
import EditValidation from '../func/EditValidation'
import { toast, Toaster } from 'sonner'

const EditarPerfilUsuario = () => {
  const [userInfo, setUserInfo] = useState({})
  const [credentials, setCredentials] = useState({})
  const [nivel, setNivel] = useState({})
  const [values, setValues] = useState({})

  const [isOn, setIsOn] = useState(false)

  const handleToggle = () => {
    setIsOn(!isOn)
  }

  const navigate = useNavigate()

  const getUserIdFromJWT = () => {
    const token = localStorage.getItem('jwt')
    if (!token) return null
    const decoded = jwtDecode(token)
    return decoded.id
  }

  useEffect(() => {
    const values = { ...userInfo }
    setValues(values)
  }, [userInfo])

  useEffect(() => {
    const id = getUserIdFromJWT()
    const fetchUser = async () => {
      try {
        const user = await axiosInstance.get(`/api/usuarios/${id}`)
        setUserInfo(user.data)
        setIsOn(user.data.Notificaciones === 'A')
        const credentials = await axiosInstance.get(
          `/api/credenciales/${user.data.Credencial}`
        )
        setCredentials(credentials.data)
        const nivel = await axiosInstance.get(
          `/api/nivelusuario/${user.data.Nivel}`
        )
        setNivel(nivel.data)
      } catch (error) {
        console.error(error.response.data.message)
      }
    }

    fetchUser()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    const validationError = EditValidation(values)
    if (!validationError) {
      axiosInstance
        .put(`/api/usuarios/${values.Registro}`, values)
        .then(() => {
          return toast.success('Usuario actualizado')
        })
        .catch((error) => {
          return toast.error(error.response.data.message)
        })
    } else {
      return toast.error(validationError)
    }
  }

  const handleUserInput = (event) => {
    setUserInfo({ ...userInfo, [event.target.name]: event.target.value })
  }

  return (
    <>
      <Toaster />

      <div
        className="max-w-md mx-auto p-6 border bg-background rounded-sm font-secondary text-3xl text-text"
        style={{ paddingBottom: 'var(--navbar-height)' }}
      >
        <h2 className="mb-6 text-4xl font-primary">Personal info</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4"
        >
          <label className="flex flex-col">
            Usuario
            <input
              disabled
              type="text"
              name="Usuario"
              value={credentials.Usuario}
              className="mt-1 p-2 border rounded-md"
            />
          </label>
          <label className="flex flex-col">
            Fecha de Creacion
            <input
              disabled
              type="text"
              name="FechaCreacion"
              value={new Date(userInfo.FechaCreacion)}
              className="mt-1 p-2 border rounded-md"
            />
          </label>
          <label className="flex flex-col">
            Nombre
            <input
              onChange={handleUserInput}
              type="text"
              name="Nombre"
              value={userInfo.Nombre}
              className="mt-1 p-2 border rounded-md"
            />
          </label>
          <label className="flex flex-col">
            Apellido Paterno
            <input
              onChange={handleUserInput}
              type="text"
              name="ApellidoPaterno"
              value={userInfo.ApellidoPaterno}
              className="mt-1 p-2 border rounded-md"
            />
          </label>
          <label className="flex flex-col">
            Apellido Materno
            <input
              onChange={handleUserInput}
              type="text"
              name="ApellidoMaterno"
              value={userInfo.ApellidoMaterno}
              className="mt-1 p-2 border rounded-md"
            />
          </label>
          <label className="flex flex-col">
            Correo
            <input
              disabled
              onChange={handleUserInput}
              type="mail"
              name="Correo"
              value={userInfo.Correo}
              className="mt-1 p-2 border rounded-md"
            />
          </label>
          <label className="flex flex-col">
            Celular
            <input
              onChange={handleUserInput}
              type="number"
              name="Celular"
              value={userInfo.Celular}
              className="mt-1 p-2 border rounded-md"
            />
          </label>

          <label className="flex flex-col">
            Nivel de Cuenta
            <input
              disabled
              type="text"
              name="Nivel"
              value={nivel.Nombre}
              className="mt-1 p-2 border rounded-md"
            />
          </label>
          <label className="flex flex-col">
            Notificaciones
            <Switch
              isOn={isOn}
              handleToggle={handleToggle}
            />
          </label>
          <div className="flex flex-row gap-4">
            <button
              type="submit"
              className="flex-1 py-2 px-4 bg-primary text-text rounded-md hover:bg-green-700"
              onClick={() => navigate('/perfil')}
            >
              Back
            </button>
            <button
              type="submit"
              className=" flex-1 py-2 px-4 bg-primary text-text rounded-md hover:bg-green-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default EditarPerfilUsuario
