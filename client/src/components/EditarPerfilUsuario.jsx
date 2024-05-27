import React, { useState, useEffect } from 'react'
import axiosInstance from '../func/axiosInstance'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import Switch from './FormComponents/Switch'
import EditValidation from '../func/EditValidation'
import { toast, Toaster } from 'sonner'
import Navbar from './navbar/Navbar'

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
      <header className="flex items-center justify-between border-b p-2 bg-primary">
        <button
          onClick={() => navigate('/perfil')}
          className="text-3xl"
        >
          ←
        </button>
        <h1 className="text-3xl font-bold">Editar Perfil</h1>
      </header>
      <div
        className="max-w-md mx-auto p-6 border bg-background rounded-sm font-secondary text-text"
        style={{ paddingBottom: 'var(--navbar-height)' }}
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4 text-2xl"
        >
          <section className="mb-4">
            <h2 className="text-lg font-semibold mb-2">CUENTA</h2>
            <div className="flex justify-between items-center border-b py-2">
              <label className=" flex flex-col font-semibold">
                Usuario
                <input
                  disabled
                  type="text"
                  name="Usuario"
                  value={credentials.Usuario}
                />
              </label>
            </div>
            <div className="flex justify-between items-center border-b py-2">
              <label className="flex flex-col font-semibold">
                Fecha de Creacion
                <input
                  disabled
                  type="text"
                  name="FechaCreacion"
                  value={userInfo.FechaCreacion}
                />
              </label>
            </div>
            <div className="flex justify-between items-center border-b py-2">
              <label className="flex flex-col font-semibold">
                Nivel de Cuenta
                <input
                  disabled
                  type="text"
                  name="Nivel"
                  value={nivel.Nombre}
                />
              </label>
            </div>
          </section>

          <section className="mb-4">
            <h2 className="text-lg font-semibold mb-2">DATOS PERSONALES</h2>
            <div className="flex justify-between items-center border-b py-2">
              <label className="flex flex-col font-semibold">
                Nombre
                <input
                  onChange={handleUserInput}
                  type="text"
                  name="Nombre"
                  value={userInfo.Nombre}
                />
              </label>
            </div>
            <div className="flex justify-between items-center border-b py-2">
              <label className="flex flex-col font-semibold">
                Apellido Paterno
                <input
                  onChange={handleUserInput}
                  type="text"
                  name="ApellidoPaterno"
                  value={userInfo.ApellidoPaterno}
                />
              </label>
            </div>
            <div className="flex justify-between items-center border-b py-2">
              <label className="flex flex-col font-semibold">
                Apellido Materno
                <input
                  onChange={handleUserInput}
                  type="text"
                  name="ApellidoMaterno"
                  value={userInfo.ApellidoMaterno}
                />
              </label>
            </div>
            <div className="flex justify-between items-center border-b py-2">
              <label className="flex flex-col font-semibold">
                Correo
                <input
                  disabled
                  onChange={handleUserInput}
                  type="mail"
                  name="Correo"
                  value={userInfo.Correo}
                />
              </label>
            </div>
            <div className="flex justify-between items-center border-b py-2">
              <label className="flex flex-col font-semibold">
                Celular
                <input
                  onChange={handleUserInput}
                  type="number"
                  name="Celular"
                  value={userInfo.Celular}
                />
              </label>
            </div>
          </section>

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
              className="flex-1 py-2 px-4 bg-primary text-text rounded-md hover:bg-green-700 font-semibold"
              onClick={() => navigate('/perfil')}
            >
              Back
            </button>
            <button
              type="submit"
              className=" flex-1 py-2 px-4 bg-primary text-text rounded-md hover:bg-green-700 font-semibold "
            >
              Save
            </button>
          </div>
        </form>
      </div>
      <Navbar />
    </>
  )
}

export default EditarPerfilUsuario
