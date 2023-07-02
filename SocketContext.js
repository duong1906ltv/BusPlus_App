import React, { createContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { BASE_URL } from '@env'
import * as Location from 'expo-location'
import { Alert } from 'react-native'
import { Linking } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { getFriendsCheckInStatus } from './actions/checkin'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import api from './services/api1'

const SocketContext = createContext()

const SocketProvider = ({ children }) => {
  const navigation = useNavigation()
  const socket = io(BASE_URL)
  const [activeStatus, setActiveStatus] = useState(false)
  const [checkinStatus, setCheckinStatus] = useState(false)
  const [listCheckIn, setListCheckIn] = useState([])
  const [checkinId, setCheckinId] = useState()
  const [currentLocation, setCurrentLocation] = useState()
  const [friendStatus, setFriendStatus] = useState(false)
  const [location, setLocation] = useState({
    latitude: 16.07215,
    longitude: 108.22679,
  })

  const authState = useSelector((state) => state.auth)
  console.log('AUTH', authState)

  const [myCheckin, setMyCheckin] = useState()

  const handleCheckin = (lastCheckin) => {
    Alert.alert('Xác nhận ', `Bạn có muốn checkin không?`, [
      {
        text: 'NO',
      },
      {
        text: 'YES',
        onPress: () => {
          requestShareLocation(lastCheckin)
        },
      },
    ])
  }

  const requestShareLocation = async (lastCheckin) => {
    const { status } = await Location.getForegroundPermissionsAsync()
    if (status !== 'granted') {
      const { status: newStatus } =
        await Location.requestForegroundPermissionsAsync()
      if (newStatus !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Please enable location access to continue.',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Open Settings',
              onPress: () => Linking.openSettings(),
            },
          ]
        )
        return
      }
    }
    setCheckinStatus(true)
    let checkinLocation = await Location.getCurrentPositionAsync({})
    const response = await api.get(`/profile/get-friends/${lastCheckin.user}`)
    for (const data of response.data) {
      const profile = data.profile

      if (data.status === 'active') {
        await api.post(`noti`, {
          user: profile.user,
          friend: authState.user._id,
          lat: checkinLocation.coords.latitude,
          lng: checkinLocation.coords.longitude,
        })
      }
    }
    await api.post('/checkin/location', {
      checkinId: lastCheckin._id,
      lat: checkinLocation.coords.latitude,
      lng: checkinLocation.coords.longitude,
      user: lastCheckin.user,
    })
    setCheckinId(lastCheckin._id)
    navigation.navigate('RouteDetailScreen', {
      routeNumber: lastCheckin.routeNumber,
    })
  }

  const friendCheckIn = async (lastCheckin) => {
    console.log('HELLO')
    try {
      const response = await api.get(
        `/profile/get-friends/${authState.user._id}`
      )
      for (const data of response.data) {
        const profile = data.profile
        if (data.status === 'active') {
          if (profile.user === lastCheckin.user._id) {
            Toast.show({
              type: 'success',
              text1: 'FRIEND CHECK IN',
              text2: `Bạn của bạn ${profile.fullname} vừa lên xe buýt `,
              autoHide: true,
            })

            await api.post(`checkin`, {
              user: profile.user,
              status: 'Checking',
            })
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // socket.on('busChange', (bus) => {
    //   setActiveStatus(bus.updatedBus.activeStatus)
    //   if (bus.updatedBus.activeStatus) {
    //     setLocation({
    //       latitude: bus.currentLocation.lat,
    //       longitude: bus.currentLocation.lng,
    //     })
    //   }
    // })

    // socket.on('locationChange', (busLocation) => {
    //   console.log('BUS', busLocation)
    //   setLocation({
    //     latitude: busLocation.lat,
    //     longitude: busLocation.lng,
    //   })
    // })

    socket.on('CheckIn', (lastCheckin) => {
      console.log(authState)
      console.log(lastCheckin)
      if (authState?.user?._id === lastCheckin.user) {
        handleCheckin(lastCheckin)
      }
    })

    socket.on('Checking', (lastCheckin) => {
      setListCheckIn((prevListCheckIn) => [
        ...prevListCheckIn,
        lastCheckin.user,
      ])
    })

    socket.on('CheckOut', (lastCheckin) => {
      console.log('CHEckout', lastCheckin)
      setCheckinStatus(false)
      setFriendStatus(false)
      setListCheckIn((prevListCheckIn) =>
        prevListCheckIn.filter(
          (checkInUser) => checkInUser.id !== lastCheckin.user
        )
      )
      // dispatch(getFriendsCheckInStatus())
      setCheckinStatus(false)
    })

    socket.on('startHearingLocationOfUser', (lastCheckin) => {
      console.log('ALO')
      if (authState?.user?._id !== lastCheckin?.checkinId?.user) {
        friendCheckIn(lastCheckin)
      }
    })

    socket.on('updateLocationOfUser', (updatedDocument) => {
      console.log(updatedDocument)
    })

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect()
    }
  }, [authState])

  return (
    <SocketContext.Provider
      value={{
        socket,
        activeStatus,
        setActiveStatus,
        setLocation,
        location,
        checkinStatus,
        myCheckin,
        currentLocation,
        listCheckIn,
        checkinId,
        setFriendStatus,
        friendStatus,
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}

export { SocketContext, SocketProvider }
