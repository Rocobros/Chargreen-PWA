import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import MapInfoBox from './MapInfoBox'

const containerStyle = {
  width: '100%', // 100% of the viewport width
  height: '100%', // 100% of the viewport height
}

const center = {
  lat: 20.6763989,
  lng: -103.3479102,
}

const mapOptions = {
  styles: [
    {
      featureType: 'poi.business',
      stylers: [{ visibility: 'off' }], // Hides business points of interest
    },
    {
      featureType: 'transit',
      elementType: 'labels.icon',
      stylers: [{ visibility: 'off' }], // Hides transit icons
    },
    {
      featureType: 'road',
      elementType: 'labels.icon',
      stylers: [{ visibility: 'off' }], // Hides road labels and icons
    },
  ],
  disableDefaultUI: true, // disables all the default UI buttons
  streetViewControl: false, // disables the Street View control
  mapTypeControl: false, // disables map type controls
  scaleControl: false, // disables the scale control
  rotateControl: false, // disables the rotate control
  fullscreenControl: false, // disables the fullscreen control
  disableDoubleClickZoom: true, // disables zooming with double click
}

function MapComponent() {
  const [locations, setLocations] = useState([])
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [availableExits, setAvailableExits] = useState([])

  const handleMapClick = (event) => {
    const lat = event.latLng.lat()
    const lng = event.latLng.lng()
    console.log(`Latitud: ${lat}, Longitud: ${lng}`)
  }

  const handleMarkerClick = async (torre) => {
    setSelectedLocation(torre)
    try {
      const response = await axios.get(
        `http://localhost:3000/api/salidas/disponibles/${torre.Id}`
      )
      const data = response.data
      setAvailableExits(data)
    } catch (error) {
      console.error('Error fetching data: ', error)
    }
  }

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setTimeout(async () => {
          const response = await axios.get('http://localhost:3000/api/torres')

          // Mapear los datos para asegurar que los nombres de las propiedades coincidan con lo que espera el componente Marker
          const mappedLocations = response.data.map((loc) => ({
            Id: loc.Id,
            Nombre: loc.Nombre,
            Position: {
              lat: loc.Latitud,
              lng: loc.Longitud,
            },
            UsuarioAdministrador: loc.UsuarioAdministrador,
          }))

          setLocations(mappedLocations)
        }, 1000)
      } catch (error) {
        console.error('Failed to fetch locations:', error)
      }
    }

    fetchLocations()
  }, [])

  const handleClose = () => {
    setSelectedLocation(null)
    setAvailableExits([])
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        options={mapOptions}
      >
        {locations.map((location) => (
          <Marker
            key={location.Id}
            position={location.Position}
            title={location.Nombre}
            onClick={() => handleMarkerClick(location)}
          />
        ))}
        <MapInfoBox
          selectedTower={selectedLocation}
          exits={availableExits}
          handleInfoClose={handleClose}
        />
      </GoogleMap>
    </div>
  )
}

export default MapComponent
