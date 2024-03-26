import React from 'react'

const FormButton = ({ text }) => {
	return (
		<button
			type='submit'
			className='w-full h-10 bg-background outline-none rounded-3xl shadow-lg cursor-pointer text-lg font-bold hover:bg-secondary active:ring active:ring-accent active:translate-y-1'>
			{text}
		</button>
	)
}

export default FormButton
