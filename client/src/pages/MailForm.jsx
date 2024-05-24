import React, { useState } from 'react'
import axios from 'axios'

import FormWrapper from '../components/FormComponents/FormWrapper.jsx'
import FormButton from '../components/FormComponents/FormButton.jsx'
import FormInput from '../components/FormComponents/FormInput.jsx'
import FormLink from '../components/FormComponents/FormLink.jsx'

const fields = [
  {
    id: 1,
    type: 'email',
    name: 'email',
    placeholder: 'Correo',
    icon: 'bx bxs-envelope',
  },
]

const apiUrl = import.meta.env.VITE_API_URL

const UpdatePassword = () => {
  const [correo, setCorreo] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    axios
      .post(apiUrl + '/api/mail', { correo: correo })
      .then(() => {
        setMessage(`Se envio un codigo al correo ${correo}`)
      })
      .catch((err) => console.log(err))
  }

  const handleInput = (event) => {
    setCorreo(event.target.value)
  }

  const inputs = fields.map((item) => (
    <FormInput
      key={item.id}
      type={item.type}
      name={item.name}
      placeholder={item.placeholder}
      icon={item.icon}
      handleInput={handleInput}
    ></FormInput>
  ))

  return (
    <div className="flex justify-center items-center h-screen bg-background">
      <FormWrapper
        title={'Recuperar Contraseña'}
        handleSubmit={handleSubmit}
      >
        {inputs}
        {message && <span className="w-fit text-center">{message}</span>}
        <FormButton>Enviar Correo</FormButton>
        <FormLink
          linkText={'Regresar al inicio de sesion'}
          linkTo={'/login'}
        />
      </FormWrapper>
    </div>
  )
}

export default UpdatePassword
