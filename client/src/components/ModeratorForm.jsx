import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
        placeholder: 'Confirmar Contraseña',
    },
]

const ModeratorFrom = () => {
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

    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()

        if (!RegisterValidation(values)) {
            axios.get('http://localhost:8081/fk').then((res) => {
                const reqVals = {
                    ...values,
                    ['fk']: [res.data.id + 1],
                }
                return axios
                    .post('http://localhost:8081/register/credentials', reqVals)
                    .catch((err) => console.log(err))
                    .then(() => {
                        axios
                            .post(
                                'http://localhost:8081/register/moderator',
                                reqVals
                            )
                            .catch((err) => {
                                return console.log(err)
                            })
                    })
                    .then(navigate('/'))
                    .catch((err) => console.log(err))
            })
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
                title={'Agregar Moderador'}
                handleSubmit={handleSubmit}>
                {inputs}
                <FormButton>Agregar</FormButton>
                <FormLink
                    linkText={'Regresar al Incio'}
                    linkTo={'/'}
                />
            </FormWrapper>
        </div>
    )
}

export default ModeratorFrom
