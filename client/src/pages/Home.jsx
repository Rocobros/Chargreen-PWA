import { React, useEffect, useState } from 'react'
import axiosInstance from '../func/axiosInstance'
import { jwtDecode } from 'jwt-decode'

const Home = () => {
  const [userData, setUserData] = useState({})
  const token = localStorage.getItem('jwt')
  const { id } = jwtDecode(token)

  useEffect(() => {
    const fetchUser = async () => {
      let response
      try {
        response = await axiosInstance.get(`/api/usuarios/${id}`)
      } catch (error) {
        console.error('Failed to fetch data:', error.message)
      } finally {
        setUserData(response.data)
      }
    }

    fetchUser()
  }, [])

  return (
    <div
      className="bg-background h-fit w-screen p-2 overflow-y-auto"
      style={{ paddingBottom: 'var(--navbar-height)' }}
    >
      <div className="overflow-y-scroll p-4">
        <h1 className="font-primary font-bold text-4xl text-center">
          Bienvendio, {userData.Nombre}
        </h1>

        <div className="h-full w-full ">
          <div className="flex justify-center text-4xl font-bold p-10">
            Chargreen
          </div>
          <div className="flex justify-center">
            Es una torre de carga solar autosustentable, la cual probe de
            electricidad a las personas que depositan botellas de plastico o
            latas de aluminio. La aplicacion sirve para enlazar a las personas
            con la torre, ademas de que guarda las estadisticas y el tiempo,
            ademas de unas cuantas funciones extras
          </div>
          <div className="flex justify-center text-2xl font-semibold p-10">
            Pasos para utilizar la Aplicacion
          </div>
          <div className="flex justify-center">
            1.- Ingresar una botella o lata en el agujero de la torre.
          </div>
          <div className="flex justify-center">
            2.- Conectarse a la torre a tarves del codigo dado.
          </div>
          <div className="flex justify-center">
            3.- Utilizar todo el tiempo o presionar el boton de parar.
          </div>
          <div className="flex justify-center">
            4.- Utiliza el tiempo almacenado con anterioridad.
          </div>
          <div className="flex justify-center">
            5.- Tambien puedes consultar tus metricas, noticias y perfil.
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
