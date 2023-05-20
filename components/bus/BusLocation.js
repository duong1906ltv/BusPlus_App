import { BASE_URL } from '@env'
import { useEffect, useState } from 'react'
import { Image, StyleSheet } from 'react-native'
import { Marker } from 'react-native-maps'
import { io } from 'socket.io-client'

function BusLocation() {
  const [location, setLocation] = useState({
    latitude: 16.07215,
    longitude: 108.22679,
  })
  const [activeStatus, setActiveStatus] = useState(false)
  // console.log('START', location, activeStatus)

  useEffect(() => {
    // Connect to the socket server
    const socket = io(BASE_URL)

    // Listen for the 'busChange' event
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

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect()
    }
  }, [])

  const uri = '../../assets/images/bus_green.png'

  return (
    <>
      {activeStatus && location && (
        <Marker coordinate={location}>
          <Image
            source={require(uri)}
            style={styles.markerImage}
            resizeMode="center"
            resizeMethod="resize"
          />
        </Marker>
      )}
    </>
  )
}

export default BusLocation

const styles = StyleSheet.create({
  markerImage: {
    width: 24,
    height: 24,
  },
})