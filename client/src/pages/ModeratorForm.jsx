import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import RegisterValidation from '../func/RegisterValdidation.js'
import axiosInstance from '../func/axiosInstance.js'
import { toast, Toaster } from 'sonner'
import Navbar from '../components/navbar/Navbar.jsx'

const ModeratorFrom = () => {
  const [userInfo, setUserInfo] = useState({
    Nombre: '',
    ApellidoPaterno: '',
    ApellidoMaterno: '',
    Celular: '',
    Correo: '',
  })

  const [credentials, setCredentials] = useState({
    Usuario: '',
    Contrasena: '',
    Confirmacion: '',
  })

  const [values, setValues] = useState()

  useEffect(() => {
    const values = { ...userInfo, ...credentials }
    setValues(values)
  }, [userInfo, credentials])

  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    const validationError = RegisterValidation(values)

    if (!validationError) {
      axiosInstance
        .post('/api/credenciales', credentials)
        .then(async (res) => {
          try {
            await axiosInstance
              .post('/api/moderadores', {
                ...userInfo,
                Credencial: res.data.id,
              })
              .then(() => {
                toast.success('Usuario moderador agregado')
                navigate('/agregar')
              })
          } catch (err) {
            if (err.response.status === 409) {
              await axiosInstance.delete(`/api/credenciales/${res.data.id}`)
              return toast.warning(err.response.data.message)
            }
            return toast.error(err.response.data.message)
          }
        })
        .catch(async (err) => {
          return toast.error(err.response.data.message)
        })
    } else {
      toast.warning(validationError)
    }
  }

  const handleUserInput = (event) => {
    setUserInfo({ ...userInfo, [event.target.name]: event.target.value })
  }
  const handleCredentialInput = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    })
  }

  return (
    <>
      <Toaster />
      <header className="flex items-center justify-between border-b p-2 bg-primary">
        <button
          onClick={() => navigate('/agregar')}
          className="text-3xl"
        >
          ←
        </button>
        <h1 className="text-3xl font-bold">Agregar Moderador</h1>
      </header>
      <div
        className="max-w-md mx-auto p-6 border bg-background rounded-sm font-secondary text-text overflow-y-auto"
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
                  onChange={handleCredentialInput}
                  className="font-normal bg-transparent border-2 border-slate-300"
                  required
                  type="text"
                  name="Usuario"
                  value={credentials.Usuario}
                />
              </label>
            </div>
            <div className="flex justify-between items-center border-b py-2">
              <label className="flex flex-col font-semibold">
                Contraseña
                <input
                  required
                  onChange={handleCredentialInput}
                  className="font-normal bg-transparent border-2 border-slate-300"
                  type="text"
                  name="Contrasena"
                  value={credentials.Contrasena}
                />
              </label>
            </div>
            <div className="flex justify-between items-center border-b py-2">
              <label className="flex flex-col font-semibold">
                Confirmación
                <input
                  required
                  onChange={handleCredentialInput}
                  className="font-normal bg-transparent border-2 border-slate-300"
                  type="text"
                  name="Confirmacion"
                  value={credentials.Confirmacion}
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
                  required
                  className="font-normal bg-transparent border-2 border-slate-300"
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
                  required
                  className="font-normal bg-transparent border-2 border-slate-300"
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
                  required
                  className="font-normal bg-transparent border-2 border-slate-300"
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
                  required
                  className="font-normal bg-transparent border-2 border-slate-300"
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
                  required
                  className="font-normal bg-transparent border-2 border-slate-300"
                  onChange={handleUserInput}
                  type="number"
                  name="Celular"
                  value={userInfo.Celular}
                />
              </label>
            </div>
          </section>

          <div className="flex flex-row gap-4">
            <button
              className="flex-1 py-2 px-4 bg-red-500 text-text rounded-md hover:bg-green-700 font-semibold"
              onClick={() => navigate('/agregar')}
            >
              Regresar
            </button>
            <button
              type="submit"
              className=" flex-1 py-2 px-4 bg-primary text-text rounded-md hover:bg-green-700 font-semibold "
            >
              Crear
            </button>
          </div>
        </form>
      </div>
      <Navbar />
    </>
  )
}

export default ModeratorFrom
