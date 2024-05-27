import React, { useEffect, useState } from 'react'
import { Pie, Bar } from 'react-chartjs-2'
import 'chart.js/auto'
import axiosInstance from '../../func/axiosInstance'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

const colors = {
  text: '#081603',
  background: '#f4fdf2',
  primary: '#59a73c',
  secondary: '#8aefc0',
  accent: '#54e8d2',
  palette: ['#59a73c', '#8aefc0', '#54e8d2', '#f4fdf2', '#081603'],
}

const MetricasPage = () => {
  const [data, setData] = useState([])
  const [pieChartData, setPieChartData] = useState(null)
  const [barsChartData, setBarsChartData] = useState(null)
  const [actualTime, setActualTime] = useState(null)
  const [timeUsed, setTimeUsed] = useState(null)
  const [energyUsed, setEnergyUsed] = useState(null)
  const [noRender, setNoRender] = useState(false)

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

    axiosInstance
      .get(`/api/metricas/${userId}`)
      .then((response) => {
        const data = response.data
        if (data && Array.isArray(data)) {
          setData(data)
        } else {
          console.error('Data is not in expected format:', data)
        }
      })
      .catch((error) => console.error('Error fetching data:', error))
  }, [])

  useEffect(() => {
    const userId = getUserIdFromJWT()
    if (!userId) return

    axiosInstance
      .get(`/api/usuarios/${userId}`)
      .then((response) => {
        const data = response.data
        if (data) {
          setActualTime(data.Tiempo)
        } else {
          console.error('Data is not in expected format:', data)
        }
      })
      .catch((error) => console.error('Error fetching data:', error))
  }, [])

  useEffect(() => {
    if (data.length > 0 && actualTime !== null) {
      updateCharts(data)
    }
  }, [data, actualTime])

  const updateCharts = (data) => {
    if (!data || data.length === 0) {
      setPieChartData(null)
      setBarsChartData(null)
      setTimeUsed(null)
      setNoRender(true)
      return
    }

    //Obtener suma de los segundos de las botellas registradas
    let sum = 0
    data.map((item) => {
      sum += item.Segundos
    })
    //Definir el tiempo real de uso
    setTimeUsed(sum - actualTime)

    setEnergyUsed(((sum - actualTime) / 3600) * 20)

    // Procesar los datos para obtener los conteos de botellas por torre
    const torreCounts = data.reduce((acc, item) => {
      acc[item.Torre] = (acc[item.Torre] || 0) + 1
      return acc
    }, {})

    const labels = Object.keys(torreCounts)
    const values = Object.values(torreCounts)

    setPieChartData({
      labels: labels,
      datasets: [
        {
          label: 'Botellas: ',
          data: values,
          backgroundColor: colors.palette,
          borderColor: colors.palette.map(() => colors.text),
          borderWidth: 1,
        },
      ],
    })

    const userBottleCounts = data.reduce((acc, item) => {
      const key = `${item.Botella}`
      acc[key] = (acc[key] || 0) + 1
      return acc
    }, {})

    const barsLabels = Object.keys(userBottleCounts).map((key) => {
      return key
    })
    const barsValues = Object.values(userBottleCounts)

    setBarsChartData({
      labels: barsLabels,
      datasets: [
        {
          label: 'Cantidad: ',
          data: barsValues,
          backgroundColor: colors.primary,
          borderColor: colors.text,
          borderWidth: 1,
        },
      ],
    })
  }

  const filterData = (period) => {
    const now = new Date()
    let filteredData = []

    if (period === '6m') {
      const sixMonthsAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 6,
        now.getDate()
      )
      filteredData = data.filter((item) => new Date(item.Fecha) >= sixMonthsAgo)
    } else if (period === '1m') {
      const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      )
      filteredData = data.filter((item) => new Date(item.Fecha) >= oneMonthAgo)
    } else if (period === '1w') {
      const oneWeekAgo = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - 7
      )
      filteredData = data.filter((item) => new Date(item.Fecha) >= oneWeekAgo)
    }
    updateCharts(filteredData)
  }

  return (
    <>
      <header className="flex items-center justify-between border-b p-2 mb-4 bg-primary">
        <button
          onClick={() => navigate('/perfil')}
          className="text-3xl"
        >
          ←
        </button>
        <h1 className="text-3xl font-bold">Metricas</h1>
      </header>
      {!noRender && (
        <div
          className="bg-background p-2"
          style={{ paddingBottom: 'var(--navbar-height)' }}
        >
          <div className="">
            <div className="text-center mb-5">
              <button
                className="bg-primary text-text border-none py-2.5 px-5 m-1 cursor-pointer text-base"
                onClick={() => filterData('6m')}
              >
                Últimos 6 meses
              </button>
              <button
                className="bg-primary text-text border-none py-2.5 px-5 m-1 cursor-pointer text-base"
                onClick={() => filterData('1m')}
              >
                Último mes
              </button>
              <button
                className="bg-primary text-text border-none py-2.5 px-5 m-1 cursor-pointer text-base"
                onClick={() => filterData('1w')}
              >
                Última semana
              </button>
            </div>
            <div className="mb-2">
              <h1 className="text-center">Cantidad de Botellas por Torre</h1>
              {pieChartData ? (
                <Pie data={pieChartData} />
              ) : (
                <p>Loading data...</p>
              )}
            </div>
            <div className="mb-2">
              <h1 className="text-center">
                Cantidad de Botellas por Clasificación
              </h1>
              {barsChartData ? (
                <Bar
                  data={barsChartData}
                  options={{
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              ) : (
                <p>Loading data...</p>
              )}
            </div>
            <div className="mb-2">
              <h1 className="text-center text-2xl">
                Cantidad de tiempo usado: {timeUsed} segundos
              </h1>
            </div>
            <div className="mb-2">
              <h1 className="text-center text-2xl">
                Cantidad de energia usada: {Math.floor(energyUsed)} Watts
              </h1>
            </div>
          </div>
        </div>
      )}
      {noRender && (
        <h1 className="text-4xl font-primary">No se tiene registro</h1>
      )}
    </>
  )
}

export default MetricasPage
