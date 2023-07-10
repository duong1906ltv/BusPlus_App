import { BASE_URL } from '@env'
import { useEffect, useRef, useState } from 'react'
import { Image, StyleSheet, Text } from 'react-native'
import { Callout, Marker } from 'react-native-maps'
import { io } from 'socket.io-client'
import api from '../../services/api1'
import { useContext } from 'react'
import { SocketContext } from '../../SocketContext'
import { View } from 'react-native'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
export const busIcon = '../../assets/images/bus_orange.png'

function BusLocation({ routeNumber }) {
  const [activeBus, setActiveBus] = useState([])
  const { listCheckIn, activeStatus } = useContext(SocketContext)
  console.log(listCheckIn)

  const addBus = (busNumber, busId, lat, lng) => {
    setActiveBus((prevActiveBus) =>
      prevActiveBus.concat({ busNumber, busId, lat, lng })
    )
  }

  const removeBus = (busId) => {
    setActiveBus((prevActiveBus) =>
      prevActiveBus.filter((bus) => bus.busId !== busId)
    )
  }

  useEffect(() => {
    const getcurrentActiveBus = async () => {
      const res = await api.get(`/buses/active`)
      if (res.data === 0) {
        return
      }
      res.data.map((bus) => {
        if (bus.routeNumber === routeNumber) {
          addBus(
            bus.bus.busNumber,
            bus.location.busId,
            bus.location.lat,
            bus.location.lng
          )
        }
      })
    }

    getcurrentActiveBus()
  }, [listCheckIn])

  useEffect(() => {
    // Connect to the socket server

    const socket = io(BASE_URL)

    // Listen for the 'busChange' event
    socket.on('busChange', (bus) => {
      if (bus.updatedBus.activeStatus) {
        addBus(
          bus.currentLocation.busNumber,
          bus.currentLocation.busId,
          bus.currentLocation.lat,
          bus.currentLocation.lng
        )
      } else {
        removeBus(bus.updatedBus._id)
      }
    })

    socket.on('locationChange', (busLocation) => {
      setActiveBus((prevActiveBus) => {
        const updatedActiveBus = prevActiveBus.map((bus) => {
          if (bus.busId === busLocation.busId) {
            return {
              busNumber: bus.busNumber,
              busId: bus.busId,
              lat: busLocation.lat,
              lng: busLocation.lng,
            }
          } else {
            return bus
          }
        })
        return updatedActiveBus
      })
    })

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect()
    }
  }, [])

  const uri = '../../assets/images/bus_green.png'

  const markerRef = useRef(null)

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.showCallout()
    }
  }, [])

  return (
    <>
      {activeBus &&
        activeBus.map((bus) => (
          <>
            {listCheckIn.find((e) => e.busNumber === bus.busNumber) ? (
              <Marker
                key={bus.busId}
                coordinate={{
                  latitude: bus.lat,
                  longitude: bus.lng,
                }}
                ref={markerRef}
                onLayout={() => markerRef.current.showCallout()}
              >
                <View style={styles.activeBusContainer}>
                  <Image
                    source={require(busIcon)}
                    style={styles.activeBus}
                    resizeMode="center"
                    resizeMethod="resize"
                  />
                </View>
                <Callout style={{ width: 200 }}>
                  <Text style={{ textAlign: 'center' }}>
                    {
                      listCheckIn.find((e) => e.busNumber === bus.busNumber)
                        .fullname
                    }
                    {'\n '}
                    đang ở trên xe buýt này
                  </Text>
                </Callout>
              </Marker>
            ) : (
              <Marker
                key={bus.busId}
                coordinate={{
                  latitude: bus.lat,
                  longitude: bus.lng,
                }}
              >
                {activeStatus ? (
                  <SimpleLineIcons name="location-pin" size={30} />
                ) : (
                  <Image
                    source={require(uri)}
                    style={styles.markerImage}
                    resizeMode="center"
                    resizeMethod="resize"
                  />
                )}
              </Marker>
            )}
          </>
        ))}
    </>
  )
}

export default BusLocation

const styles = StyleSheet.create({
  markerImage: {
    width: 24,
    height: 24,
  },

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
