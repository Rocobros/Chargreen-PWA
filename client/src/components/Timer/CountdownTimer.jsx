import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axiosInstance from '../../func/axiosInstance'
import { jwtDecode } from 'jwt-decode'

//TODO: Modificar el tiempo del usuario y desactivar la salida cuando se termine el tiempo

const CountdownTimer = () => {
  const [timeInSeconds, setTimeInSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false)

  const location = useLocation()
  const navigate = useNavigate()

  const getUserIdFromJWT = () => {
    const token = localStorage.getItem('jwt')
    if (!token) return null
    const decoded = jwtDecode(token)
    return decoded.id
  }

  useEffect(() => {
    const userId = getUserIdFromJWT()
    if (!userId) return
    // Function to fetch initial time
    const fetchInitialTime = async () => {
      try {
        const response = await axiosInstance.get(`/api/usuarios/${userId}`)
        setTimeInSeconds(response.data.Tiempo)
        if (location.state) {
          setIsActive(true)
        }
      } catch (error) {
        console.error('Error fetching initial time:', error)
      }
    }

    fetchInitialTime()
  }, [location.state])

  useEffect(() => {
    let timer = null
    if (isActive && timeInSeconds > 0) {
      timer = setInterval(() => {
        setTimeInSeconds((prevTime) => prevTime - 1)
      }, 1000)
    } else if (timeInSeconds <= 0) {
      clearInterval(timer)
      if (isActive) {
        stopTimer()
      }
    }
    return () => clearInterval(timer)
  }, [isActive, timeInSeconds])

  const stopTimer = () => {
    const userId = getUserIdFromJWT()
    if (!userId) return
    axiosInstance
      .put(`/api/usuarios/tiempo/${userId}`, {
        Tiempo: timeInSeconds,
      })
      .then(() => {
        setIsActive(false)
        setTimeInSeconds(0)
        if (location.state) {
          axiosInstance.post('/api/sendToEsp', {
            Torre: location.state.torre,
            Salida: location.state.salidaId,
            Tiempo: 0,
          })
          axiosInstance.put(
            `/api/salidas/desactivar/${location.state.salidaId}`
          )
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  // Convert seconds to minutes and seconds
  const minutes = Math.floor(timeInSeconds / 60)
  const seconds = timeInSeconds % 60

  // Leading zeros for minutes and seconds
  const formattedMinutes = String(minutes).padStart(2, '0')
  const formattedSeconds = String(seconds).padStart(2, '0')

  return (
    <>
      <header className="flex items-center p-4 border-b border-gray-300 bg-primary">
        <h1 className="text-4xl font-primary font-bold">Mi tiempo</h1>
      </header>
      <div className="flex justify-center items-center mt-60">
        <div className="w-5/6 md:w-fit h-auto text-text font-secondary font-semibold px-10 py-8">
          <h1 className="font-primary font-bold text-8xl text-center pb-4">
            {formattedMinutes}:{formattedSeconds}
          </h1>
          <div className="flex flex-row gap-4">
            <button
              className="w-full h-auto mb-2 bg-primary outline-none rounded-3xl shadow-lg cursor-pointer text-lg font-bold hover:bg-secondary active:ring active:ring-accent active:translate-y-1"
              onClick={() => navigate('/mapa')}
            >
              Enlzarme
            </button>
            <button
              className="w-full h-auto mb-2 bg-primary outline-none rounded-3xl shadow-lg text-lg font-bold hover:bg-secondary active:ring active:ring-accent active:translate-y-1"
              onClick={stopTimer}
              disabled={!isActive}
            >
              Guardar mi tiempo
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CountdownTimer
