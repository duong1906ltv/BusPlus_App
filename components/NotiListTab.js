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
import { formatDistanceToNowStrict } from 'date-fns'
import { useState } from 'react'
import { useEffect } from 'react'

function NotiListTabs({ notiList }) {
  const layout = useWindowDimensions()

  const adminNotiList = notiList.filter((noti) => noti.type === 'admin noti')
  const friendNotiList = notiList.filter(
    (noti) => noti.type === 'friend check in'
  )

  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: 'first', title: 'Friend Notification' },
    { key: 'second', title: 'Admin Notification' },
  ])

  const FlatListItem = ({ item, index, type }) => {
    const [locationName, setLocationName] = useState('')

    console.log(item)

    useEffect(() => {
      // Call the Goong Geocoding API to get the location name
      if (item.type === 'friend check in') {
        if (item.lat) {
          const apiUrl = `https://rsapi.goong.io/Geocode?latlng=${item.lat},${item.lng}&api_key=yiOtDspWb1HocRioIwx5awYH85WSm2vEYGo9iTKa`

          fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
              // Handle the API response
              setLocationName(data.results[0].formatted_address)
            })
            .catch((error) => {
              // Handle any errors
              console.error(error)
            })
        }
      }
    }, [item])

    return (
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
        {item.friend?.profile.avatar ? (
          <Image
            source={{ uri: item.friend.profile.avatar }}
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
              width: 250,
            }}
          >
            {item.friend ? item.friend.profile.fullname : 'ADMIN'}
          </Text>
          {item.type === 'friend check in' ? (
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  fontSize: 14,
                  paddingHorizontal: 10,
                  color: Colors.black,
                  flexWrap: 'wrap',
                  flex: 1,
                  lineHeight: 20,
                }}
              >
                {item.status ? item.status : 'check in'} trên chuyến xe{' '}
                {item.busNumber} thuộc tuyến {item.routeNumber} tại vị trí{' '}
                {locationName}
              </Text>
            </View>
          ) : (
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  fontSize: 14,
                  paddingHorizontal: 10,
                  color: Colors.black,
                  flexWrap: 'wrap',
                  flex: 1,
                  lineHeight: 20,
                }}
              >
                {item.description}
              </Text>
            </View>
          )}
          <Text
            style={{
              marginLeft: 'auto',
              color: Colors.primary,
              fontWeight: '500',
            }}
          >
            {formatDistanceToNowStrict(new Date(item.createdAt), {
              addSuffix: true,
            })}
          </Text>
        </View>
      </View>
    )
  }
  const FirstRoute = () => (
    <View style={styles.tabContent}>
      {friendNotiList.length ? (
        <FlatList
          data={friendNotiList}
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
            return item._id
          }}
          style={{ flex: 1, backgroundColor: '#f6f5f5' }}
        />
      ) : (
        <Text>No Notifications</Text>
      )}
    </View>
  )

  const SecondRoute = () => (
    <View style={styles.tabContent}>
      {adminNotiList.length ? (
        <FlatList
          data={adminNotiList}
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
            return item._id
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

export default NotiListTabs

const styles = StyleSheet.create({
  tabContent: {
    flex: 1,
  },
  friendList: {},
  friendItem: {},
})
