import React, { useEffect, useState } from 'react'
import './BarraDeProgreso.css'
import axiosInstance from '../../func/axiosInstance'

const BarraDeProgreso = () => {
  const [progreso, setProgreso] = useState()

  useEffect(() => {
    const fetchLevel = async () => {
      const id = localStorage.getItem('id')
      try {
        const response = await axiosInstance.get(`/api/registro/month/${id}`)
        const botellasActuales = response.data.botellas
        console.log(botellasActuales)

        const user = await axiosInstance.get(`/api/usuarios/${id}`)
        const userLevel = user.data.Nivel
        console.log(userLevel)

        let levelAmount, nextAmount
        if (userLevel < 6) {
          const level = await axiosInstance.get(
            `/api/nivelusuario/${userLevel}`
          )
          const nextLevel = await axiosInstance.get(
            `/api/nivelusuario/${userLevel + 1}`
          )
          levelAmount = level.data.CantidadMinima
          nextAmount = nextLevel.data.CantidadMinima
        } else {
          levelAmount = 101
          nextAmount = 201
        }

        setProgreso(
          Math.round(
            ((botellasActuales - levelAmount) / (nextAmount - levelAmount)) *
              100
          )
        )
      } catch (error) {
        console.error(error)
      }
    }
    fetchLevel()
  }, [])

  return (
    <div className="contenedor-barra-progreso text-xl text-text">
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
