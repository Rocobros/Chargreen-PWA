import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const UpdatePassword = () => {
	const [correo, setCorreo] = useState('')
	const [message, setMessage] = useState('')

	const handleSubmit = (event) => {
		event.preventDefault()
		axios
			.post('http://localhost:8081/mail', [{ correo: correo }])
			.then(() => {
				setMessage(`Se envio un codigo al correo ${correo}`)
			})
			.catch((err) => console.log(err))
	}

	const handleInput = (event) => {
		setCorreo(event.target.value)
	}

	return (
		<div className='flex justify-center items-center h-screen bg-background'>
			<div className='w-fit bg-primary text-text font-secondary font-semibold px-10 py-8 rounded-xl shadow-custom'>
				<h1 className='font-primary font-bold text-4xl text-center'>
					Recuperar contraseña
				</h1>
				<form onSubmit={handleSubmit}>
					<div className='w-full h-12 my-7 relative'>
						<input
							className='w-full h-full bg-transparent outline-none border-2 border-solid border-text rounded-3xl text-lg text-text placeholder:text-text py-5 pr-10 pl-5'
							type='email'
							name='mail'
							placeholder='Ingresa tu correo...'
							onChange={handleInput}
							required
						/>
						<i className='bx bxs-envelope absolute right-5 translate-y-1.5 text-3xl'></i>
					</div>
					{message && (
						<span className='w-fit text-center'>{message}</span>
					)}
					<button
						type='submit'
						className='w-full h-10 bg-background outline-none rounded-3xl shadow-lg cursor-pointer text-lg font-bold hover:bg-secondary active:ring active:ring-accent active:translate-y-1'>
						Enviar correo
					</button>
					<div className='text-base text-center mt-5 mb-4'>
						<p>
							<Link
								to='/login'
								className='no-underline font-bold hover:underline'>
								Regresar a inicio de sesion
							</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	)
}

export default UpdatePassword
