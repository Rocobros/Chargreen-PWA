import React from 'react'
import FormButton from '../FormComponents/FormButton'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const MapInfoBox = ({ selectedTower, handleInfoClose, exits }) => {
  const navigate = useNavigate()

  if (!selectedTower) return null

  const hasAvailableExits = exits.length > 0

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const userId = localStorage.getItem('userId')
      const response = await axios.get(
        `https://chargreen.com.mx/api/usuarios/${userId}`
      )
      const user = response.data
      const userTime = user.Tiempo

      const exitId = event.target.exitSelect.value
      const res = await axios.get(
        `https://chargreen.com.mx/api/salidas/${exitId}`
      )
      const exitNum = res.data.Numero

      await axios.post('https://chargreen.com.mx/api/sendToEsp', {
        Torre: selectedTower.Id,
        Salida: Number(exitNum),
        Tiempo: userTime,
      })

      await axios.put(`https://chargreen.com.mx/api/salidas/activar/${exitId}`)
      navigate('/tiempo', {
        state: { torre: selectedTower.Id, salidaId: exitId },
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit max-w-[400px] bg-secondary p-5 rounded-md shadow-md">
      <h2 className="font-primary font-bold text-xl text-center">
        {selectedTower.Nombre}
      </h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="exitSelect">Elige una salida:</label>
        <select
          id="exitSelect"
          name="exitSelect"
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
        <div className="mt-2">
          <FormButton disabledCondition={!hasAvailableExits}>
            Usar mi tiempo
          </FormButton>
        </div>
      </form>
      <FormButton onClick={handleInfoClose}>Cerrar</FormButton>
    </div>
  )
}

export default MapInfoBox
