import { useIsFocused } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useDispatch, useSelector } from 'react-redux'
import { getListFriend, sentFriendRequest } from '../actions/friend'
import AddFriendModal from '../components/AddFriendModal'
// import ToastMessage from '../components/ToastMessage'
import FriendListTabs from '../components/FriendListTabs'
import { Colors } from '../constants/colors'

const FriendScreen = () => {
  const friend = useSelector((state) => state.friend)
  const isFocused = useIsFocused()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getListFriend())
  }, [dispatch, isFocused])

  const [modalVisible, setModalVisible] = useState(false)
  const [phone, setPhone] = useState('')

  const handleAddFriend = () => {
    Alert.alert(
      'Confrim',
      `Do you want to make friends with a friend with phone number "${phone}"`,
      [
        { text: 'NO' },
        {
          text: 'YES',
          onPress: () => {
            dispatch(sentFriendRequest({ phone }))
          },
        },
      ]
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
        <Text style={styles.title}>My Friends</Text>
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
      {friend && friend?.listFriend && (
        <FriendListTabs friendList={friend?.listFriend} />
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
