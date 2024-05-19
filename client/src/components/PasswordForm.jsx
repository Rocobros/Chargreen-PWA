import { useState, React } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import UpdateValidation from '../func/UpdateValidation.js'

import FormWrapper from './FormComponents/FormWrapper.jsx'
import FormButton from './FormComponents/FormButton.jsx'
import FormInput from './FormComponents/FormInput.jsx'

const fields = [
  {
    id: 1,
    type: 'password',
    name: 'password',
    placeholder: 'Contraseña nueva',
  },
  {
    id: 2,
    type: 'password',
    name: 'confirmation',
    placeholder: 'Confirmar',
  },
]

const PasswordForm = () => {
  const queryParameters = new URLSearchParams(window.location.search)
  const token = queryParameters.get('token')
  const id = queryParameters.get('id')

  const [values, setValues] = useState({
    password: '',
    confirmation: '',
  })

  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!UpdateValidation(values)) {
      axios
        .post(`http://localhost:3000/recuperar/${token}/${id}`, [values])
        .then(navigate('/login'))
    }
  }

  const handleInput = (event) => {
    setValues({ ...values, [event.target.name]: [event.target.value] })
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
        title={'Actualizar contraseña'}
        handleSubmit={handleSubmit}
      >
        {inputs}
        <FormButton>Actualizar</FormButton>
      </FormWrapper>
    </div>
  )
}

export default PasswordForm
