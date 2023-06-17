import { useContext } from 'react'
import { useEffect, useState } from 'react'
import { Image, StyleSheet } from 'react-native'
import { Marker } from 'react-native-maps'
import { SocketContext } from '../../SocketContext'

function BusLocation() {
  const { socket, setActiveStatus, setLocation, location, activeStatus } =
    useContext(SocketContext)

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
