import React, { createContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { BASE_URL } from '@env'
import * as Location from 'expo-location'
import { Alert } from 'react-native'
import { Linking } from 'react-native'

const SocketContext = createContext()

const SocketProvider = ({ children }) => {
  const socket = io(BASE_URL)
  const [activeStatus, setActiveStatus] = useState(false)
  const [myLocation, setMyLocation] = useState(false)
  const [location, setLocation] = useState({
    latitude: 16.07215,
    longitude: 108.22679,
  })
  const [myCheckin, setMyCheckin] = useState()

  const handleCheckin = () => {
    Alert.alert('Confirm ', `Do  you want to checkin`, [
      {
        text: 'NO',
      },
      {
        text: 'YES',
        onPress: () => {
          requestShareLocation()
        },
      },
    ])
  }

  const requestShareLocation = () => {
    Alert.alert(
      'REQUEST',
      `Please give me permission to access your location`,
      [
        {
          text: 'Redirect',
          onPress: () => {
            Linking.openSettings()
          },
        },
      ]
    )
  }

  const startLocationUpdates = async () => {
    // Kiểm tra quyền truy cập vị trí
    const { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      console.log('Please grant location permissions')
      handleCheckin()
    }
    setMyLocation(true)
  }

  useEffect(() => {
    // setSocket(newSocket)

    socket.on('busChange', (bus) => {
      setActiveStatus(bus.updatedBus.activeStatus)
      if (bus.updatedBus.activeStatus) {
        setLocation({
          latitude: bus.currentLocation.lat,
          longitude: bus.currentLocation.lng,
        })
      }
    })

    socket.on('locationChange', (busLocation) => {
      setLocation({
        latitude: busLocation.lat,
        longitude: busLocation.lng,
      })
    })

    socket.on('CheckIn', (lastCheckin) => {
      startLocationUpdates()
      setMyCheckin(lastCheckin)
    })

    socket.on('CheckOut', (lastCheckin) => {
      setMyLocation(false)
    })

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <SocketContext.Provider
      value={{
        socket,
        activeStatus,
        setActiveStatus,
        setLocation,
        location,
        myLocation,
        myCheckin,
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}

export { SocketContext, SocketProvider }
