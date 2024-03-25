import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TowerForm = ({ userId }) => {
	const [values, setValues] = useState({
		nombre: '',
		latitud: 0,
		longitud: 0,
		admin: userId,
	});

	const navigate = useNavigate();

	const handleSubmit = (event) => {
		event.preventDefault();

		axios
			.post('http://localhost:8081/register/tower', values)
			.then(navigate('/'))
			.catch((err) => console.log(err));
	};

	const handleInput = (event) => {
		setValues({ ...values, [event.target.name]: [event.target.value] });
	};

	return (
		<div className='flex justify-center items-center h-screen bg-background'>
			<div className='justify-center items-center w-80 h-5/6 md:w-96 md:h-auto my-8 bg-primary text-text font-secondary font-semibold px-10 py-8 rounded-xl shadow-custom'>
				<form onSubmit={handleSubmit}>
					<h1 className='font-primary font-bold text-4xl text-center'>
						Nueva Torre
					</h1>

					<div className='w-full h-8 lg:h-12 my-7 relative'>
						<input
							className='w-full h-full bg-transparent outline-none border-2 border-solid border-text rounded-3xl text-lg text-text placeholder:text-text py-5 pr-10 pl-5'
							type='text'
							name='nombre'
							placeholder='Nombre'
							onChange={handleInput}
						/>
					</div>

					<div className='w-full h-8 md:h-12 my-7 relative'>
						<input
							className='w-full h-full bg-transparent outline-none border-2 border-solid border-text rounded-3xl text-lg text-text placeholder:text-text py-5 pr-10 pl-5'
							name='latitud'
							pattern='^\d*(\.\d{0,2})?$'
							placeholder='Latitud'
							onChange={handleInput}
						/>
					</div>

					<div className='w-full h-8 md:h-12 my-7 relative'>
						<input
							className='w-full h-full bg-transparent outline-none border-2 border-solid border-text rounded-3xl text-lg text-text placeholder:text-text py-5 pr-10 pl-5'
							name='longitud'
							pattern='^\d*(\.\d{0,2})?$'
							placeholder='Longitud'
							onChange={handleInput}
						/>
					</div>

					<button
						type='submit'
						className='w-full h-10 bg-background outline-none rounded-3xl shadow-lg cursor-pointer text-lg font-bold hover:bg-secondary active:ring active:ring-accent'>
						Agregar
					</button>
				</form>
			</div>
		</div>
	);
};

export default TowerForm;
