import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [selected, setSelected] = useState(location.pathname)

  const handleClick = (route) => {
    setSelected(route)
    navigate(route)
  }

  return (
    <footer className="bg-background shadow-2xl h-20 fixed inset-x-0 -bottom-0.5 flex justify-around items-center p-2 border-t-2">
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
}

export default Navbar
