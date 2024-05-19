import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Verificar = () => {
  const queryParameters = new URLSearchParams(window.location.search)
  const id = queryParameters.get('id')

  //TODO: UseEffect to verify user when page is loaded
  useEffect(() => {
    axios
      .put(`http://localhost:3000/api/usuarios/verificar/${id}`)
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
