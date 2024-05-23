import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)

  const handleClick = (icon, route) => {
    setSelected(icon)
    if (route) {
      navigate(route)
    } else {
      alert(`Clicked ${icon}`)
    }
  }

  return (
    <footer className="bg-background shadow-2xl h-21 fixed inset-x-0 -bottom-0.5 flex justify-around items-center p-2">
      <nav className="h-auto fixed inset-x-0 bottom-0 flex justify-around items-center p-2 pb-8">
        <i
          className={`bx bx-home text-3xl active:text-primary active:scale-125 rounded ${
            selected === 'home' ? 'text-primary' : ''
          }`}
          onClick={() => handleClick('home', '/')}
        />
        <i
          className={`bx bx-news text-3xl active:text-primary active:scale-125 rounded ${
            selected === 'novedades' ? 'text-primary' : ''
          }`}
          onClick={() => handleClick('novedades', '/novedades')}
        />
        <i
          className={`bx bx-time text-3xl active:text-primary active:scale-125 rounded ${
            selected === 'time' ? 'text-primary' : ''
          }`}
          onClick={() => handleClick('time', '/tiempo')}
        />
        <i
          className={`bx bx-map-alt text-3xl active:text-primary active:scale-125 rounded ${
            selected === 'map' ? 'text-primary' : ''
          }`}
          onClick={() => handleClick('map', '/mapa')}
        />
        <i
          className={`bx bx-bot text-3xl active:text-primary active:scale-125 rounded ${
            selected === 'bot' ? 'text-primary' : ''
          }`}
          onClick={() => handleClick('bot', '/chatbot')}
        />
        <i
          className={`bx bx-user text-3xl active:text-primary active:scale-125 rounded ${
            selected === 'user' ? 'text-primary' : ''
          }`}
          onClick={() => handleClick('user', '/perfil')}
        />
      </nav>
    </footer>
  )
}

export default Navbar
