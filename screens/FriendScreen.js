import { useIsFocused } from '@react-navigation/native'
import React, { useContext, useEffect, useState } from 'react'
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useDispatch, useSelector } from 'react-redux'
import { getListFriend, sentFriendRequest } from '../actions/friend'
import AddFriendModal from '../components/AddFriendModal'
// import ToastMessage from '../components/ToastMessage'
import FriendListTabs from '../components/FriendListTabs'
import { Colors } from '../constants/colors'
import { getFriendsCheckInStatus } from '../actions/checkin'
import { SocketContext } from '../SocketContext'

const FriendScreen = () => {
  const [reloadData, setReloadData] = useState(false)
  const { isLoading, listFriend } = useSelector((state) => state.friend)
  const { listFriendCheckIn } = useSelector((state) => state.checkin)
  const { listCheckIn } = useContext(SocketContext)
  const isFocused = useIsFocused()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getListFriend())
    dispatch(getFriendsCheckInStatus())
  }, [dispatch, isFocused, reloadData, listCheckIn])

  const [modalVisible, setModalVisible] = useState(false)
  const [phone, setPhone] = useState('')

  const handleAddFriend = () => {
    Alert.alert(
      'Xác nhận',
      `Bạn có muốn kết bạn với người bạn có số điện thoại "${phone}"này không`,
      [
        { text: 'Không' },
        {
          text: 'Có ',
          onPress: () => {
            dispatch(sentFriendRequest({ phone }))
          },
        },
      ]
    )
  }

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 20,
          marginTop: 5,
        }}
      >
        <Text style={styles.title}>Bạn bè</Text>
        <View
          style={{
            width: 40,
            marginLeft: 'auto',
            borderColor: Colors.primary,
            borderWidth: 2,
            borderRadius: 30,
          }}
        >
          <AddFriendModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            setPhone={setPhone}
            phone={phone}
            handleAddFriend={handleAddFriend}
          />
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}
          >
            <AntDesign
              name="adduser"
              size={30}
              style={{
                marginTop: -20,
                marginBottom: 5,
                paddingLeft: 3,
              }}
            ></AntDesign>
          </Pressable>
        </View>
      </View>
      {listFriend && (
        <FriendListTabs
          friendList={listFriend}
          reloadData={reloadData}
          setReloadData={setReloadData}
          listCheckIn={listCheckIn}
        />
      )}
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
    alignItems: 'center',
    borderBottomColor: Colors.primary,
    borderBottomWidth: 2,
  },
})

export default FriendScreen
