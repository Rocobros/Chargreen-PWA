import React from 'react'

const FormInput = ({ id, type, name, placeholder, icon, handleInput }) => {
	return (
		<div
			className='w-full h-12 my-7 relative'
			id={id}>
			<input
				className='w-full h-full bg-transparent outline-none border-2 border-solid border-text rounded-3xl text-lg text-text placeholder:text-text py-5 pr-10 pl-5'
				type={type}
				name={name}
				placeholder={placeholder}
				onChange={handleInput}
			/>
			<i
				className={`${icon} absolute right-5 translate-y-1.5 text-3xl`}></i>
		</div>
	)
}

export default FormInput
