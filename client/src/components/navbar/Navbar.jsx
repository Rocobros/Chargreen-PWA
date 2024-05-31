import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Navbar = ({ disable }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [selected, setSelected] = useState('')
  const [role, setRole] = useState()

  const handleClick = (route) => {
    if (disable) {
      return // No permitir la navegación si disable es true
    }
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
    } else if (loc === '/enlazar') {
      setSelected('/tiempo')
    } else {
      setSelected(loc)
    }

    setRole(localStorage.getItem('role'))
  }, [location.pathname])

  const renderIcons = (icons) => (
    <nav className="h-auto fixed inset-x-0 bottom-0 flex justify-around items-center p-2 pb-8">
      {icons.map((icon) => (
        <i
          key={icon.route}
          className={`bx ${
            icon.iconClass
          } text-3xl active:text-primary active:scale-125 rounded ${
            selected === icon.route ? 'text-primary scale-125' : ''
          }`}
          onClick={() => handleClick(icon.route)}
        />
      ))}
    </nav>
  )

  const userIcons = [
    { route: '/', iconClass: 'bx-home' },
    { route: '/novedades', iconClass: 'bx-news' },
    { route: '/tiempo', iconClass: 'bx-time' },
    { route: '/mapa', iconClass: 'bx-map-alt' },
    { route: '/chatbot', iconClass: 'bx-bot' },
    { route: '/perfil', iconClass: 'bx-user' },
  ]

  const adminIcons = [
    { route: '/', iconClass: 'bx-home' },
    { route: '/agregarAdmin', iconClass: 'bx-add-to-queue' },
    { route: '/metricasAdmin', iconClass: 'bx-line-chart' },
    { route: '/login', iconClass: 'bx-log-out text-red-500' },
  ]

  const moderatorIcons = [
    { route: '/', iconClass: 'bx-home' },
    { route: '/agregarMod', iconClass: 'bx-add-to-queue' },
    { route: '/tickets', iconClass: 'bx-receipt' },
    { route: '/metricasAdmin', iconClass: 'bx-line-chart' },
    { route: '/login', iconClass: 'bx-log-out text-red-500' },
  ]

  let iconsToRender
  if (role === 'user') {
    iconsToRender = userIcons
  } else if (role === 'admin') {
    iconsToRender = adminIcons
  } else {
    iconsToRender = moderatorIcons
  }

  return (
    <footer className="bg-slate-100 shadow-2xl h-20 fixed inset-x-0 -bottom-0.5 flex justify-around items-center p-2 border-t-2">
      {renderIcons(iconsToRender)}
    </footer>
  )
}

export default Navbar
