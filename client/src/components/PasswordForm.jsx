import { useState, React } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import UpdateValidation from '../func/UpdateValidation.js';

const PasswordForm = () => {
	const navigate = useNavigate();

	const queryParameters = new URLSearchParams(window.location.search);
	const token = queryParameters.get('token');
	const id = queryParameters.get('id');

	const [values, setValues] = useState({
		password: '',
		confirmation: '',
	});

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!UpdateValidation(values)) {
			axios
				.post(`http://localhost:8081/recuperar/${token}/${id}`, [
					values,
				])
				.then(console.log('Exito'));
		}
		navigate('/login');
	};

	const handleInputChange = (event) => {
		setValues({ ...values, [event.target.name]: [event.target.value] });
	};

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
							type='text'
							name='password'
							placeholder='Ingresa tu contraseña...'
							onChange={handleInputChange}
							required
						/>
					</div>
					<div className='w-full h-12 my-7 relative'>
						<input
							className='w-full h-full bg-transparent outline-none border-2 border-solid border-text rounded-3xl text-lg text-text placeholder:text-text py-5 pr-10 pl-5'
							type='text'
							name='confirmation'
							placeholder='Confirma tu contraseña...'
							onChange={handleInputChange}
							required
						/>
					</div>

					<button
						type='submit'
						className='w-full h-10 bg-background outline-none rounded-3xl shadow-lg cursor-pointer text-lg font-bold hover:bg-secondary active:ring active:ring-accent active:translate-y-1'>
						Actualizar
					</button>
				</form>
			</div>
		</div>
	);
};

export default PasswordForm;
