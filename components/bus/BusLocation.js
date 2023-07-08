import { BASE_URL } from '@env'
import { useEffect, useState } from 'react'
import { Image, StyleSheet } from 'react-native'
import { Marker } from 'react-native-maps'
import { io } from 'socket.io-client'
import api from '../../services/api1'

function BusLocation() {
  const [activeBus, setActiveBus] = useState([])
  // console.log('START', location, activeStatus)

  const addBus = (busId, lat, lng) => {
    setActiveBus((prevActiveBus) => prevActiveBus.concat({ busId, lat, lng }))
  }

  const removeBus = (busId) => {
    setActiveBus((prevActiveBus) =>
      prevActiveBus.filter((bus) => bus.busId !== busId)
    )
  }

  useEffect(() => {
    const getcurrentActiveBus = async () => {
      const res = await api.get(`/buses/active`)
      res.data.map((bus) => {
        addBus(bus.location.busId, bus.location.lat, bus.location.lng)
      })
    }

    getcurrentActiveBus()
  }, [])

  useEffect(() => {
    // Connect to the socket server

    const socket = io(BASE_URL)

    // Listen for the 'busChange' event
    socket.on('busChange', (bus) => {
      if (bus.updatedBus.activeStatus) {
        addBus(
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

  return (
    <>
      {activeBus &&
        activeBus.map((bus) => (
          <Marker
            key={bus.busId}
            coordinate={{
              latitude: bus.lat,
              longitude: bus.lng,
            }}
          >
            <Image
              source={require(uri)}
              style={styles.markerImage}
              resizeMode="center"
              resizeMethod="resize"
            />
          </Marker>
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
})
