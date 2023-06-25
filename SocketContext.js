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
  const [currentLocation, setCurrentLocation] = useState()
  const [location, setLocation] = useState({
    latitude: 16.07215,
    longitude: 108.22679,
  })

  const authReducer = useSelector((state) => state.auth)
  console.log(authReducer)

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
          friend: authReducer.user._id,
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
    navigation.navigate('RouteDetailScreen', {
      routeNumber: 'R16',
    })
  }

  const friendCheckIn = async (lastCheckin) => {
    try {
      const response = await api.get(
        `/profile/get-friends/${authReducer.user._id}`
      )
      for (const data of response.data) {
        const profile = data.profile
        if (profile.user === lastCheckin.user._id) {
          Toast.show({
            type: 'success',
            text1: 'FRIEND CHECK IN',
            text2: `Bạn của bạn ${profile.fullname} vừa checkin trên tuyến R16 .... `,
            autoHide: true,
          })

          await api.post(`checkin`, {
            user: profile.user,
            status: 'Checking',
          })
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const user = authReducer.user

    socket.on('busChange', (bus) => {
      setActiveStatus(bus.updatedBus.activeStatus)
      if (bus.updatedBus.activeStatus) {
        setLocation({
          latitude: bus.currentLocation.lat,
          longitude: bus.currentLocation.lng,
        })
      }
    })

    socket.on('locationChange', (busLocation) => {
      setLocation({
        latitude: busLocation.lat,
        longitude: busLocation.lng,
      })
    })

    socket.on('CheckIn', (lastCheckin) => {
      console.log('checkin', lastCheckin)
      console.log(authReducer)
      if (authReducer?.user?._id === lastCheckin.user) {
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
      setListCheckIn((prevListCheckIn) =>
        prevListCheckIn.filter(
          (checkInUser) => checkInUser.id !== lastCheckin.user
        )
      )
      // dispatch(getFriendsCheckInStatus())
      setCheckinStatus(false)
    })

    socket.on('startHearingLocationOfUser', (lastCheckin) => {
      if (authReducer?.user?._id !== lastCheckin?.checkinId?.user) {
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
  }, [])

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
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}

export { SocketContext, SocketProvider }
