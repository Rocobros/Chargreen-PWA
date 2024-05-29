import React, { useState } from 'react'
import { GoogleMap, Marker } from '@react-google-maps/api'

const AgregarTorrePage = () => {
  const [selectedCoord, setSelectedCoord] = useState(null)
  const [isMapActive, setIsMapActive] = useState(true)
  const [showPopup, setShowPopup] = useState(false)
  const [name, setName] = useState('')

  const containerStyle = {
    width: '100%', // 100% of the viewport width
    height: '100%', // 100% of the viewport height
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

  const handleSaveTower = () => {
    // Logic to save the tower data
    console.log('Saving tower:', { name, coordinates: selectedCoord })
    // Reset form
    setSelectedCoord(null)
    setName('')
    setShowPopup(false)
    setIsMapActive(true)
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden">
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
          <div className="bg-white p-6 rounded shadow-lg">
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleChangeCoordinates}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cambiar coordenadas
                </button>
                <button
                  type="button"
                  onClick={handleSaveTower}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Guardar torre
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AgregarTorrePage
