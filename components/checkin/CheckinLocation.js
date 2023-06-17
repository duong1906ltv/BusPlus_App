import { useEffect, useState } from 'react'
import { Image, StyleSheet } from 'react-native'
import { Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import IonIcons from 'react-native-vector-icons/Ionicons'
import { Colors } from '../../constants/colors'
import { useContext } from 'react'
import { SocketContext } from '../../SocketContext'

function CheckinLocation() {
  const [location, setLocation] = useState()

  const { myLocation, myCheckin } = useContext(SocketContext)

  const startLocationUpdates = async () => {
    // Theo dõi vị trí hiện tại
    const { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      console.log('Please grant location permissions')
      handleCheckin()
    }
    let currentLocation = await Location.getCurrentPositionAsync({})
    let longitude = currentLocation.coords.longitude
    let latitude = currentLocation.coords.latitude
    setLocation({
      longitude,
      latitude,
    })
  }

  useEffect(() => {
    startLocationUpdates()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      startLocationUpdates()
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {myLocation && (
        <Marker coordinate={location}>
          <IonIcons name="location-sharp" size={50} color={Colors.primary} />
        </Marker>
      )}
    </>
  )
}

export default CheckinLocation

const styles = StyleSheet.create({
  markerImage: {
    width: 24,
    height: 24,
  },
})
