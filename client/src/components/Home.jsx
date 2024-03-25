import React, { useEffect } from 'react';
import Navbar from './navbar/Navbar';
import AdminNavbar from './navbar/AdminNavbar';
import { useNavigate } from 'react-router-dom';

const Home = ({ userRole, userId }) => {
	const navigate = useNavigate();
	useEffect(() => {
		if (!userRole || !userId) {
			navigate('login');
		}
	});
	return (
		<div className='bg-background h-screen'>
			{userRole === 'admin' && (
				<AdminNavbar
					title={'Inicio'}
					userId={userId}></AdminNavbar>
			)}

			{userRole === 'user' && <Navbar title={'Inicio'}></Navbar>}
		</div>
	);
};

export default Home;
