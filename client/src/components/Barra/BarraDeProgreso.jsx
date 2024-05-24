import React, { useEffect, useState } from 'react'
import './BarraDeProgreso.css'
import axiosInstance from '../../func/axiosInstance'
import { jwtDecode } from 'jwt-decode'

const BarraDeProgreso = () => {
  const [progreso, setProgreso] = useState()

  useEffect(() => {
    const fetchLevel = async () => {
      const token = localStorage.getItem('jwt')
      const { id } = jwtDecode(token)
      try {
        const response = await axiosInstance.get('/api/registro')
        const data = response.data
        console.log(data)
        const filteredData = data.filter((item) => item.UsuarioNormal === id)
        console.log(filteredData)
        setProgreso((filteredData.length / data.length) * 100)
      } catch (error) {
        console.error(error.response.data.message)
      }
    }
    fetchLevel()
  }, [])

  return (
    <div className="contenedor-barra-progreso">
      <div
        className="barra-progreso"
        style={{ width: `${progreso}%` }}
      >
        {progreso}%
      </div>
    </div>
  )
}

export default BarraDeProgreso
