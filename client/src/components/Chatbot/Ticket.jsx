import React, { useEffect, useState } from 'react'
import axiosInstance from '../../func/axiosInstance'

const Ticket = ({
  pregunta,
  respuesta,
  estado,
  moderador,
  isExpanded,
  onClick,
}) => {
  const [moderatorName, setModeratorName] = useState('')

  useEffect(() => {
    if (moderador) {
      axiosInstance.get(`/api/moderadores/${moderador}`).then((res) => {
        setModeratorName(res.data.Nombre)
      })
    }
  }, [])

  return (
    <div
      className={`${
        estado === 'R' ? 'bg-primary' : 'bg-red-500'
      } w-5/6 sm:w-96 rounded-lg shadow-lg p-4 cursor-pointer transition-all duration-2000 my-4`}
      onClick={onClick}
    >
      <div className={`flex flex-col items-center `}>
        <h2 className="text-2xl font-bold">{pregunta}</h2>
        <p className="text-text">{estado === 'R' ? 'Resuelto' : 'Pendiente'}</p>
      </div>
      <div
        className={`transition-all duration-500 ${
          isExpanded ? 'max-h-96' : 'max-h-0'
        } overflow-hidden`}
      >
        {isExpanded && (
          <div className="mt-4 overflow-y-auto max-h-64">
            {respuesta ? (
              <label className="text-text font-bold my-4 text-lg">
                Respuesta:
                <p className="font-normal">{respuesta}</p>
              </label>
            ) : (
              'Aun no ha sido respondido'
            )}
            {moderador && (
              <p className="text-sm">Respuesto por: {moderatorName}</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Ticket
