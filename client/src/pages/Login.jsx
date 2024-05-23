import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginValidation from '../func/LoginValidation.js'
import { Toaster, toast } from 'sonner'
import axios from 'axios'

import FormWrapper from '../components/FormComponents/FormWrapper.jsx'
import FormButton from '../components/FormComponents/FormButton.jsx'
import FormInput from '../components/FormComponents/FormInput.jsx'
import FormLink from '../components/FormComponents/FormLink.jsx'

const apiUrl = import.meta.env.VITE_API_URL

const fields = [
  {
    id: 1,
    type: 'text',
    name: 'username',
    placeholder: 'Usuario',
    icon: 'bx bxs-user',
  },
  {
    id: 2,
    type: 'password',
    name: 'password',
    placeholder: 'Contraseña',
    icon: 'bx bxs-lock',
  },
]

const Login = () => {
  const [values, setValues] = useState({
    username: '',
    password: '',
  })

  const navigate = useNavigate()

  useEffect(() => {
    localStorage.clear()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const validationError = LoginValidation(values)

    if (!validationError) {
      try {
        const response = await axios.post(apiUrl + '/api/login', values)

        if (response.status === 200) {
          localStorage.setItem('jwt', response.data.token)
          navigate('/')
        } else {
          toast.warning(response.data.message)
        }
      } catch (error) {
        console.error('Error:', error)
        toast.error(error.response.data.message)
      }
    } else {
      toast.warning(validationError)
    }
  }

  const handleInput = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value })
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
    <div className="flex justify-center items-center h-screen overflow-hidden">
      <Toaster />
      <FormWrapper
        title="Ingresar"
        handleSubmit={handleSubmit}
      >
        {inputs}
        <FormButton>Ingresar</FormButton>
        <FormLink
          linkTo={'/registro'}
          linkText={'Registrate'}
        >
          No tienes una cuenta?{' '}
        </FormLink>
        <FormLink
          linkTo={'/olvidar'}
          linkText={'Recuperar'}
        >
          Olvidaste tu constraseña?{' '}
        </FormLink>
      </FormWrapper>
    </div>
  )
}

export default Login
