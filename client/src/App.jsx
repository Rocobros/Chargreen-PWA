import { useState, React } from 'react'

import { LoadScript } from '@react-google-maps/api'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import EditUser from './components/EditUser'
import MailForm from './components/MailForm'
import PasswordForm from './components/PasswordForm'
import ModeratorFrom from './components/ModeratorForm'
import TowerForm from './components/TowerForm'
import CountdownTimer from './components/Timer/CountdownTimer'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import MapPage from './components/Map/MapPage'
import EditarPerfilUsuario from './components/EditarPerfilUsuario'
import Novedades from './components/Novedades'

function App() {
  const [userRole, setUserRole] = useState(null)
  const [userId, setUserId] = useState(null)
  return (
    <>
      <BrowserRouter>
        <LoadScript
          googleMapsApiKey="AIzaSyDFjyE9Fn-mtW4eJcNGKnqLVB7cnI3iTDE"
          loadingElement={<div>Loading...</div>}
        >
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  userRole={userRole}
                  userId={userId}
                />
              }
            ></Route>
            <Route
              path="/register"
              element={<Register />}
            ></Route>
            <Route
              path="/login"
              element={
                <Login
                  setUserRole={setUserRole}
                  setUserId={setUserId}
                />
              }
            ></Route>
            <Route
              path="/editUser"
              element={<EditarPerfilUsuario />}
            ></Route>
            <Route
              path="/novedades"
              element={<Novedades />}
            ></Route>
            <Route
              path="/olvidar"
              element={<MailForm />}
            ></Route>
            <Route
              path="/recuperar"
              element={<PasswordForm />}
            ></Route>
            <Route
              path="/agregar/moderador"
              element={<ModeratorFrom />}
            ></Route>
            <Route
              path="/agregar/torre"
              element={<TowerForm userId={userId} />}
            ></Route>
            <Route
              path="/tiempo"
              element={<CountdownTimer userId={userId} />}
            />
            <Route
              path="/map"
              element={<MapPage />}
            />
          </Routes>
        </LoadScript>
      </BrowserRouter>
    </>
  )
}

export default App
