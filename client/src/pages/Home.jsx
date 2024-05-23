import { React, useEffect, useState } from 'react'
import axiosInstance from '../func/axiosInstance'

const Home = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/api/usuarios')
      } catch (error) {
        console.error('Failed to fetch data:', error.message)
      }
    }

    fetchData()
  }, [])

  return <div className="bg-background h-screen"></div>
}

export default Home
