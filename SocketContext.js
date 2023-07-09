import React, { createContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { BASE_URL } from '@env'
import * as Location from 'expo-location'
import { Alert } from 'react-native'
import { Linking } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import api from './services/api1'

const SocketContext = createContext()

const SocketProvider = ({ children }) => {
  const navigation = useNavigation()
  const socket = io(BASE_URL)
  const [activeStatus, setActiveStatus] = useState(false)
  const [checkinStatus, setCheckinStatus] = useState(false)
  const [listCheckIn, setListCheckIn] = useState([])
  const [friendStatus, setFriendStatus] = useState(false)
  const [location, setLocation] = useState({
    latitude: 16.07215,
    longitude: 108.22679,
  })

  const authState = useSelector((state) => state.auth)

  const [myCheckin, setMyCheckin] = useState()

  const sendNotiToFriend = async (lastCheckin) => {
    await api.patch(`/checkin`, { checkinId: lastCheckin._id })
  }

  const handleCheckin = (lastCheckin) => {
    const lat = lastCheckin.lat
    const lng = lastCheckin.lng
    Alert.alert('Xác nhận ', `Bạn có muốn checkin không?`, [
      {
        text: 'NO',
      },
      {
        text: 'YES',
        onPress: () => {
          sendNotiToFriend(lastCheckin)
          setCheckinStatus(true)
          setLocation({ lat, lng })
          navigation.navigate('RouteDetailScreen', {
            routeNumber: lastCheckin.routeNumber,
          })
        },
      },
    ])
  }

  const friendCheckIn = async (lastCheckin) => {
    try {
      const response = await api.get(`/profile/get-friends/${lastCheckin.user}`)

      for (const data of response.data) {
        const profile = data.profile
        if (data.status === 'active') {
          if (profile.user === authState.user._id) {
            Toast.show({
              type: 'success',
              text1: 'FRIEND CHECK IN',
              text2: `Bạn của bạn ${data.fullname} vừa lên xe buýt `,
              autoHide: true,
            })
            await api.post(`noti`, {
              user: profile.user,
              friend: lastCheckin.user,
              lat: lastCheckin.lat,
              lng: lastCheckin.lng,
              routeNumber: lastCheckin.routeNumber,
              busNumber: lastCheckin.busNumber,
            })
            setListCheckIn((prevListCheckIn) => {
              const isDuplicate = prevListCheckIn.some(
                (item) =>
                  item.user === lastCheckin.user &&
                  item.routeNumber === lastCheckin.routeNumber &&
                  item.busNumber === lastCheckin.busNumber
              )

              if (isDuplicate) {
                return prevListCheckIn // Không thêm phần tử mới nếu bị trùng
              }

              return [
                ...prevListCheckIn,
                {
                  user: lastCheckin.user,
                  routeNumber: lastCheckin.routeNumber,
                  busNumber: lastCheckin.busNumber,
                },
              ]
            })
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    socket.on('CheckIn', (lastCheckin) => {
      if (authState?.user?._id === lastCheckin.user) {
        handleCheckin(lastCheckin)
      }
    })

    socket.on('noti', (lastCheckin) => {
      friendCheckIn(lastCheckin)
    })

    socket.on('CheckOut', (lastCheckin) => {
      setCheckinStatus(false)
      setFriendStatus(false)
      setListCheckIn((prevListCheckIn) =>
        prevListCheckIn.filter(
          (checkInUser) => checkInUser.id !== lastCheckin.user
        )
      )
      setCheckinStatus(false)
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
        listCheckIn,
        setFriendStatus,
        friendStatus,
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}

export { SocketContext, SocketProvider }
