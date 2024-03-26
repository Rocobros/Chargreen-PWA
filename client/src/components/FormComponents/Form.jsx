import React from 'react'
import FormInput from './FormInput'
import FormButton from './FormButton'
import FormLink from './FormLink'

const Form = ({ title, inputsList, handleSubmit, handleInput }) => {
	const inputs = inputsList.map((item) => (
		<FormInput
			key={item.id}
			type={item.type}
			name={item.name}
			placeholder={item.placeholder}
			icon={item.icon}
			handleInput={handleInput}></FormInput>
	))

	return (
		<div className='w-fit bg-primary text-text font-secondary font-semibold px-10 py-8 rounded-xl shadow-custom'>
			<h1 className='font-primary font-bold text-4xl text-center'>
				{title}
			</h1>

			<form onSubmit={handleSubmit}>
				{inputs}
				<FormButton text={'Ingresar'}></FormButton>
				<FormLink
					text={'No tienes una cuenta? '}
					linkTo={'/register'}
					linkText={'Registrate'}></FormLink>
				<FormLink
					text={'Olvidaste tu constraseña? '}
					linkTo={'/olvidar'}
					linkText={'Recuperar'}></FormLink>
			</form>
		</div>
	)
}

export default Form
