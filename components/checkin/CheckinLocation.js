import { useEffect, useState } from 'react'
import { Image, StyleSheet } from 'react-native'
import { Marker, Callout } from 'react-native-maps'
import * as Location from 'expo-location'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from '../../constants/colors'
import { useContext } from 'react'
import { SocketContext } from '../../SocketContext'
import { useSelector } from 'react-redux'
import api from '../../services/api1'

function CheckinLocation() {
  const { checkinStatus, checkinId } = useContext(SocketContext)
  const [currentLocation, setCurrentLocation] = useState()
  const authState = useSelector((state) => state.auth)

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
        if (checkinStatus) {
          await api.post(`/checkin/location`, {
            user: authState.user._id,
            checkinId: checkinId,
            lat: latitude,
            lng: longitude,
          })
        }
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {checkinStatus && (
        <Marker coordinate={currentLocation}>
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
