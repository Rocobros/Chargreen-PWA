import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import FormWrapper from './FormComponents/FormWrapper.jsx'
import FormButton from './FormComponents/FormButton.jsx'
import FormInput from './FormComponents/FormInput.jsx'
import FormLink from './FormComponents/FormLink.jsx'

const TowerForm = ({ userId }) => {
    const [values, setValues] = useState({
        nombre: '',
        latitud: 0,
        longitud: 0,
        admin: userId,
    })

    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()

        axios
            .post('http://localhost:8081/register/tower', values)
            .then(navigate('/'))
            .catch((err) => console.log(err))
    }

    const handleInput = (event) => {
        setValues({ ...values, [event.target.name]: [event.target.value] })
    }

    return (
        <div className="flex justify-center items-center h-screen bg-background">
            <FormWrapper
                title={'Nueva Torre'}
                handleSubmit={handleSubmit}>
                <FormInput
                    type={'text'}
                    name={'nombre'}
                    placeholder={'Nombre'}
                    handleInput={handleInput}
                />
                <FormInput
                    type={'number'}
                    pattern={'^d*(.d{0,2})?$'}
                    name={'latitud'}
                    placeholder={'Latitud'}
                    handleInput={handleInput}
                />
                <FormInput
                    type={'number'}
                    pattern={'^d*(.d{0,2})?$'}
                    name={'lonigtud'}
                    placeholder={'Longitud'}
                    handleInput={handleInput}
                />
                <FormButton>Agregar</FormButton>
                <FormLink
                    linkText={'Regresar al inicio'}
                    linkTo={'/'}
                />
            </FormWrapper>
        </div>
    )
}

export default TowerForm
