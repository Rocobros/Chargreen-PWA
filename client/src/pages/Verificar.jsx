import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import axiosInstance from '../func/axiosInstance'

const Verificar = () => {
  const queryParameters = new URLSearchParams(window.location.search)
  const id = queryParameters.get('id')

  useEffect(() => {
    axiosInstance
      .put(`/api/usuarios/verificar/${id}`)
      .catch((err) => console.log(err))
  }, [])
  return (
    <div>
      Cuenta verificada
      <br />
      <Link to={'/login'}>Regresar a ingresar</Link>
    </div>
  )
}

export default Verificar
