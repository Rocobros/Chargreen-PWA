import React from 'react'
import Navbar from '../components/navbar/Navbar'
import CodePopup from '../components/Timer/CodePopup'
import { useNavigate } from 'react-router-dom'

const CodePage = () => {
  const navigate = useNavigate()

  return (
    <>
      <header className="flex items-center justify-between border-b p-2 bg-primary">
        <button
          onClick={() => navigate('/tiempo')}
          className="text-3xl"
        >
          ←
        </button>
        <h1 className="text-3xl font-bold">Enlazarse a Torre</h1>
      </header>

      <CodePopup />
      <Navbar />
    </>
  )
}

export default CodePage
