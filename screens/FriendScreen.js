import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  Pressable,
  Image,
} from 'react-native'
import AddFriendModal from '../components/AddFriendModal'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useDispatch, useSelector } from 'react-redux'
import {
  getFriendRequest,
  getListFriend,
  sentFriendRequest,
} from '../actions/friend'
import { useIsFocused } from '@react-navigation/native'
// import ToastMessage from '../components/ToastMessage'

const FlatListItem = ({ item, index }) => {
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: index % 2 == 0 ? 'mediumseagreen' : 'tomato',
          flexDirection: 'row',
        }}
      >
        <Image
          source={{ uri: item.avatar }}
          style={{ width: 100, height: 100, margin: 5 }}
        ></Image>
        <Text style={{ padding: 10, color: 'white', fontSize: 16 }}>
          {item.profile.fullname}
        </Text>
      </View>
      <View style={{ height: 1, backgroundColor: 'white' }}></View>
    </>
  )
}
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
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.title}>Friends</Text>

        <View
          style={{
            width: 40,
            marginLeft: 'auto',
            margin: 10,
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
            <AntDesign name="adduser" size={30}></AntDesign>
          </Pressable>
        </View>
      </View>
      <FlatList
        data={friend?.listFriend}
        renderItem={({ item, index }) => {
          return <FlatListItem item={item} index={index}></FlatListItem>
        }}
        keyExtractor={(item) => {
          return item.profile._id
        }}
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

export default FriendScreen
