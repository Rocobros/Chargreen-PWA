import React, { useEffect } from 'react';
import Navbar from './navbar/Navbar';
import AdminNavbar from './navbar/AdminNavbar';
import { useNavigate } from 'react-router-dom';

const Home = ({ userRole }) => {
	const navigate = useNavigate();
	useEffect(() => {
		if (!userRole) {
			navigate('login');
		}
	});
	return (
		<div className='bg-background h-screen'>
			{userRole === 'admin' && <AdminNavbar></AdminNavbar>}
			{userRole === 'user' && <Navbar></Navbar>}
		</div>
	);
};

export default Home;
