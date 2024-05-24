import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../func/axiosInstance'
import { jwtDecode } from 'jwt-decode'
import BarraDeProgreso from '../components/Barra/BarraDeProgreso'
const Perfil = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('jwt')
      const { id } = jwtDecode(token)
      try {
        const response = await axiosInstance.get(`/api/usuarios/${id}`)
        setUser(response.data.Nombre)
      } catch (error) {
        console.error(error.response.data.message)
      }
    }
    fetchUser()
  }, [])

  return (
    <div className="flex flex-col h-screen bg-background text-text">
      <header className="flex items-center p-4 border-b border-gray-300">
        <h1 className="text-2xl font-bold ml-4">Perfil de usuario</h1>
      </header>
      <div className="p-4 text-lg">Hola {user}, you’re Green Level</div>
      <BarraDeProgreso />
      <div className="flex flex-col divide-y divide-gray-300">
        <MenuItem
          label="Editar Perfil"
          handleClick={() => {
            navigate('/editarPerfil')
          }}
        />
        <MenuItem
          label="Ver Metricas"
          handleClick={() => {
            navigate('/metricas')
          }}
        />
        <MenuItem
          label="Cerrar sesion"
          handleClick={() => {
            navigate('/login')
          }}
        />
      </div>
    </div>
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

export default Perfil
