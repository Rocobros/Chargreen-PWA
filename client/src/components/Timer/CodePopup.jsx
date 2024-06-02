import React, { useState } from 'react'
import { toast, Toaster } from 'sonner'
import axiosInstance from '../../func/axiosInstance'
import { useNavigate } from 'react-router-dom'

const CodePopup = () => {
  const [code, setCode] = useState(0)
  const navigate = useNavigate()

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
        const response = await axiosInstance.get(
          `/api/salidas/${filteredSalida[0].Id}`
        )

        const infoSalida = response.data[0]
        const registrosFetch = await axiosInstance.get(
          `/api/registro/${filteredSalida[0].Id}/${code}`
        )
        const registros = registrosFetch.data
        const botellasFetch = await axiosInstance.get('/api/botellaslatas')
        const botellas = botellasFetch.data

        let tiempoTotal = 0

        // Recorremos la primera lista
        registros.forEach((item1) => {
          // Buscamos el elemento correspondiente en la segunda lista
          const item2 = botellas.find((item2) => item2.Id === item1.Botella)
          if (item2) {
            // Sumamos el tiempo al total
            tiempoTotal += item2.Segundos
          }
        })

        const registroMasAntiguo = registros.reduce((anterior, actual) => {
          return new Date(anterior.Fecha) < new Date(actual.Fecha)
            ? anterior
            : actual
        })
        // Obtener la fecha actual
        const fechaActual = new Date()

        // Obtener la fecha del registro más antiguo
        const fechaRegistroMasAntiguo = new Date(registroMasAntiguo.Fecha)

        // Calcular la diferencia en segundos
        const diferenciaEnSegundos = Math.floor(
          (fechaActual - fechaRegistroMasAntiguo) / 1000
        )

        // Restar el tiempoTotal
        const resultadoFinal = tiempoTotal - diferenciaEnSegundos

        console.log('El tiempo total es:', tiempoTotal, 'segundos')
        console.log(
          'La diferencia en segundos entre la fecha actual y la del registro más antiguo es:',
          diferenciaEnSegundos,
          'segundos'
        )
        console.log(
          'El resultado final después de restar el tiempo total es:',
          resultadoFinal,
          'segundos'
        )

        // Verificación adicional
        console.log('Fecha actual:', fechaActual)
        console.log('Fecha del registro más antiguo:', fechaRegistroMasAntiguo)

        navigate('/tiempo', {
          state: {
            estado: 'enlazar',
            torre: infoSalida.TorreCarga,
            salidaId: infoSalida.Id,
            salida: infoSalida.Numero,
            tiempo: resultadoFinal,
          },
        })
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
      <div className="fixed inset-0 flex items-center justify-center text-text w-auto m-4P">
        <div className="bg-background p-5">
          <h2 className="font-primary font-bold text-3xl text-center mb-4">
            Ingresa el codigo mostrado en la pantalla LCD
          </h2>
          <form onSubmit={handleSubmit}>
            <label className="text-xl">Codigo: </label>
            <input
              type="number"
              name="Codigo"
              onChange={(event) => setCode(event.target.value)}
              className="text-xl"
            />
            <div className="flex gap-2 mt-4 text-lg">
              <button
                type="submit"
                className="flex-1 mr-2 bg-primary hover:bg-accent text-text py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
