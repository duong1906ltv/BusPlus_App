import { useContext, useEffect, useState } from 'react'
import { Image, StyleSheet } from 'react-native'
import { Marker } from 'react-native-maps'
import { SocketContext } from '../../SocketContext'

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
          <View style={styles.activeBusContainer}>
            <Image
              source={require(busIcon)}
              style={styles.activeBus}
              resizeMode="center"
              resizeMethod="resize"
            />
          </View>
        </Marker>
      )}
    </>
  )
}

export default FriendLocation

const styles = StyleSheet.create({
  activeBusContainer: {
    padding: 5,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: '#B76F00',
    borderStyle: 'solid',
  },
  activeBus: {
    width: 24,
    height: 24,
  },
})
