import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountdownTimer = ({ userId }) => {
    const [timeInSeconds, setTimeInSeconds] = useState(0) // Start with 0, will be updated
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        // Function to fetch initial time
        const fetchInitialTime = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/api/usuarios/${userId}`
                )
                setTimeInSeconds(response.data.Tiempo)
            } catch (error) {
                console.error('Error fetching initial time:', error)
                // Handle error, possibly setting a default time or giving feedback to the user
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

    const startTimer = () => {
        setIsActive(true)
    }

    const stopTimer = () => {
        axios
            .put(`http://localhost:3000/api/usuarios/tiempo/${userId}`, {
                Tiempo: timeInSeconds,
            })
            .then(() => {
                setIsActive(false)
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
            <button onClick={startTimer}>Start</button>
            <button onClick={stopTimer}>Stop</button>
        </div>
    )
}

export default CountdownTimer
