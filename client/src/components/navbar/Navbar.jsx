import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [selected, setSelected] = useState('')
  const [role, setRole] = useState()

  const handleClick = (route) => {
    setSelected(route)
    navigate(route)
  }

  useEffect(() => {
    const loc = location.pathname
    if (loc === '/editarPerfil') {
      setSelected('/perfil')
    } else if (loc === '/metricas') {
      setSelected('/perfil')
    } else if (loc === '/agregarAdmin/torre') {
      setSelected('/agregarAdmin')
    } else if (loc === '/agregarAdmin/moderador') {
      setSelected('/agregarAdmin')
    } else if (loc === '/agregarMod/novedad') {
      setSelected('/agregarMod')
    } else if (loc === '/agregarMod/actualizacion') {
      setSelected('/agregarMod')
    } else if (loc === '/chatbot/ticket') {
      setSelected('/chatbot')
    } else if (loc === '/chatbot/tickets') {
      setSelected('/chatbot')
    } else {
      setSelected(loc)
    }

    setRole(localStorage.getItem('role'))
  }, [])

  if (role === 'user') {
    return (
      <footer className="bg-slate-100 shadow-2xl h-20 fixed inset-x-0 -bottom-0.5 flex justify-around items-center p-2 border-t-2">
        <nav className="h-auto fixed inset-x-0 bottom-0 flex justify-around items-center p-2 pb-8">
          <i
            className={`bx bx-home text-3xl active:text-primary active:scale-125 rounded ${
              selected === '/' ? 'text-primary scale-125' : ''
            }`}
            onClick={() => handleClick('/')}
          />
          <i
            className={`bx bx-news text-3xl active:text-primary active:scale-125 rounded ${
              selected === '/novedades' ? 'text-primary scale-125' : ''
            }`}
            onClick={() => handleClick('/novedades')}
          />
          <i
            className={`bx bx-time text-3xl active:text-primary active:scale-125 rounded ${
              selected === '/tiempo' ? 'text-primary scale-125' : ''
            }`}
            onClick={() => handleClick('/tiempo')}
          />
          <i
            className={`bx bx-map-alt text-3xl active:text-primary active:scale-125 rounded ${
              selected === '/mapa' ? 'text-primary scale-125' : ''
            }`}
            onClick={() => handleClick('/mapa')}
          />
          <i
            className={`bx bx-bot text-3xl active:text-primary active:scale-125 rounded ${
              selected === '/chatbot' ? 'text-primary scale-125' : ''
            }`}
            onClick={() => handleClick('/chatbot')}
          />
          <i
            className={`bx bx-user text-3xl active:text-primary active:scale-125 rounded ${
              selected === '/perfil' ? 'text-primary scale-125' : ''
            }`}
            onClick={() => handleClick('/perfil')}
          />
        </nav>
      </footer>
    )
  } else if (role === 'admin') {
    return (
      <footer className="bg-slate-100 shadow-2xl h-20 fixed inset-x-0 -bottom-0.5 flex justify-around items-center p-2 border-t-2">
        <nav className="h-auto fixed inset-x-0 bottom-0 flex justify-around items-center p-2 pb-8">
          <i
            className={`bx bx-home text-3xl active:text-primary active:scale-125 rounded ${
              selected === '/' ? 'text-primary scale-125' : ''
            }`}
            onClick={() => handleClick('/')}
          />
          <i
            className={`bx bx-add-to-queue text-3xl active:text-primary active:scale-125 rounded ${
              selected === '/agregarAdmin' ? 'text-primary scale-125' : ''
            }`}
            onClick={() => handleClick('/agregarAdmin')}
          />
          <i
            className={`bx bx-line-chart text-3xl active:text-primary active:scale-125 rounded ${
              selected === '/metricasAdmin' ? 'text-primary scale-125' : ''
            }`}
            onClick={() => handleClick('/metricasAdmin')}
          />
          <i
            className={`bx bx-log-out text-3xl active:text-primary text-red-500 active:scale-125 rounded ${
              selected === '/login' ? 'text-red-500 scale-125' : ''
            }`}
            onClick={() => handleClick('/login')}
          />
        </nav>
      </footer>
    )
  } else {
    return (
      <footer className="bg-slate-100 shadow-2xl h-20 fixed inset-x-0 -bottom-0.5 flex justify-around items-center p-2 border-t-2">
        <nav className="h-auto fixed inset-x-0 bottom-0 flex justify-around items-center p-2 pb-8">
          <i
            className={`bx bx-home text-3xl active:text-primary active:scale-125 rounded ${
              selected === '/' ? 'text-primary scale-125' : ''
            }`}
            onClick={() => handleClick('/')}
          />
          <i
            className={`bx bx-add-to-queue text-3xl active:text-primary active:scale-125 rounded ${
              selected === '/agregarMod' ? 'text-primary scale-125' : ''
            }`}
            onClick={() => handleClick('/agregarMod')}
          />
          <i
            className={`bx bx-receipt text-3xl active:text-primary active:scale-125 rounded ${
              selected === '/tickets' ? 'text-primary scale-125' : ''
            }`}
            onClick={() => handleClick('/tickets')}
          />
          <i
            className={`bx bx-line-chart text-3xl active:text-primary active:scale-125 rounded ${
              selected === '/metricasAdmin' ? 'text-primary scale-125' : ''
            }`}
            onClick={() => handleClick('/metricasAdmin')}
          />
          <i
            className={`bx bx-log-out text-3xl active:text-primary text-red-500 pactive:scale-125 rounded ${
              selected === '/login' ? 'text-red-500 scale-125' : ''
            }`}
            onClick={() => handleClick('/login')}
          />
        </nav>
      </footer>
    )
  }
}

export default Navbar
