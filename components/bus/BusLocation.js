import { useContext } from 'react'
import { useEffect, useState } from 'react'
import { Image, StyleSheet } from 'react-native'
import { Marker } from 'react-native-maps'
import { SocketContext } from '../../SocketContext'

function BusLocation() {
  const { socket, setActiveStatus, setLocation, location, activeStatus } =
    useContext(SocketContext)

  const [fakeLocation, setFakeLocation] = useState({
    longitude: '108.1238154',
    latitude: '16.1200297',
  })

  const uri = '../../assets/images/bus_green.png'

  return (
    <>
      {activeStatus && location && (
        <Marker coordinate={fakeLocation}>
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
