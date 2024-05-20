import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import LoginValidation from '../func/LoginValidation.js'
import { Toaster, toast } from 'sonner'

import FormWrapper from './FormComponents/FormWrapper.jsx'
import FormButton from './FormComponents/FormButton.jsx'
import FormInput from './FormComponents/FormInput.jsx'
import FormLink from './FormComponents/FormLink.jsx'
import validation from '../func/LoginValidation.js'

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

const Login = ({ setUserRole, setUserId }) => {
  const [values, setValues] = useState({
    username: '',
    password: '',
  })

  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    const validationError = LoginValidation(values)

    if (!validationError) {
      axios
        .post('https://chargreen.com.mx/login', values)
        .then((res) => {
          console.log(res.data)
          if (res.data.role === 'admin') {
            setUserRole('admin')
            setUserId(res.data.id)
            localStorage.setItem('userId', res.data.id)
            navigate('/')
          } else if (res.data.role === 'user') {
            setUserRole('user')
            setUserId(res.data.id)
            localStorage.setItem('userId', res.data.id)
            navigate('/')
          } else if (res.data.role === 'mod') {
            setUserRole('mod')
            setUserId(res.data.id)
            localStorage.setItem('userId', res.data.id)
            navigate('/')
          } else {
            toast.error('Error inesperado. Intente de nuevo')
          }
        })
        .catch((err) => toast.error(err.response.data.message))
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
          linkTo={'/register'}
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
