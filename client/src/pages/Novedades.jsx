import React, { useEffect, useState } from 'react'
import axiosInstance from '../func/axiosInstance'
import Tarjeta from '../components/Novedades/Tarjeta'

const Novedades = () => {
  const [novedades, setNovedades] = useState([])
  const [expandedCard, setExpandedCard] = useState(null)

  const handleCardClick = (index) => {
    setExpandedCard(expandedCard === index ? null : index)
  }

  useEffect(() => {
    const fetchNovedades = async () => {
      const response = await axiosInstance.get('/api/novedades')
      setNovedades(response.data)
    }

    fetchNovedades()
  }, [])

  return (
    <div className="flex flex-col items-center w-screen h-screen overflow-hidden p-4 space-y-4">
      <div className="w-full max-w-md">
        {novedades.map((novedad, index) => (
          <Tarjeta
            key={novedad.Id}
            title={novedad.Titulo}
            date={novedad.Fecha}
            image={novedad.Imagen}
            description={novedad.Descripcion}
            isExpanded={expandedCard === index}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default Novedades
