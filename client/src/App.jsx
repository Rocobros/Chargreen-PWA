import { useState, React } from 'react'

import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import EditUser from './components/EditUser'
import MailForm from './components/MailForm'
import PasswordForm from './components/PasswordForm'
import ModeratorFrom from './components/ModeratorForm'
import TowerForm from './components/TowerForm'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
	const [userRole, setUserRole] = useState(null)
	const [userId, setUserId] = useState(null)
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route
						path='/'
						element={
							<Home
								userRole={userRole}
								userId={userId}
							/>
						}></Route>
					<Route
						path='/register'
						element={<Register />}></Route>
					<Route
						path='/login'
						element={
							<Login
								setUserRole={setUserRole}
								setUserId={setUserId}
							/>
						}></Route>
					<Route
						path='/editUser'
						element={<EditUser />}></Route>
					<Route
						path='/olvidar'
						element={<MailForm />}></Route>
					<Route
						path='/recuperar'
						element={<PasswordForm />}></Route>
					<Route
						path='/agregar/moderador'
						element={<ModeratorFrom />}></Route>
					<Route
						path='/agregar/torre'
						element={<TowerForm userId={userId} />}></Route>
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
