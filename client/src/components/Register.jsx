import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import RegisterValidation from '../func/RegisterValdidation.js'
import { Toaster, toast } from 'sonner'

import FormWrapper from './FormComponents/FormWrapper.jsx'
import FormButton from './FormComponents/FormButton.jsx'
import FormInput from './FormComponents/FormInput.jsx'
import FormLink from './FormComponents/FormLink.jsx'

const infoFields = [
  {
    id: 1,
    type: 'text',
    name: 'Nombre',
    placeholder: 'Nombre',
  },
  {
    id: 2,
    type: 'text',
    name: 'ApellidoPaterno',
    placeholder: 'Apellido Paterno',
  },
  {
    id: 3,
    type: 'text',
    name: 'ApellidoMaterno',
    placeholder: 'Apellido Materno',
  },
  {
    id: 4,
    type: 'number',
    name: 'Celular',
    placeholder: 'Celular',
  },
  {
    id: 5,
    type: 'mail',
    name: 'Correo',
    placeholder: 'Correo',
  },
]

const credentialsFields = [
  {
    id: 6,
    type: 'text',
    name: 'Usuario',
    placeholder: 'Usuario',
  },
  {
    id: 7,
    type: 'password',
    name: 'Contrasena',
    placeholder: 'Contraseña',
  },
  {
    id: 8,
    type: 'password',
    name: 'Confirmacion',
    placeholder: 'Confirmar',
  },
]

const Register = () => {
  const [userInfo, setUserInfo] = useState({
    Nombre: '',
    ApellidoPaterno: '',
    ApellidoMaterno: '',
    Celular: 0,
    Correo: '',
  })

  const [credentials, setCredentials] = useState({
    Usuario: '',
    Contrasena: '',
    Confirmacion: '',
  })

  const [values, setValues] = useState()

  const navigate = useNavigate()

  useEffect(() => {
    const values = { ...userInfo, ...credentials }
    setValues(values)
  }, [userInfo, credentials])

  const handleSubmit = (event) => {
    event.preventDefault()
    const validationError = RegisterValidation(values)

    if (!validationError) {
      axios
        .post('http://localhost:3000/api/credenciales', credentials)
        .then(async (res) => {
          try {
            return await axios
              .post('http://localhost:3000/api/usuarios', {
                ...userInfo,
                Credencial: res.data.id,
              })
              .then(() => {
                navigate('/login')
              })
          } catch (err) {
            if (err.response.status === 409) {
              await axios.delete(
                `http://localhost:3000/api/credenciales/${res.data.id}`
              )
              return toast.warning(err.response.data.message)
            }
            return toast.error(err.response.data.message)
          }
        })
        .catch(async (err) => {
          return toast.error(err.response.data.message)
        })
    } else {
      toast.warning(validationError)
    }
  }

  const handleUserInput = (event) => {
    setUserInfo({ ...userInfo, [event.target.name]: event.target.value })
  }
  const handleCredentialInput = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    })
  }

  const infoInputs = infoFields.map((item) => (
    <FormInput
      key={item.id}
      type={item.type}
      name={item.name}
      placeholder={item.placeholder}
      icon={item.icon}
      handleInput={handleUserInput}
    ></FormInput>
  ))

  const credentialsInputs = credentialsFields.map((item) => (
    <FormInput
      key={item.id}
      type={item.type}
      name={item.name}
      placeholder={item.placeholder}
      icon={item.icon}
      handleInput={handleCredentialInput}
    ></FormInput>
  ))

  return (
    <div className="flex justify-center items-center h-screen bg-background">
      <Toaster />
      <FormWrapper
        title={'Nueva cuenta'}
        handleSubmit={handleSubmit}
      >
        {infoInputs}
        {credentialsInputs}
        <FormButton>Registrarse</FormButton>
        <FormLink
          linkText={'Ingresa'}
          linkTo={'/login'}
        >
          Ya tienes cuenta?{' '}
        </FormLink>
      </FormWrapper>
    </div>
  )
}

export default Register
