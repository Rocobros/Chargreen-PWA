import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import RegisterValidation from '../func/RegisterValdidation.js'

import FormWrapper from './FormComponents/FormWrapper.jsx'
import FormButton from './FormComponents/FormButton.jsx'
import FormInput from './FormComponents/FormInput.jsx'
import FormLink from './FormComponents/FormLink.jsx'

const fields = [
    {
        id: 1,
        type: 'text',
        name: 'name',
        placeholder: 'Nombre',
    },
    {
        id: 2,
        type: 'text',
        name: 'apep',
        placeholder: 'Apellido Paterno',
    },
    {
        id: 3,
        type: 'text',
        name: 'apem',
        placeholder: 'Apellido Materno',
    },
    {
        id: 4,
        type: 'number',
        name: 'tel',
        placeholder: 'Celular',
    },
    {
        id: 5,
        type: 'mail',
        name: 'email',
        placeholder: 'Correo',
    },
    {
        id: 6,
        type: 'text',
        name: 'user',
        placeholder: 'Usuario',
    },
    {
        id: 7,
        type: 'password',
        name: 'pass',
        placeholder: 'Contraseña',
    },
    {
        id: 8,
        type: 'password',
        name: 'conf',
        placeholder: 'Confirmar',
    },
]

const Register = () => {
    const [values, setValues] = useState({
        name: '',
        apep: '',
        apem: '',
        tel: '',
        email: '',
        user: '',
        pass: '',
        conf: '',
    })

    const [error, setError] = useState('')

    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        setError(RegisterValidation(values))

        if (!RegisterValidation(values)) {
            axios
                .get('http://localhost:8081/fk')
                .then((res) => {
                    const reqVals = { ...values }
                    return axios
                        .post(
                            'http://localhost:8081/register/credentials',
                            reqVals
                        )
                        .catch((err) => console.log(err))
                        .then(() => {
                            const reqVals = {
                                ...values,
                                ['fk']: [res.data.id + 1],
                            }
                            return axios
                                .post(
                                    'http://localhost:8081/register/user',
                                    reqVals
                                )
                                .catch((err) => console.log(err))
                        })
                })
                .then(navigate('/login'))
                // .then(navigate('/'))
                .catch((err) => console.log(err))
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
            handleInput={handleInput}></FormInput>
    ))

    return (
        <div className="flex justify-center items-center h-screen bg-background">
            <FormWrapper
                title={'Nueva cuenta'}
                handleSubmit={handleSubmit}>
                {inputs}
                <FormButton>Registrase</FormButton>
                <FormLink
                    linkText={'Ingresa'}
                    linkTo={'/login'}>
                    Ya tienes cuenta?{' '}
                </FormLink>
            </FormWrapper>
        </div>
    )
}

export default Register
