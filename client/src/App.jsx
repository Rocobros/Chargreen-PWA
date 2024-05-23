import { useState, React } from 'react'

import Navbar from './components/navbar/Navbar'
import { LoadScript } from '@react-google-maps/api'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import MailForm from './pages/MailForm'
import PasswordForm from './pages/PasswordForm'
import ModeratorFrom from './pages/ModeratorForm'
import TowerForm from './pages/TowerForm'
import CountdownTimer from './components/Timer/CountdownTimer'
import MetricasPage from './components/Metricas/MetricasPage'
import Verificar from './pages/Verificar'
import { Routes, Route, Navigate } from 'react-router-dom'

import MapPage from './components/Map/MapPage'
import EditarPerfilUsuario from './pages/EditarPerfilUsuario'
import Novedades from './pages/Novedades'
import PrivateRoute from './components/PrivateRoute'
import NotFound from './pages/NotFound'

const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

function App() {
  const [userId, setUserId] = useState(null)
  return (
    <LoadScript
      googleMapsApiKey={key}
      loadingElement={<div>Loading...</div>}
    >
      <Routes>
        <Route
          path="/"
          element={<PrivateRoute />}
        >
          <Route
            index
            element={<Home />}
          />
          <Route
            path="editar"
            element={<EditarPerfilUsuario />}
          />
          <Route
            path="novedades"
            element={<Novedades />}
          />
          <Route
            path="agregar/moderador"
            element={<ModeratorFrom />}
          />
          <Route
            path="agregar/torre"
            element={<TowerForm userId={userId} />}
          />
          <Route
            path="tiempo"
            element={<CountdownTimer userId={userId} />}
          />
          <Route
            path="mapa"
            element={<MapPage />}
          />
          <Route
            path="metricas"
            element={<MetricasPage />}
          />
        </Route>

        <Route
          path="/registro"
          element={<Register />}
        ></Route>
        <Route
          path="/login"
          element={<Login />}
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
          path="/verificar"
          element={<Verificar />}
        ></Route>
        <Route
          path="/404"
          element={<NotFound />}
        />
        <Route
          path="*"
          element={<Navigate to="/404" />}
        />
      </Routes>
      <Navbar></Navbar>
    </LoadScript>
  )
}

export default App
