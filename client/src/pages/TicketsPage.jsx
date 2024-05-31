import React, { useState, useEffect } from 'react'
import axiosInstance from '../func/axiosInstance'
import { toast, Toaster } from 'sonner'
import Navbar from '../components/navbar/Navbar'
import { useNavigate } from 'react-router-dom'
import TicketForm from '../components/Chatbot/TicketForm'

const TicketsPage = () => {
  const [tickets, setTickets] = useState([])
  const [filteredTickets, setFilteredTickets] = useState([])
  const [popUp, setPopUp] = useState(null)

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

  useEffect(() => {
    const filter = tickets.filter((item) => item.Estado === 'A')
    setFilteredTickets(filter)
  }, [tickets])

  const handleCardClick = (index) => {
    setPopUp(popUp === index ? null : index)
  }

  return (
    <>
      <Toaster />
      <header className="flex items-center justify-between border-b p-2 bg-primary">
        <h1 className="text-4xl font-bold mr-4">Tickets Pendientes</h1>
      </header>

      <div className="flex flex-col items-center">
        {filteredTickets.map((ticket, index) => (
          <TicketForm
            key={index}
            id={ticket.Id}
            pregunta={ticket.Pregunta}
            usuario={ticket.UsuarioNormal}
          />
        ))}
      </div>

      <Navbar />
    </>
  )
}

export default TicketsPage
