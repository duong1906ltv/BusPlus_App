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
export const busIcon = '../../assets/images/bus_orange.png'

function CheckinLocation() {
  const { checkinStatus, location } = useContext(SocketContext)

  return (
    <>
      {checkinStatus && (
        <Marker coordinate={location}>
          <MaterialCommunityIcons name="human-male" size={50} color={'black'} />
          <Callout tooltip>
            <View>
              <View style={styles.buble}></View>
            </View>
          </Callout>
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
