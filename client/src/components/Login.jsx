import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import LoginValidation from '../func/LoginValidation.js'
import Form from './FormComponents/Form.jsx'

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

        if (!LoginValidation(values)) {
            axios
                .post('http://localhost:8081/login', values)
                .then((res) => {
                    if (res.data.role === 'admin') {
                        setUserRole('admin')
                        setUserId(res.data.id)
                        navigate('/')
                    } else if (res.data.role === 'user') {
                        setUserRole('user')
                        setUserId(res.data.id)
                        navigate('/')
                    } else {
                        setError(res.data.message)
                    }
                })
                .catch((err) => console.log(err))
        } else {
            console.log('Intente de nuevo')
        }
    }

    const handleInput = (event) => {
        setValues({ ...values, [event.target.name]: [event.target.value] })
    }

    return (
        <div className="flex justify-center items-center h-screen bg-background">
            <Form
                title={'Ingresar'}
                inputsList={fields}
                handleInput={handleInput}
                handleSubmit={handleSubmit}
            />
        </div>
    )
}

export default Login
