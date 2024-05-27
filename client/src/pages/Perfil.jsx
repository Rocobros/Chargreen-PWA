import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../func/axiosInstance'
import { jwtDecode } from 'jwt-decode'
import BarraDeProgreso from '../components/Barra/BarraDeProgreso'

const Perfil = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({})
  const [nivel, setNivel] = useState({})

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('jwt')
      const { id } = jwtDecode(token)
      try {
        const response = await axiosInstance.get(`/api/usuarios/${id}`)
        setUser(response.data)
        const nivel = await axiosInstance.get(
          `/api/nivelusuario/${response.data.Nivel}`
        )
        setNivel(nivel.data)
      } catch (error) {
        console.error(error.response.data.message)
      }
    }
    fetchUser()
  }, [])

  return (
    <div className="flex flex-col h-screen bg-background text-text font-secondary text-3xl">
      <header className="flex items-center p-4 border-b border-gray-300 bg-primary">
        <h1 className="text-4xl font-primary font-bold">Perfil de usuario</h1>
      </header>
      <div className="p-4 text-3xl">
        Hola {user.Nombre}
        <br />
        <br />
        Tu nivel actual es: <span className="text-primary">{nivel.Nombre}</span>
        <p className="text-base mt-8">Progreso al siguiente nivel: </p>
      </div>
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
        <LogoutItem
          label="Cerrar sesion"
          handleClick={() => {
            navigate('/login')
          }}
        />
      </div>
    </div>
  )
}

const LogoutItem = ({ label, handleClick }) => (
  <div className="flex items-center justify-between p-4 text-red-600">
    <span>{label}</span>
    <span className="text-xl">
      <button onClick={handleClick}>&gt;</button>
    </span>
  </div>
)

const MenuItem = ({ label, handleClick }) => (
  <div className="flex items-center justify-between p-4 text-text">
    <span>{label}</span>
    <span className="text-xl">
      <button onClick={handleClick}>&gt;</button>
    </span>
  </div>
)

export default Perfil
