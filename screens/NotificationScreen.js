import React, { useState } from 'react'
import { Pressable } from 'react-native'
import { Image } from 'react-native'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Colors } from '../constants/colors'
import Swipeout from 'react-native-swipeout'

const FlatListItem = ({ item, index }) => {
  const [activeRowKey, setActiveRowKey] = useState(null)
  const swipeSettings = {
    autoclose: true,
    onClose: (secId, rowId, direction) => {
      if (activeRowKey != null) {
        setActiveRowKey(null)
      }
    },
    onOpen: (secId, rowId, direction) => {
      setActiveRowKey(item.key)
    },
    right: [
      {
        onPress: () => {},
        text: 'Accept',
        type: 'primary',
      },
      {
        onPress: () => {},
        text: 'Decile',
        type: 'delete',
      },
    ],
    rowId: index,
    sectionId: 1,
  }
  return (
    <Swipeout {...swipeSettings}>
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
    </Swipeout>
  )
}

function NotificationScreen() {
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
  return (
    <View style={styles.container}>
      <FlatList
        data={friends}
        renderItem={({ item, index }) => {
          return <FlatListItem item={item} index={index}></FlatListItem>
        }}
        keyExtractor={(item) => item.id.toString()}
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
