import { useEffect, useState } from 'react'
import { Image, StyleSheet } from 'react-native'
import { Marker, Callout } from 'react-native-maps'
import * as Location from 'expo-location'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from '../../constants/colors'
import { useContext } from 'react'
import { SocketContext } from '../../SocketContext'
import { useSelector } from 'react-redux'

function CheckinLocation() {
  const { checkinStatus } = useContext(SocketContext)
  const [currentLocation, setCurrentLocation] = useState()
  const [fakeLocation, setFakeLocation] = useState({
    longitude: '108.145702',
    latitude: '16.082891',
  })

  useEffect(() => {
    const interval = setInterval(async () => {
      const { status } = await Location.getForegroundPermissionsAsync()
      if (status === 'granted') {
        let currentLocation = await Location.getCurrentPositionAsync({})
        let longitude = currentLocation.coords.longitude
        let latitude = currentLocation.coords.latitude
        setCurrentLocation({
          longitude,
          latitude,
        })
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {checkinStatus && (
        <Marker coordinate={fakeLocation}>
          <MaterialCommunityIcons name="human-male" size={50} color={'black'} />
          <Callout tooltip></Callout>
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
