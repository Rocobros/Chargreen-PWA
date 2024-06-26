import React from 'react'
import FormButton from '../FormComponents/FormButton'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../func/axiosInstance'
import { Toaster, toast } from 'sonner'

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180

  const R = 6371 // Radius of the Earth in km
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c // Distance in km

  return distance
}

const MapInfoBox = ({
  selectedTower,
  handleInfoClose,
  exits,
  userLocation,
}) => {
  const navigate = useNavigate()

  if (!selectedTower) return null

  const hasAvailableExits = exits.length > 0

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const userId = localStorage.getItem('id')
      const response = await axiosInstance.get(`/api/usuarios/${userId}`)
      const user = response.data
      const userTime = user.Tiempo

      const exitId = event.target.exitSelect.value
      console.log(exitId)
      const res = await axiosInstance.get(`/api/salidas/${exitId}`)
      console.log(res.data)
      const exitNum = res.data[0].Numero

      console.log(exitNum)

      await axiosInstance.post('/api/sendToEsp', {
        Torre: selectedTower.Id,
        Salida: Number(exitNum),
        Tiempo: userTime,
      })

      await axiosInstance.put(`/api/salidas/activar/${exitId}`)
      navigate('/tiempo', {
        state: { estado: 'mapa', torre: selectedTower.Id, salidaId: exitId, salida: exitNum },
      })
    } catch (error) {
      console.error(error)
      toast.error(error.response.data.message)
    }
  }

  const distanceToTower = calculateDistance(
    userLocation.lat,
    userLocation.lng,
    selectedTower.Position.lat,
    selectedTower.Position.lng
  )

  return (
    <>
      <Toaster />
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 text-xl">
        <div className="bg-background p-5 rounded-md shadow-md">
          <h2 className="font-primary font-bold text-3xl text-center mb-4">
            {selectedTower.Nombre}
          </h2>
          <p>Distancia a la torre: {distanceToTower.toFixed(2)} km</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="exitSelect">Elige una salida: </label>
            <select
              id="exitSelect"
              name="exitSelect"
              className="border border-gray-600"
            >
              {hasAvailableExits ? (
                exits.map((exit) => (
                  <option
                    key={exit.Id}
                    value={exit.Id}
                  >
                    {exit.Numero}
                  </option>
                ))
              ) : (
                <option>No hay salidas disponibles</option>
              )}
            </select>
            <div className="flex gap-2 mt-4 text-lg">
              <button
                type="reset"
                onClick={handleInfoClose}
                className="flex-1 ml-2 bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cerrar
              </button>
              <button
                disabled={!hasAvailableExits}
                type="submit"
                className="flex-1 mr-2 bg-primary hover:bg-accent text-whiteP py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Iniciar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default MapInfoBox
