import React, { useState, useEffect } from 'react'

const EditarPerfilUsuario = () => {
  const [userInfo, setUserInfo] = useState({
    Nombre: '',
    ApellidoPaterno: '',
    ApellidoMaterno: '',
    Celular: 0,
    Correo: '',
  })

  const [credentials, setCredentials] = useState({
    Usuario: '',
    Contrasena: '',
    Confirmacion: '',
  })

  const [values, setValues] = useState()

  return (
    <div
      className="max-w-md mx-auto p-6 border bg-background rounded-sm"
      style={{ paddingBottom: 'var(--navbar-height)' }}
    >
      <h2 className="text-center text-2xl mb-6">Personal info</h2>
      <form className="flex flex-col space-y-4">
        <label className="flex flex-col">
          Nombre
          <input
            type="text"
            name="firstName"
            placeholder="Rodrigo"
            className="mt-1 p-2 border rounded-md"
          />
        </label>
        <label className="flex flex-col">
          Apellido Paterno
          <input
            type="text"
            name="lastName"
            placeholder="Romero"
            className="mt-1 p-2 border rounded-md"
          />
        </label>
        <label className="flex flex-col">
          Apellido Materno
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            className="mt-1 p-2 border rounded-md"
          />
        </label>
        <label className="flex flex-col">
          Correo
          <input
            type="text"
            name="firstName"
            placeholder="Rodrigo"
            className="mt-1 p-2 border rounded-md"
          />
        </label>
        <label className="flex flex-col">
          Celular
          <input
            type="text"
            name="firstName"
            placeholder="Rodrigo"
            className="mt-1 p-2 border rounded-md"
          />
        </label>
        <label className="flex flex-col">
          Usuario
          <input
            type="text"
            name="street"
            placeholder="Street"
            className="mt-1 p-2 border rounded-md"
          />
        </label>
        <label className="flex flex-col">
          Contraseña
          <input
            type="text"
            name="neighborhood"
            placeholder="Neighborhood"
            className="mt-1 p-2 border rounded-md"
          />
        </label>
        <label className="flex flex-col">
          Fecha de Creacion
          <input
            type="text"
            name="city"
            placeholder="City"
            className="mt-1 p-2 border rounded-md"
          />
        </label>
        <label className="flex flex-col">
          Nivel de Cuenta
          <select
            name="state"
            className="mt-1 p-2 border rounded-md"
          >
            <option value="">Select State</option>
            {/* Añadir las opciones de estado aquí */}
          </select>
        </label>
        <button
          type="submit"
          className="py-2 px-4 bg-primary text-white rounded-md hover:bg-green-700"
        >
          Save
        </button>
      </form>
    </div>
  )
}

export default EditarPerfilUsuario
