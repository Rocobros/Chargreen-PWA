import React, { useEffect, useState } from 'react'
import { Pie, Bar } from 'react-chartjs-2'
import 'chart.js/auto'
import axiosInstance from '../../func/axiosInstance'
import Navbar from '../navbar/Navbar'

const colors = {
  text: '#081603',
  background: '#f4fdf2',
  primary: '#59a73c',
  secondary: '#8aefc0',
  accent: '#54e8d2',
  palette: ['#59a73c', '#8aefc0', '#54e8d2', '#f4fdf2', '#081603'],
}

const MetricasAdminPage = () => {
  const [data, setData] = useState([])
  const [pieChartData, setPieChartData] = useState(null)
  const [barsChartData, setBarsChartData] = useState(null)
  const [actualTime, setActualTime] = useState(0)
  const [timeUsed, setTimeUsed] = useState(0)
  const [energyUsed, setEnergyUsed] = useState(0)
  const [noRender, setNoRender] = useState(false)
  const [filter, setFilter] = useState('t')
  const [users, setUsers] = useState([])
  const [towers, setTowers] = useState([])
  const [selectedUser, setSelectedUser] = useState('')
  const [selectedTorre, setSelectedTorre] = useState('')

  useEffect(() => {
    axiosInstance
      .get(`/api/metricas`)
      .then((response) => {
        const data = response.data
        if (data && Array.isArray(data)) {
          setData(data)
        } else {
          console.error('Data is not in expected format:', data)
        }
      })
      .catch((error) => console.error('Error fetching data:', error))

    axiosInstance.get('/api/usuarios').then((res) => {
      setUsers(res.data)
    })

    axiosInstance.get('/api/torres').then((res) => {
      setTowers(res.data)
    })
  }, [])

  useEffect(() => {
    if (data.length > 0) {
      applyFilters(data)
    }
  }, [data, actualTime, selectedUser, selectedTorre])

  const updateCharts = (filteredData) => {
    if (!filteredData || filteredData.length === 0) {
      setPieChartData(null)
      setBarsChartData(null)
      setTimeUsed(0)
      setEnergyUsed(0)
      setNoRender(true)
      return
    } else {
      setNoRender(false)
    }

    let sum = 0
    filteredData.forEach((item) => {
      sum += item.Segundos
    })

    setTimeUsed(sum - actualTime)
    setEnergyUsed(((sum - actualTime) / 3600) * 20)

    const torreCounts = filteredData.reduce((acc, item) => {
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

    const userBottleCounts = filteredData.reduce((acc, item) => {
      const key = `${item.Botella}`
      acc[key] = (acc[key] || 0) + 1
      return acc
    }, {})

    const barsLabels = Object.keys(userBottleCounts)
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

    setFilter(period)

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
    } else if (period === 't') {
      filteredData = data
    }
    applyFilters(filteredData)
  }

  const applyFilters = (filteredData) => {
    if (selectedUser) {
      filteredData = filteredData.filter(
        (item) => item.IdUsuario === parseInt(selectedUser)
      )
    }

    if (selectedTorre) {
      filteredData = filteredData.filter(
        (item) => item.IdTorre === parseInt(selectedTorre)
      )
    }

    updateCharts(filteredData)
  }

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value)
  }

  const handleTorreChange = (e) => {
    setSelectedTorre(e.target.value)
  }

  return (
    <>
      <header className="flex items-center p-4 border-b border-gray-300 bg-primary">
        <h1 className="text-4xl font-primary font-bold">
          Metricas del sistema
        </h1>
      </header>
      <div
        className="bg-background p-2"
        style={{ paddingBottom: 'var(--navbar-height)' }}
      >
        <div className="">
          <div className="text-center mb-5">
            <button
              className={`bg-primary text-text border-none py-2.5 px-5 m-1 cursor-pointer text-base ${
                filter === 't' ? 'bg-secondary' : ''
              }`}
              onClick={() => filterData('t')}
            >
              Todos
            </button>
            <button
              className={`bg-primary text-text border-none py-2.5 px-5 m-1 cursor-pointer text-base ${
                filter === '6m' ? 'bg-secondary' : ''
              }`}
              onClick={() => filterData('6m')}
            >
              Últimos 6 meses
            </button>
            <button
              className={`bg-primary text-text border-none py-2.5 px-5 m-1 cursor-pointer text-base ${
                filter === '1m' ? 'bg-secondary' : ''
              }`}
              onClick={() => filterData('1m')}
            >
              Último mes
            </button>
            <button
              className={`bg-primary text-text border-none py-2.5 px-5 m-1 cursor-pointer text-base ${
                filter === '1w' ? 'bg-secondary' : ''
              }`}
              onClick={() => filterData('1w')}
            >
              Última semana
            </button>
          </div>
          <div className="flex justify-center mb-5">
            <select
              value={selectedUser}
              onChange={handleUserChange}
              className="bg-primary text-text border-none py-2.5 px-5 m-1 cursor-pointer text-base"
            >
              <option>Selecciona un usuario</option>
              {users.map((usuario) => (
                <option
                  key={usuario.Registro}
                  value={usuario.Registro}
                >
                  {usuario.Nombre}
                </option>
              ))}
            </select>
            <select
              value={selectedTorre}
              onChange={handleTorreChange}
              className="bg-primary text-text border-none py-2.5 px-5 m-1 cursor-pointer text-base"
            >
              <option value="">Selecciona una torre</option>
              {towers.map((torre) => (
                <option
                  key={torre.Id}
                  value={torre.Id}
                >
                  {torre.Nombre}
                </option>
              ))}
            </select>
          </div>
          {noRender ? (
            <div className="text-center mt-5">
              <p>No hay datos disponibles para mostrar.</p>
            </div>
          ) : (
            <>
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
              <div className="text-center mt-5">
                <p>Tiempo total utilizado: {Math.round(timeUsed)} segundos</p>
                <p>Energia total utilizada: {Math.round(energyUsed)} Joules</p>
              </div>
            </>
          )}
        </div>
      </div>
      <Navbar />
    </>
  )
}

export default MetricasAdminPage
