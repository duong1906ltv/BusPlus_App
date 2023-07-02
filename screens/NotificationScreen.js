import React, { useEffect, useRef, useState } from 'react'
import { useIsFocused } from '@react-navigation/native'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import {
  acceptRequest,
  getFriendRequest,
  rejectRequest,
} from '../actions/friend'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Alert } from 'react-native'
import { Colors } from '../constants/colors'

const FlatListItem = ({ item, index, onComponentOpen }) => {
  const dispatch = useDispatch()
  const ref = useRef()

  useEffect(() => {
    dispatch(getFriendRequest())
  }, [dispatch])

  const handleReject = () => {
    Alert.alert('Xác nhận', `Bạn từ chối với lời mời kết bạn này?`, [
      { text: 'NO' },
      {
        text: 'YES',
        onPress: () => {
          dispatch(rejectRequest(item._id))
          dispatch(getFriendRequest())
        },
      },
    ])
  }

  const handleAccept = () => {
    Alert.alert('Xác nhận', `Bạn đồng ý với lời mời kết bạn này?`, [
      { text: 'NO' },
      {
        text: 'YES',
        onPress: () => {
          dispatch(acceptRequest(item._id))
          dispatch(getFriendRequest())
        },
      },
    ])
  }

  const rightSwipe = () => {
    return (
      <View style={{ flexDirection: 'row', backgroundColor: '#fff' }}>
        <TouchableOpacity
          style={{
            width: 110,
            height: 110,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'green',
            marginRight: 1,
          }}
          onPress={handleAccept}
        >
          <FontAwesome
            name="check-circle"
            size={50}
            color={'yellow'}
          ></FontAwesome>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 110,
            height: 110,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'red',
          }}
          onPress={handleReject}
        >
          <FontAwesome
            name="times-circle-o"
            size={50}
            color={'yellow'}
          ></FontAwesome>
        </TouchableOpacity>
      </View>
    )
  }
  useEffect(() => {
    if (item.opened === false) {
      ref.current.close()
    }
  })
  return (
    <Swipeable
      renderRightActions={rightSwipe}
      onSwipeableOpen={() => {
        onComponentOpen(index)
      }}
      ref={ref}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          flexDirection: 'row',
          alignItems: 'center',
          shadowColor: '#000000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.17,
          shadowRadius: 2.54,
          elevation: 3,
          padding: 10,
        }}
      >
        {item.senderId.profile.avatar ? (
          <Image
            source={{ uri: item.senderId.profile.avatar }}
            style={{
              width: 80,
              height: 80,
              margin: 5,
              borderRadius: 40,
              borderColor: Colors.primary,
              borderWidth: 1,
            }}
          ></Image>
        ) : (
          <Image
            source={{
              uri: 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg',
            }}
            style={{
              width: 80,
              height: 80,
              margin: 5,
              borderRadius: 40,
              borderColor: Colors.primary,
              borderWidth: 1,
            }}
          ></Image>
        )}

        <View style={{ gap: 10, justifyContent: 'center' }}>
          <Text
            style={{
              paddingHorizontal: 10,
              color: Colors.black,
              fontSize: 16,
              fontWeight: 'bold',
            }}
          >
            {item.senderId.profile.fullname}
          </Text>
          <Text
            style={{
              paddingHorizontal: 10,
              color: Colors.black,
              fontSize: 14,
            }}
          >
            Số điện thoại: {item.senderId.profile.phone}
          </Text>
          <Text
            style={{ paddingHorizontal: 10, color: Colors.black, fontSize: 14 }}
          >
            Đã gửi bạn một lời mời kết bạn
          </Text>
        </View>
      </View>
      <View style={{ height: 1, backgroundColor: 'white' }}></View>
    </Swipeable>
  )
}

function NotificationScreen() {
  const friendState = useSelector((state) => state.friend)
  const dispatch = useDispatch()
  const isFocused = useIsFocused()

  useEffect(() => {
    dispatch(getFriendRequest())
  }, [dispatch, isFocused])

  const openComponent = (ind) => {
    let tempData = friendState?.request
    tempData.map((item, index) => {
      if (index === ind) {
        item.opened = true
      } else {
        item.opened = false
      }
    })
    let temp = []
    tempData.map((item) => {
      temp.push(item)
    })
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={friendState?.request}
        renderItem={({ item, index }) => {
          return (
            <FlatListItem
              item={item}
              index={index}
              onComponentOpen={(x) => {
                openComponent(x)
              }}
            ></FlatListItem>
          )
        }}
        keyExtractor={(item) => {
          return item._id
        }}
        extraData={friendState?.request}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
    alignItems: 'center',
  },
})

export default NotificationScreen
