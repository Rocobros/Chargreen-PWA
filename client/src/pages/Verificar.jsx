import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosInstance from '../func/axiosInstance'
import { useNavigate } from 'react-router-dom'

const Verificar = () => {
  const queryParameters = new URLSearchParams(window.location.search)
  const id = queryParameters.get('id')
  const [counter, setCounter] = useState(5)
  const navigate = useNavigate()

  useEffect(() => {
    axiosInstance
      .put(`/api/usuarios/verificar/${id}`)
      .catch((err) => console.log(err))

    const timer = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter <= 1) {
          clearInterval(timer)
          navigate('/login')
        }
        return prevCounter - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [id])

  return (
    <div>
      <p>
        Tu cuenta ha sido verificada. <br />
        Serás redirigido al inicio de sesión en {counter} segundos. <br />O haz
        click{' '}
        <a
          className="text-primary"
          href="/login"
        >
          aqui
        </a>{' '}
        para redirigirte antes.
      </p>
    </div>
  )
}

export default Verificar
