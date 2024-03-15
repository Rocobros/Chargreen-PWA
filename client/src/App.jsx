import React from 'react';

import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import EditUser from './components/EditUser';
import UpdatePassword from './components/UpdatePassword';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route
						path='/'
						element={<Home />}></Route>
					<Route
						path='/register'
						element={<Register />}></Route>
					<Route
						path='/login'
						element={<Login />}></Route>
					<Route
						path='/editUser'
						element={<EditUser />}></Route>
					<Route
						path='/olvidar'
						element={<UpdatePassword />}></Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
