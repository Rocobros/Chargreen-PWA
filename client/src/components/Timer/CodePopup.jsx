import React, { useState } from 'react'
import { toast, Toaster } from 'sonner'
import axiosInstance from '../../func/axiosInstance'

const CodePopup = ({ handleClose }) => {
  const [code, setCode] = useState(0)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const salidas = await axiosInstance.get('/api/salidas')
    const filteredSalida = salidas.data.filter(
      (item) => item.Codigo === Number(code) && item.Estado === 'A'
    )

    if (filteredSalida.length > 0) {
      try {
        await axiosInstance.put(
          `/api/registro/usuario/${localStorage.getItem('id')}`,
          { Codigo: code, Salida: filteredSalida[0].Id }
        )
        handleClose()
        toast.success('Enlazado a salida')
      } catch (error) {
        toast.error(error.message)
      }
    } else {
      toast.error('Ninguna salida tiene ese codigo')
    }
  }

  return (
    <>
      <Toaster />
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 text-xl">
        <div className="bg-background p-5 rounded-md shadow-md">
          <h2 className="font-primary font-bold text-3xl text-center mb-4">
            Ingresa el codigo mostrado en la pantalla LCD
          </h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="exitSelect">Codigo: </label>
            <input
              type="number"
              name="Codigo"
              onChange={(event) => setCode(event.target.value)}
            />
            <div className="flex gap-2 mt-4 text-lg">
              <button
                type="reset"
                onClick={handleClose}
                className="flex-1 ml-2 bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cerrar
              </button>
              <button
                type="submit"
                className="flex-1 mr-2 bg-primary hover:bg-accent text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Enlazarse
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default CodePopup
