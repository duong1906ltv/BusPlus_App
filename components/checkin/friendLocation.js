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

function FriendLocation() {
  const { friendStatus } = useContext(SocketContext)
  const [fakeData, setFakeData] = useState({
    latitude: 16.08291621,
    longitude: 108.1461211,
  })

  useEffect(() => {}, [friendStatus])

  return (
    <>
      {true && (
        <Marker coordinate={fakeData}>
          <MaterialCommunityIcons name="human-male" size={50} color={'black'} />
        </Marker>
      )}
    </>
  )
}

export default FriendLocation

const styles = StyleSheet.create({
  markerImage: {
    width: 24,
    height: 24,
  },
})
