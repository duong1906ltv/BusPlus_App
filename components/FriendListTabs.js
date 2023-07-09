import * as React from 'react'
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  TouchableOpacity,
  Alert,
} from 'react-native'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
import { Colors } from '../constants/colors'
import { Swipeable } from 'react-native-gesture-handler'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useDispatch } from 'react-redux'
import { activeFriend, freezedFriend, getListFriend } from '../actions/friend'
import { useContext } from 'react'
import { SocketContext } from '../SocketContext'
import { useNavigation } from '@react-navigation/native'

function FriendListTabs({
  friendList,
  reloadData,
  setReloadData,
  listCheckIn,
}) {
  const layout = useWindowDimensions()
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const { setFriendStatus } = useContext(SocketContext)

  const activeFriendList = friendList.filter(
    (friend) => friend.status === 'active'
  )
  const freezedFriendList = friendList.filter(
    (friend) => friend.status === 'freeze'
  )

  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: 'first', title: 'Bạn đang theo dõi' },
    { key: 'second', title: 'Bạn đã bị ẩn' },
  ])

  const FlatListItem = ({ item, index, type }) => {
    const handleClick = (text) => {
      Alert.alert('Xác nhận', `Bạn có muốn ${text} người dùng này không`, [
        { text: 'NO' },
        {
          text: 'YES',
          onPress: async () => {
            text === 'active'
              ? dispatch(activeFriend(item?.profile.user))
              : dispatch(freezedFriend(item?.profile.user))

            setReloadData(!reloadData)
          },
        },
      ])
    }
    const rightSwipe = (type) => {
      let iconName, text
      if (type === 'active') {
        text = 'ghost'
        iconName = 'snapchat-ghost'
      } else {
        text = 'active'
        iconName = 'check-square-o'
      }
      return (
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#fff',
            height: 110,
          }}
        >
          <TouchableOpacity
            style={{
              width: 110,
              height: 110,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'green',
              marginRight: 1,
            }}
            onPress={() => handleClick(text)}
          >
            <FontAwesome
              name={iconName}
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
            onPress={() => handleClick('delete')}
          >
            <AntDesign name="deleteuser" size={50} color={'yellow'}></AntDesign>
          </TouchableOpacity>
        </View>
      )
    }

    const renderCheckInIcon = () => {
      if (listCheckIn.some((e) => e.user === item.profile.user)) {
        return (
          <FontAwesome
            name="check-circle"
            size={25}
            color="#4fb477"
            style={{ marginLeft: 'auto', marginRight: 20 }}
          />
        )
      } else {
        return (
          <FontAwesome
            name="check-circle"
            size={25}
            color={Colors.lightGray}
            style={{ marginLeft: 'auto', marginRight: 20 }}
          />
        )
      }
    }

    const handleFriendClick = () => {
      const foundCheckIn = listCheckIn.find((e) => e.user === item.profile.user)
      if (foundCheckIn) {
        const routeNumber = foundCheckIn.routeNumber
        setFriendStatus(true)
        navigation.navigate('RouteDetailScreen', {
          routeNumber: routeNumber,
        })
      } else {
        Alert.alert(
          'Cảnh báo ',
          `Bạn của bạn đang không checkin hoặc bạn đã bị set là không được theo dõi`,
          [
            {
              text: 'OK',
            },
          ]
        )
      }
    }
    return (
      <Swipeable renderRightActions={() => rightSwipe(type)}>
        <TouchableOpacity onPress={handleFriendClick}>
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
            {renderCheckInIcon()}
          </View>
        </TouchableOpacity>
      </Swipeable>
    )
  }

  const FirstRoute = () => (
    <View style={styles.tabContent}>
      {activeFriendList.length ? (
        <FlatList
          data={activeFriendList}
          renderItem={({ item, index }) => {
            return (
              <FlatListItem
                item={item}
                index={index}
                type={'active'}
              ></FlatListItem>
            )
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
      {freezedFriendList.length ? (
        <FlatList
          data={freezedFriendList}
          renderItem={({ item, index }) => {
            return (
              <FlatListItem
                item={item}
                index={index}
                type={'freeze'}
              ></FlatListItem>
            )
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
