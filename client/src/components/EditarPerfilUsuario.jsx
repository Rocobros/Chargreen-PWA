import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function EditarPerfilUsuario() {
  const [profileData, setProfileData] = useState({})
  const navigate = useNavigate()
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/usuarios/${localStorage.getItem('userId')}`
        )
        setProfileData(response.data)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchUserData()
  }, [])

  const handleInputChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const editUser = async () => {
      const response = await axios.put(
        `http://localhost:3000/api/usuarios/${localStorage.getItem('userId')}`,
        profileData
      )
      if (response.status === 200) {
        navigate('/')
      }
    }
    editUser()
  }

  return (
    <div className="flex flex-col p-5 space-y-4 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <form onSubmit={handleSubmit}>
        <button
          type="submit"
          className="mb-5 self-end px-4 py-2 text-white bg-primary rounded hover:bg-accent"
        >
          Guardar Cambios
        </button>
        <div className="grid grid-cols-2 gap-4">
          <span className="text-right">Nombre:</span>
          <input
            className="text-left"
            name="Nombre"
            value={profileData.Nombre}
            onChange={handleInputChange}
          />

          <span className="text-right">Apellido Paterno:</span>
          <input
            type="text"
            className="text-left"
            name="ApellidoPaterno"
            value={profileData.ApellidoPaterno}
            onChange={handleInputChange}
          />

          <span className="text-right">Apellido Materno:</span>
          <input
            className="text-left"
            name="ApellidoMaterno"
            value={profileData.ApellidoMaterno}
            onChange={handleInputChange}
          />

          <span className="text-right">Teléfono Celular:</span>
          <input
            className="text-left"
            name="Celular"
            value={profileData.Celular}
            onChange={handleInputChange}
          />

          <span className="text-right">Nivel:</span>
          <input
            disabled
            className="text-left"
            name="Nivel"
            value={profileData.Nivel}
            onChange={handleInputChange}
          />

          <span className="text-right">Correo:</span>
          <input
            disabled
            className="text-left"
            name="Correo"
            value={profileData.Correo}
            onChange={handleInputChange}
          />
        </div>
      </form>
    </div>
  )
}

export default EditarPerfilUsuario
