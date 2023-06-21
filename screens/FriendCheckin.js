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

const FlatListItem = ({ item, index, onComponentOpen }) => {
  const dispatch = useDispatch()
  const ref = useRef()

  useEffect(() => {
    dispatch(getFriendRequest())
  }, [dispatch])

  const handleReject = () => {
    Alert.alert('Confrim', `Do you want to reject this request`, [
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
    Alert.alert('Confrim', `Do you want to accept this request`, [
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
          backgroundColor: index % 2 == 0 ? 'mediumseagreen' : 'tomato',
          flexDirection: 'row',
        }}
      >
        {item.senderId.profile.avatar ? (
          <Image
            source={{ uri: item.senderId.profile.avatar }}
            style={{ width: 100, height: 100, margin: 5 }}
          ></Image>
        ) : (
          <Image
            source={{
              uri: 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg',
            }}
            style={{ width: 100, height: 100, margin: 5 }}
          ></Image>
        )}

        <View>
          <Text
            style={{
              paddingBottom: 5,
              paddingTop: 10,
              paddingLeft: 10,
              color: 'white',
              fontSize: 16,
            }}
          >
            {item.senderId.profile.fullname}
          </Text>
          <Text
            style={{
              paddingBottom: 5,
              paddingLeft: 10,
              color: 'white',
              fontSize: 16,
            }}
          >
            Phone number: {item.senderId.profile.phone}
          </Text>
          <Text style={{ paddingLeft: 10, color: 'white', fontSize: 16 }}>
            sent you a friend request
          </Text>
        </View>
      </View>
      <View style={{ height: 1, backgroundColor: 'white' }}></View>
    </Swipeable>
  )
}

function FriendCheckin() {
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

export default FriendCheckin
