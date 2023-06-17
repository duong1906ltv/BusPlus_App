import * as React from 'react'
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
import { Colors } from '../constants/colors'

function FriendListTabs({ friendList }) {
  const layout = useWindowDimensions()
  console.log('friendList', typeof friendList)

  const activeFriend = friendList.filter((friend) => friend.status === 'active')
  const freezedFriend = friendList.filter(
    (friend) => friend.status === 'freeze'
  )

  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: 'first', title: 'Active Friend' },
    { key: 'second', title: 'Freezed Friend' },
  ])

  const FlatListItem = ({ item, index }) => {
    return (
      <>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
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
          {item.profile.avatar ? (
            <Image
              source={{ uri: item.profile.avatar }}
              style={{
                width: 80,
                height: 80,
                margin: 5,
                borderRadius: 40,
                borderColor: Colors.primary,
                borderWidth: 1,
              }}
            />
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
            />
          )}
          <View style={{ gap: 10 }}>
            <Text
              style={{
                paddingHorizontal: 10,
                color: Colors.black,
                fontSize: 16,
                fontWeight: 'bold',
              }}
            >
              {item.profile.fullname}
            </Text>
            <Text
              style={{
                paddingHorizontal: 10,
                color: Colors.black,
                fontSize: 14,
              }}
            >
              {item.profile.phone}
            </Text>
          </View>
        </View>
      </>
    )
  }

  const FirstRoute = () => (
    <View style={styles.tabContent}>
      {activeFriend.length ? (
        <FlatList
          data={activeFriend}
          renderItem={({ item, index }) => {
            return <FlatListItem item={item} index={index}></FlatListItem>
          }}
          keyExtractor={(item) => {
            return item.profile._id
          }}
          style={{ flex: 1, backgroundColor: '#f6f5f5' }}
        />
      ) : (
        <Text>No Friends Active</Text>
      )}
    </View>
  )

  const SecondRoute = () => (
    <View style={styles.tabContent}>
      {freezedFriend.length ? (
        <FlatList
          data={freezedFriend}
          renderItem={({ item, index }) => {
            return <FlatListItem item={item} index={index}></FlatListItem>
          }}
          keyExtractor={(item) => {
            return item.profile._id
          }}
          style={{ flex: 1 }}
        />
      ) : (
        <Text style={{ color: Colors.black }}>No Friends Freezed</Text>
      )}
    </View>
  )

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  })

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'white' }}
      style={{ backgroundColor: Colors.primary, marginBottom: 15 }}
    />
  )

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  )
}

export default FriendListTabs

const styles = StyleSheet.create({
  tabContent: {
    flex: 1,
  },
  friendList: {},
  friendItem: {},
})