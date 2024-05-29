import { GoogleMap, Marker } from '@react-google-maps/api'
import React, { useState, useEffect } from 'react'
import MapInfoBox from './MapInfoBox'
import axiosInstance from '../../func/axiosInstance'

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

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180

  const R = 6371 // Radius of the Earth in km
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c // Distance in km

  return distance
}

function MapComponent() {
  const [locations, setLocations] = useState([])
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [availableExits, setAvailableExits] = useState([])
  const [currentLocation, setCurrentLocation] = useState(null)
  const [shortestDistance, setShortestDistance] = useState(null)
  const [recommendedTower, setRecommendedTower] = useState(null)

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axiosInstance.get('/api/torres')

        const mappedLocations = await Promise.all(
          response.data.map(async (loc) => {
            const exitsResponse = await axiosInstance.get(
              `/api/salidas/disponibles/${loc.Id}`
            )
            return {
              Id: loc.Id,
              Nombre: loc.Nombre,
              Position: {
                lat: loc.Latitud,
                lng: loc.Longitud,
              },
              UsuarioAdministrador: loc.UsuarioAdministrador,
              Exits: exitsResponse.data,
            }
          })
        )

        setLocations(mappedLocations)
      } catch (error) {
        console.error('Failed to fetch locations:', error)
      }
    }

    fetchLocations()
  }, [])

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setCurrentLocation({ lat: latitude, lng: longitude })

          if (locations.length > 0) {
            const distances = locations.map((location) =>
              calculateDistance(
                latitude,
                longitude,
                location.Position.lat,
                location.Position.lng
              )
            )
            const minDistance = Math.min(...distances)
            setShortestDistance(minDistance)
          }
        },
        (error) => {
          console.error('Error getting user location: ', error)
        }
      )
    }
  }, [locations])

  useEffect(() => {
    if (currentLocation && locations.length > 0) {
      const towersWithExits = locations.filter(
        (location) => location.Exits.length > 0
      )
      const sortedTowers = towersWithExits.sort((a, b) => {
        const distanceA = calculateDistance(
          currentLocation.lat,
          currentLocation.lng,
          a.Position.lat,
          a.Position.lng
        )
        const distanceB = calculateDistance(
          currentLocation.lat,
          currentLocation.lng,
          b.Position.lat,
          b.Position.lng
        )
        return distanceA - distanceB
      })

      if (sortedTowers.length > 0) {
        setRecommendedTower(sortedTowers[0])
      } else {
        setRecommendedTower(null)
      }
    }
  }, [currentLocation, locations])

  const handleMapClick = (event) => {
    const lat = event.latLng.lat()
    const lng = event.latLng.lng()
    console.log(`Latitud: ${lat}, Longitud: ${lng}`)
  }

  const handleMarkerClick = async (torre) => {
    setSelectedLocation(torre)
    setAvailableExits(torre.Exits)
    try {
      const response = await axiosInstance.get(
        `/api/salidas/disponibles/${torre.Id}`
      )
      const data = response.data
      setAvailableExits(data)
    } catch (error) {
      console.error('Error fetching data: ', error)
    }
  }

  const handleClose = () => {
    setSelectedLocation(null)
    setAvailableExits([])
  }

  const locationIcon = {
    url: 'https://maps.google.com/mapfiles/kml/paddle/blu-circle.png', // URL for the round blue location icon
    scaledSize: new window.google.maps.Size(40, 40), // Scale size if needed
  }

  const disabledIcon = {
    url: '/img/grey-marker.png', // URL for the round blue location icon
    scaledSize: new window.google.maps.Size(20, 30), // Scale size if needed
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
      >
        {locations.map((location) => {
          const hasAvailableExits = location.Exits.length > 0
          const markerIcon = hasAvailableExits
            ? 'https://maps.google.com/mapfiles/ms/icons/green-dot.png' // Default icon
            : disabledIcon // Gray icon if no exits available

          return (
            <Marker
              key={location.Id}
              position={location.Position}
              icon={markerIcon}
              onClick={() => handleMarkerClick(location)}
            />
          )
        })}
        <MapInfoBox
          selectedTower={selectedLocation}
          exits={availableExits}
          handleInfoClose={handleClose}
          userLocation={currentLocation}
        />
        {currentLocation && (
          <Marker
            position={currentLocation}
            icon={locationIcon}
          />
        )}
      </GoogleMap>
      {recommendedTower && (
        <div className="bg-background fixed bottom-[75px] left-0 p-4 shadow-md">
          <h3>Recomendación</h3>
          <p>Usa la torre: {recommendedTower.Nombre}</p>
          <p>
            Distancia:{' '}
            {calculateDistance(
              currentLocation.lat,
              currentLocation.lng,
              recommendedTower.Position.lat,
              recommendedTower.Position.lng
            ).toFixed(2)}{' '}
            km
          </p>
          <p>Salidas disponibles: {recommendedTower.Exits.length}</p>
        </div>
      )}
    </div>
  )
}

export default MapComponent
