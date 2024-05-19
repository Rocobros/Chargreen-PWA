import React, { useEffect } from 'react'
import Navbar from './navbar/Navbar'
import AdminNavbar from './navbar/AdminNavbar'
import ModeratorNavbar from './navbar/ModeratorNavbar'
import { useNavigate } from 'react-router-dom'

const Home = ({ userRole, userId }) => {
  const navigate = useNavigate()
  useEffect(() => {
    if (!userRole || !userId) {
      navigate('login')
    }
  })
  return (
    <div className="bg-background h-screen">
      {userRole === 'admin' && (
        <AdminNavbar
          title={'Inicio'}
          userId={userId}
        ></AdminNavbar>
      )}

      {userRole === 'mod' && (
        <ModeratorNavbar
          title={'Inicio'}
          userId={userId}
        ></ModeratorNavbar>
      )}

      {userRole === 'user' && <Navbar title={'Inicio'}></Navbar>}
    </div>
  )
}

export default Home
