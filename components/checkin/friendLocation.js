import { useContext, useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Callout, Marker } from 'react-native-maps'
import { SocketContext } from '../../SocketContext'
export const busIcon = '../../assets/images/bus_orange.png'

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
          <Callout tooltip={true}>
            <View>
              <View style={styles.bubble}>
                <Text>TEST</Text>
              </View>
            </View>
          </Callout>
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
  bubble: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },
})
