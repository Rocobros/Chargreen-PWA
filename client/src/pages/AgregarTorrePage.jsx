import React, { useState } from 'react'
import { GoogleMap, Marker } from '@react-google-maps/api'
import Navbar from '../components/navbar/Navbar'
import axiosInstance from '../func/axiosInstance'
import { Toaster, toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

const AgregarTorrePage = () => {
  const [selectedCoord, setSelectedCoord] = useState(null)
  const [isMapActive, setIsMapActive] = useState(true)
  const [showPopup, setShowPopup] = useState(false)
  const [name, setName] = useState('')

  const navigate = useNavigate()

  const containerStyle = {
    width: '100%',
    height: '100%',
  }

  const center = {
    lat: 20.6763989,
    lng: -103.3479102,
  }

  const mapStyles = [
    {
      featureType: 'administrative',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#444444' }],
    },
    {
      featureType: 'administrative.locality',
      elementType: 'labels',
      stylers: [{ visibility: 'on' }],
    },
    {
      featureType: 'administrative.neighborhood',
      elementType: 'labels',
      stylers: [{ visibility: 'on' }],
    },
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'road',
      elementType: 'labels.icon',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#606060' }],
    },
    {
      featureType: 'road.arterial',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#606060' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#606060' }],
    },
    {
      featureType: 'transit',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#9e9e9e' }],
    },
  ]

  const handleClick = (event) => {
    if (isMapActive) {
      setSelectedCoord({
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      })
      setIsMapActive(false)
      setShowPopup(true)
    }
  }

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleChangeCoordinates = () => {
    setShowPopup(false)
    setIsMapActive(true)
  }

  const handleSaveTower = async () => {
    try {
      await axiosInstance.post('/api/torres', {
        Nombre: name,
        Latitud: selectedCoord.lat,
        Longitud: selectedCoord.lng,
        UsuarioAdministrador: localStorage.getItem('id'),
      })
      toast.success('Torre agregada correctamente')
      setSelectedCoord(null)
      setName('')
      setShowPopup(false)
      setIsMapActive(true)
      navigate('/agregarAdmin/torre')
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <Toaster />
      <header className="flex items-center justify-between border-b p-2 bg-primary">
        <button
          onClick={() => navigate('/agregarAdmin')}
          className="text-3xl"
        >
          ←
        </button>
        <h1 className="text-3xl font-bold">Agregar Torre</h1>
      </header>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={11}
        options={{
          styles: mapStyles, // Apply the map styles here
          disableDefaultUI: true, // Disable default UI for a cleaner look
        }}
        onClick={handleClick}
      >
        {selectedCoord && <Marker position={selectedCoord} />}
      </GoogleMap>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-background p-6 rounded shadow-lg w-96">
            <form>
              <div className="mb-4">
                <label className="block text-text text-sm font-bold my-2">
                  Nombre de la torre
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-text leading-tight focus:outline-none focus:shadow-outline"
                />
                <label className="block text-text text-sm font-bold my-2">
                  Latitud
                </label>
                <input
                  disabled
                  type="text"
                  value={selectedCoord.lat}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-text leading-tight focus:outline-none focus:shadow-outline"
                />
                <label className="block text-text text-sm font-bold my-2">
                  Longitud
                </label>
                <input
                  disabled
                  type="text"
                  value={selectedCoord.lng}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-text leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="reset"
                  onClick={handleChangeCoordinates}
                  className="flex-1 ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleSaveTower}
                  className="flex-1 mr-2 bg-primary hover:bg-accent text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Agregar torre
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <Navbar />
    </div>
  )
}

export default AgregarTorrePage
