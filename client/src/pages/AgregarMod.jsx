import React from 'react'
import Navbar from '../components/navbar/Navbar'
import { useNavigate } from 'react-router-dom'

const AgregarMod = () => {
  const navigate = useNavigate()

  return (
    <>
      <header className="flex items-center p-4 border-b border-gray-300 bg-primary">
        <h1 className="text-4xl font-primary font-bold">Agregar</h1>
      </header>
      <div className="flex flex-col divide-y divide-gray-300  text-xl">
        <MenuItem
          label={'Agregar Novedad'}
          handleClick={() => {
            navigate('/agregarMod/novedad')
          }}
        />
        <MenuItem
          label={'Agregar Actualizacion'}
          handleClick={() => {
            navigate('/agregarMod/actualizacion')
          }}
        />
      </div>
      <Navbar />
    </>
  )
}

const MenuItem = ({ label, handleClick }) => (
  <div className="flex items-center justify-between p-4 text-text">
    <span>{label}</span>
    <span className="text-xl">
      <button onClick={handleClick}>&gt;</button>
    </span>
  </div>
)

export default AgregarMod
