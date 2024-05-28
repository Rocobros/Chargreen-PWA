import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Chatbot from '../components/Chatbot/Chatbot'

const ChatbotPage = () => {
  return (
    <>
      <header className="flex items-center p-4 border-b border-gray-300 bg-primary">
        <h1 className="text-4xl font-primary font-bold">Perfil de usuario</h1>
      </header>
      <Chatbot />
      <Navbar />
    </>
  )
}

export default ChatbotPage
