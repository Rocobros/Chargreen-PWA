import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'

//TODO: Modificar el tiempo del usuario y desactivar la salida cuando se termine el tiempo

const CountdownTimer = () => {
    const [timeInSeconds, setTimeInSeconds] = useState(0)
    const [isActive, setIsActive] = useState(true)

    const location = useLocation()

    useEffect(() => {
        // Function to fetch initial time
        const fetchInitialTime = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/api/usuarios/${localStorage.getItem(
                        'userId'
                    )}`
                )
                setTimeInSeconds(response.data.Tiempo)
            } catch (error) {
                console.error('Error fetching initial time:', error)
            }
        }

        fetchInitialTime()
    }, []) // Empty dependency array means this effect runs once on mount

    useEffect(() => {
        let timer = null
        if (isActive && timeInSeconds > 0) {
            timer = setInterval(() => {
                setTimeInSeconds((prevTime) => prevTime - 1)
            }, 1000)
        } else if (!isActive) {
            clearInterval(timer)
        }
        return () => clearInterval(timer)
    }, [isActive, timeInSeconds])

    const stopTimer = () => {
        axios
            .put(
                `http://localhost:3000/api/usuarios/tiempo/${localStorage.getItem(
                    'userId'
                )}`,
                {
                    Tiempo: timeInSeconds,
                }
            )
            .then(() => {
                setIsActive(false)
                setTimeInSeconds(0)
                axios.post('http://localhost:3000/sendToEsp', {
                    Torre: location.state.torre,
                    Salida: location.state.salidaId,
                    Tiempo: 0,
                })
                axios.put(
                    `http://localhost:3000/api/salidas/desactivar/${location.state.salidaId}`
                )
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
        <div>
            <div>
                {formattedMinutes}:{formattedSeconds}
            </div>
            <button onClick={stopTimer}>Stop</button>
        </div>
    )
}

export default CountdownTimer
