import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Chatbot from '../components/Chatbot/Chatbot'
import { useNavigate } from 'react-router-dom'

const ChatbotPage = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col">
      <header className="flex p-4 border-b border-gray-300 bg-primary justify-between">
        <h1 className="text-4xl font-primary font-bold">Chatbot</h1>
        <button
          onClick={() => navigate('/chatbot/tickets')}
          className="text-3xl"
        >
          <i className="bx bx-list-ul"></i>
        </button>
      </header>
      <Chatbot />
      <Navbar />
    </div>
  )
}

export default ChatbotPage
