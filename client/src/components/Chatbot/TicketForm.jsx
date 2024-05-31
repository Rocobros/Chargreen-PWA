import React, { useEffect, useState } from 'react'
import axiosInstance from '../../func/axiosInstance'
import { Toaster, toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
const TicketForm = ({ id, pregunta, usuario }) => {
  const [respuesta, setRespuesta] = useState('')
  const [userName, setUserName] = useState('')
  const [openPopup, setOpenPopup] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    if (usuario) {
      axiosInstance.get(`/api/usuarios/${usuario}`).then((res) => {
        axiosInstance
          .get(`/api/credenciales/${res.data.Credencial}`)
          .then((res) => {
            setUserName(res.data.Usuario)
          })
      })
    }
  }, [usuario])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axiosInstance.put(`/api/chatbot/responder/${id}`, {
        Respuesta: respuesta,
        UsuarioModerador: localStorage.getItem('id'),
      })
      toast.success(response.data.message)
      setOpenPopup(false)
      navigate('/tickets')
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const handleOpenPopup = () => {
    setOpenPopup(true)
  }

  const handleClosePopup = () => {
    setOpenPopup(false)
  }

  return (
    <>
      <Toaster />
      <div
        className="bg-accent w-5/6 sm:w-96 rounded-lg shadow-lg p-4 cursor-pointer transition-all duration-2000 my-4"
        onClick={handleOpenPopup}
      >
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold">{pregunta}</h2>
          <p className="text-lg">Enviado por: {userName}</p>
        </div>
      </div>

      {openPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-background rounded-lg p-6 w-11/12 md:w-1/2 lg:w-1/3">
            <form onSubmit={handleSubmit}>
              <label className="block mb-2">
                Respuesta:
                <textarea
                  name="respuesta"
                  id="respuesta"
                  onChange={(event) => setRespuesta(event.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                />
              </label>
              <div className="flex justify-around"></div>
              <button
                onClick={handleClosePopup}
                className="flex-1 bg-red-500 text-text px-4 py-2 rounded"
              >
                Cerrar
              </button>
              <button
                type="submit"
                className="flex-1 bg-primary text-text px-4 py-2 rounded"
              >
                Responder
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default TicketForm
