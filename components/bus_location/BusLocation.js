import { BASE_URL } from '@env'
import { useEffect } from 'react'
import { Text, View } from 'react-native'
import { io } from 'socket.io-client'

function BusLocation() {
  useEffect(() => {
    // Connect to the socket server
    const socket = io(BASE_URL)
    console.log('socket')
    // Listen for the 'busLocationUpdate' event
    socket.on('busChange', (location) => {
      // Handle the received bus location update
      console.log('Received bus location update:', location)
      // Update your component state or perform any other actions based on the received data
    })

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <View>
      <Text>Bus Location</Text>
    </View>
  )
}

export default BusLocation
