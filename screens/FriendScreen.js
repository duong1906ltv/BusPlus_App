import React, { useState } from 'react'
import { Pressable } from 'react-native'
import { Image } from 'react-native'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import AddFriendModal from '../components/AddFriendModal'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Colors } from '../constants/colors'

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
          {item.name}
        </Text>
      </View>
      <View style={{ height: 1, backgroundColor: 'white' }}></View>
    </>
  )
}
const FriendScreen = () => {
  const [friends, setFriends] = useState([
    { id: 1, name: 'John Doe', avatar: 'https://i.redd.it/ah4sksgwvtz71.jpg' },
    {
      id: 2,
      name: 'Jane Smith',
      avatar: 'https://i.redd.it/ah4sksgwvtz71.jpg',
    },
    {
      id: 3,
      name: 'Michael Johnson',
      avatar: 'https://i.redd.it/ah4sksgwvtz71.jpg',
    },
    {
      id: 4,
      name: 'Emily Davis',
      avatar: 'https://i.redd.it/ah4sksgwvtz71.jpg',
    },
    {
      id: 4,
      name: 'Emily Davis',
      avatar: 'https://i.redd.it/ah4sksgwvtz71.jpg',
    },
    {
      id: 4,
      name: 'Emily Davis',
      avatar: 'https://i.redd.it/ah4sksgwvtz71.jpg',
    },
    {
      id: 4,
      name: 'Emily Davis',
      avatar: 'https://i.redd.it/ah4sksgwvtz71.jpg',
    },
    {
      id: 4,
      name: 'Emily Davis',
      avatar: 'https://i.redd.it/ah4sksgwvtz71.jpg',
    },
  ])

  const [modalVisible, setModalVisible] = useState(false)

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
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}
          >
            <AntDesign name="adduser" size={30}></AntDesign>
          </Pressable>
        </View>
      </View>
      <FlatList
        data={friends}
        renderItem={({ item, index }) => {
          return <FlatListItem item={item} index={index}></FlatListItem>
        }}
        keyExtractor={(item) => item.id.toString()}
      />
      <AddFriendModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
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
