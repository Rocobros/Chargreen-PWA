import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Novedades = () => {
  const [novedades, setNovedades] = useState([])

  useEffect(() => {
    const fetchNovedades = async () => {
      const response = await axios.get('https://chargreen.com.mx/api/novedades')
      //TODO: Obtener el nombre del moderador
      setNovedades(response.data)
    }
    fetchNovedades()
  }, [])

  const mapNovedades = novedades.map((novedad) => (
    <div
      key={novedad.Id}
      className="max-w-sm w-full lg:max-w-full lg:flex"
    >
      <div
        className="bg-center bg-[url(https://st2.depositphotos.com/4211709/7708/i/450/depositphotos_77085751-stock-photo-flower.jpg)] h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
        title="Woman holding a mug"
      ></div>
      <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <div className="text-gray-900 font-bold text-xl mb-2">
            {novedad.Titulo}
          </div>
          <p className="text-gray-700 text-base">{novedad.Descripcion}</p>
        </div>
        <div className="flex items-center">
          <div className="text-sm">
            <p className="text-gray-900 leading-none">
              {novedad.UsuarioModerador}
            </p>
          </div>
        </div>
      </div>
    </div>
  ))

  return <>{mapNovedades}</>
}

export default Novedades
