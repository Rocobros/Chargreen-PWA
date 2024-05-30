import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../func/axiosInstance.js'
import { toast, Toaster } from 'sonner'
import Navbar from '../components/navbar/Navbar.jsx'
import ActualizacionValidation from '../func/ActualizacionValidation.js'
const AgregarActualizationPage = () => {
  const [values, setValues] = useState({
    Titulo: '',
    Descripcion: '',
    UsuarioModerador: localStorage.getItem('id'),
  })

  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    const validationError = ActualizacionValidation(values)

    if (!validationError) {
      axiosInstance
        .post('/api/novedades/actualizacion', values)
        .then((res) => {
          toast.success(res.data.message)
          navigate('/agregarMod')
        })
        .catch((err) => {
          return toast.error(err.response.data.message)
        })
    } else {
      toast.warning(validationError)
    }
  }

  const handleInput = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  return (
    <>
      <Toaster />
      <header className="flex items-center justify-between border-b p-2 bg-primary">
        <button
          onClick={() => navigate('/agregarMod')}
          className="text-3xl"
        >
          ←
        </button>
        <h1 className="text-3xl font-bold">Agregar Actualización</h1>
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
            <h2 className="text-lg font-semibold mb-2">INFORMACION</h2>
            <div className="flex justify-between items-center border-b py-2">
              <label className=" flex flex-col font-semibold">
                Titulo
                <input
                  onChange={handleInput}
                  className="font-normal bg-transparent border-2 border-slate-300"
                  required
                  type="text"
                  name="Titulo"
                  value={values.Titulo}
                />
              </label>
            </div>
            <div className="flex justify-between items-center border-b py-2">
              <label className="flex flex-col font-semibold">
                Descripcion
                <textarea
                  required
                  onChange={handleInput}
                  className="font-normal bg-transparent border-2 border-slate-300 h-48"
                  name="Descripcion"
                  value={values.Descripcion}
                />
              </label>
            </div>
          </section>

          <div className="flex flex-row gap-4">
            <button
              className="flex-1 py-2 px-4 bg-red-500 text-text rounded-md hover:bg-green-700 font-semibold"
              onClick={() => navigate('/agregarMod')}
            >
              Regresar
            </button>
            <button
              type="submit"
              className=" flex-1 py-2 px-4 bg-primary text-text rounded-md hover:bg-green-700 font-semibold "
            >
              Agregar
            </button>
          </div>
        </form>
      </div>
      <Navbar />
    </>
  )
}

export default AgregarActualizationPage
