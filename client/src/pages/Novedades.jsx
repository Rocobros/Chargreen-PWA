import React, { useEffect, useState } from 'react'
import axiosInstance from '../func/axiosInstance'
import Tarjeta from '../components/Novedades/Tarjeta'

const Novedades = () => {
  const [novedades, setNovedades] = useState([])
  const [filteredNovedades, setFilteredNovedades] = useState([])
  const [expandedCard, setExpandedCard] = useState(null)
  const [filter, setFilter] = useState('N') // Default filter to 'Novedades'

  const handleCardClick = (index) => {
    setExpandedCard(expandedCard === index ? null : index)
  }

  const handleFilterChange = (type) => {
    setFilter(type)
  }

  useEffect(() => {
    const fetchNovedades = async () => {
      const response = await axiosInstance.get('/api/novedades')
      setNovedades(response.data)
    }

    fetchNovedades()
  }, [])

  useEffect(() => {
    setFilteredNovedades(novedades.filter((novedad) => novedad.Tipo === filter))
  }, [novedades, filter])

  return (
    <>
      <header className="flex items-center p-4 border-b border-gray-300 bg-primary">
        <h1 className="text-4xl font-primary font-bold">
          Novedades y actualizaciones
        </h1>
      </header>
      <div className="text-center flex my-2 gap-2">
        <button
          className={`flex-1 bg-primary text-text border-none py-2.5 px-5 m-1 cursor-pointer text-base ml-4 ${
            filter === 'N' ? 'bg-secondary' : ''
          }`}
          onClick={() => handleFilterChange('N')}
        >
          Novedades
        </button>
        <button
          className={`flex-1 bg-primary text-text border-none py-2.5 px-5 m-1 cursor-pointer text-base mr-4 ${
            filter === 'A' ? 'bg-secondary' : ''
          }`}
          onClick={() => handleFilterChange('A')}
        >
          Actualizaciones
        </button>
      </div>
      <div className="flex flex-col items-center w-screen h-screen overflow-hidden p-4 space-y-4">
        <div className="w-full max-w-md h-full overflow-y-auto">
          {filteredNovedades.map((novedad, index) => (
            <Tarjeta
              key={novedad.Id}
              title={novedad.Titulo}
              date={new Date(novedad.Fecha).toDateString()}
              image={novedad.Imagen}
              description={novedad.Descripcion}
              link={novedad.Link}
              isExpanded={expandedCard === index}
              onClick={() => handleCardClick(index)}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default Novedades
