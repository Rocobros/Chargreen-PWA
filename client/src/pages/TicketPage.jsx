import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../func/axiosInstance.js'
import { toast, Toaster } from 'sonner'
import Navbar from '../components/navbar/Navbar.jsx'
import ActualizacionValidation from '../func/ActualizacionValidation.js'
const TicketPage = () => {
  const [values, setValues] = useState({
    Pregunta: '',
    Estado: 'P',
    UsuarioNormal: localStorage.getItem('id'),
  })

  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()

    if (values.Pregunta != '') {
      axiosInstance
        .post('/api/chatbot', values)
        .then((res) => {
          toast.success(res.data.message)
          navigate('/chatbot')
        })
        .catch((err) => {
          return toast.error(err.response.data.message)
        })
    } else {
      toast.warning('La pregunta esta vacia')
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
          onClick={() => navigate('/chatbot')}
          className="text-3xl"
        >
          ←
        </button>
        <h1 className="text-3xl font-bold">Generar Ticket</h1>
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
            <h2 className="text-lg font-semibold mb-2">PREGUNTA</h2>
            <div className="flex justify-between items-center border-b py-2">
              <label className=" flex flex-col font-semibold">
                Ingresa tu duda
                <input
                  onChange={handleInput}
                  className="font-normal bg-transparent border-2 border-slate-300"
                  required
                  type="text"
                  name="Pregunta"
                  value={values.Pregunta}
                />
              </label>
            </div>
          </section>

          <div className="flex flex-row gap-4">
            <button
              className="flex-1 py-2 px-4 bg-red-500 text-text rounded-md hover:bg-green-700 font-semibold"
              onClick={() => navigate('/chatbot')}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className=" flex-1 py-2 px-4 bg-primary text-text rounded-md hover:bg-green-700 font-semibold "
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
      <Navbar />
    </>
  )
}

export default TicketPage
