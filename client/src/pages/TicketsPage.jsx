import React, { useState, useEffect } from 'react'
import axiosInstance from '../func/axiosInstance'
import { toast, Toaster } from 'sonner'
import Navbar from '../components/navbar/Navbar'
import { useNavigate } from 'react-router-dom'
import Ticket from '../components/Chatbot/Ticket'

const TicketsPage = () => {
  const [tickets, setTickets] = useState([])
  const [expandedCard, setExpandedCard] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axiosInstance.get(`/api/chatbot`)
        setTickets(response.data)
      } catch (error) {}
    }

    fetchTickets()
  }, [])

  const handleCardClick = (index) => {
    setExpandedCard(expandedCard === index ? null : index)
  }

  return (
    <>
      <Toaster />
      <header className="flex items-center justify-between border-b p-2 bg-primary">
        <button
          onClick={() => navigate('/tickets')}
          className="text-3xl"
        >
          ←
        </button>
        <h1 className="text-3xl font-bold mr-4">Tickets Pendientes</h1>
      </header>

      <div className="flex flex-col items-center">
        {tickets.map((ticket, index) => (
          <TicketForm
            key={index}
            pregunta={ticket.Pregunta}
            respuesta={ticket.Respuesta}
            estado={ticket.Estado}
            moderador={ticket.UsuarioModerador}
            isExpanded={expandedCard === index}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>

      <Navbar />
    </>
  )
}

export default TicketsPage
