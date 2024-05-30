import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Chatbot() {
  const [input, setInput] = useState('')
  const [chatHistory, setChatHistory] = useState([])
  const [context, setContext] = useState('start')
  const [isActive, setIsActive] = useState(true) // Nuevo estado para manejar la actividad del chat
  const navigate = useNavigate()

  useEffect(() => {
    const welcomeMessage = {
      user: false,
      text: 'Bienvenido al ChatBot. Ingresa 1 para Duda. Ingresa 2 para Problema.',
    }
    setChatHistory([welcomeMessage])
    setContext('main')
  }, [])

  const handleUserInput = (event) => {
    event.preventDefault()
    if (!isActive) return // No hacer nada si el chat no está activo

    const userInput = input.trim().toLowerCase()
    const newEntry = { user: true, text: input }
    setChatHistory((chatHistory) => [...chatHistory, newEntry])

    processInput(userInput)
    setInput('')
  }

  const processInput = (input) => {
    let responseText =
      'Lo siento, esa no es una opción válida, vuelve a ingresar'
    if (!isActive) {
      responseText = 'El chat ha terminado.'
    } else if (context === 'main') {
      switch (input) {
        case '1':
          responseText =
            '¿En referencia a qué tienes duda? (Ingresa 1 para torre, 2 para botellas, 3 para aplicación o 4 para otro).'
          setContext('duda')
          break
        case '2':
          responseText =
            '¿En referencia a qué es tu problema? (Ingresa 1 para funcionamiento, 2 para salidas, 3 para aplicación o 4 para otro).'
          setContext('problema')
          break
        default:
          break
      }
    } else if (context === 'duda') {
      switch (input) {
        case '1':
          responseText =
            '¿Sobre qué tienes duda de la torre? (Ingresa 1 para funcionamiento, 2 para salidas, 3 para aplicación o 4 para otro).'
          setContext('duda_torre')
          break
        case '2':
          responseText =
            '¿Sobre qué tienes duda de las botellas? (Ingresa 1 para tamaño, 2 para depósito o 3 para otro).'
          setContext('duda_botellas')
          break
        case '3':
          responseText =
            '¿Sobre qué tienes duda de la aplicación? (Ingresa 1 para inicio, 2 para mapa, 3 para tiempo, 4 para chatbot, 5 para perfil de usuario o 6 para otro).'
          setContext('duda_aplicacion')
          break
        case '4':
          responseText = 'Ingresa tu duda.'
          navigate('/chatbot/ticket')
          setContext('end')
          break
        default:
          break
      }
    } else if (context === 'duda_torre') {
      switch (input) {
        case '1':
          responseText =
            'La torre funciona a base de electricidad fotovoltaica proveniente de la luz solar, cargando de esta forma los celulares con electricidad 100% limpia. Envía algún mensaje para terminar el chat.'
          setContext('end')
          break
        case '2':
          responseText =
            'La torre contiene cuatro salidas, después de introducir una botella espera 5 segundos y selecciona un botón para agregar el tiempo a la salida seleccionada. Envía algún mensaje para terminar el chat.'
          setContext('end')
          break
        case '3':
          responseText =
            'La torre se conecta por medio de la aplicación a introducir un código, de esa forma sabemos quién es el que se conecta a qué salida en cuál torre. Envía algún mensaje para terminar el chat.'
          setContext('end')
          break
        case '4':
          responseText = 'Ingresa tu duda.'
          setContext('end')
          navigate('/chatbot/ticket')
          break
        default:
          break
      }
    } else if (context === 'duda_botellas') {
      switch (input) {
        case '1':
          responseText =
            'Las botellas varían en su tamaño dependiendo de su capacidad, el tamaño lo determinan sensores internos para lograr calcular el tiempo. Envía algún mensaje para terminar el chat.'
          setContext('end')
          break
        case '2':
          responseText =
            'El depósito se encuentra en frente de los botones, se tienen que depositar las botellas con cuidado y hasta el final, para una lectura correcta. Envía algún mensaje para terminar el chat.'
          setContext('end')
          break
        case '3':
          responseText = 'Ingresa tu duda.'
          setContext('end')
          navigate('/chatbot/ticket')
          break
        default:
          break
      }
    } else if (context === 'duda_aplicacion') {
      switch (input) {
        case '1':
          responseText =
            'La aplicación cuenta con un inicio o home, el cual cuenta con noticias y actualizaciones sobre temas verdes. Envía algún mensaje para terminar el chat.'
          setContext('end')
          break
        case '2':
          responseText =
            'La aplicación cuenta con un mapa donde se muestran las torres de carga y sus salidas disponibles para utilizar su tiempo. Envía algún mensaje para terminar el chat.'
          setContext('end')
          break
        case '3':
          responseText =
            'La aplicación cuenta con un cronómetro que muestra su tiempo almacenado. Envía algún mensaje para terminar el chat.'
          setContext('end')
          break
        case '4':
          responseText =
            'La aplicación cuenta con un chatbot, ¡HOLA! Estoy aquí para ayudarte con tus dudas o problemas. Envía algún mensaje para terminar el chat.'
          setContext('end')
          break
        case '5':
          responseText =
            'La aplicación cuenta con una opción para ver tu perfil de usuario y modificarlo. Envía algún mensaje para terminar el chat.'
          setContext('end')
          break
        case '6':
          responseText = 'Ingresa tu duda.'
          setContext('end')
          navigate('/chatbot/ticket')
          break
        default:
          break
      }
    } else if (context === 'problema') {
      switch (input) {
        case '1':
          responseText = 'Ingresa tu problema.'
          setContext('end')
          break
        case '2':
          responseText =
            '¿Sobre qué tienes problema con las botellas? (Ingresa 1 para tamaño, 2 para depósito o 3 para otro).'
          setContext('problemaBotellas')
          break
        case '3':
          responseText =
            '¿Sobre qué tienes problema con la aplicación? (Ingresa 1 para inicio, 2 para mapa, 3 para tiempo, 4 para chatbot, 5 para perfil de usuario o 6 para otro).'
          setContext('problemaAplicacion')
          break
        case '4':
          responseText = 'Ingresa tu duda.'
          setContext('end')
          navigate('/chatbot/ticket')
          break
        default:
          break
      }
    } else if (context === 'problemaAplicacion') {
      switch (input) {
        case '1':
          responseText = 'Ingresa tu problema.'
          navigate('/chatbot/ticket')
          setContext('end')
          break
        case '2':
          responseText = 'Ingresa tu problema.'
          navigate('/chatbot/ticket')
          setContext('end')
          break
        case '3':
          responseText = 'Ingresa tu problema.'
          navigate('/chatbot/ticket')
          setContext('end')
          break
        case '4':
          responseText = 'Ingresa tu problema.'
          navigate('/chatbot/ticket')
          setContext('end')
          break
        case '5':
          responseText = 'Ingresa tu problema.'
          navigate('/chatbot/ticket')
          setContext('end')
          break
        case '6':
          responseText = 'Ingresa tu problema.'
          navigate('/chatbot/ticket')
          setContext('end')
          break
        default:
          break
      }
    } else if (context === 'problemaBotellas') {
      switch (input) {
        case '1':
          responseText = 'Ingresa tu problema.'
          navigate('/chatbot/ticket')
          setContext('end')
          break
        case '2':
          responseText = 'Ingresa tu problema.'
          navigate('/chatbot/ticket')
          setContext('end')
          break
        case '3':
          responseText = 'Ingresa tu problema.'
          navigate('/chatbot/ticket')
          setContext('end')
          break
        default:
          break
      }
    } else if (context === 'end') {
      responseText = 'El chat terminó, muchas gracias por su tiempo.'
      setIsActive(false)
    }

    const botResponse = { user: false, text: responseText }
    setChatHistory((chatHistory) => [...chatHistory, botResponse])
  }

  return (
    <div className="flex-1 border-2 border-black rounded-lg shadow-lg">
      <div className="overflow-auto p-4 text-text">
        {chatHistory.map((entry, index) => (
          <div
            key={index}
            className={`flex items-center my-2 ${
              entry.user ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <i
              className={`bx ${
                entry.user ? 'bx-user' : 'bx-bot'
              } bx-sm text-xl`}
            />
            <div
              className={`p-2 rounded-lg ${
                entry.user ? 'bg-green-500' : 'bg-accent'
              }`}
            >
              {entry.text}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4">
        <form
          onSubmit={handleUserInput}
          className="w-full flex flex-col"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-2 border-2 border-gray-300 rounded"
            placeholder="Type your response here..."
            disabled={!isActive}
          />
          <button
            type="submit"
            className="w-full mt-2 bg-primary text-text font-bold py-2 px-4 rounded"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

export default Chatbot
