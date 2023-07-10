import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useEffect, useLayoutEffect } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { setSelectedBusStation } from '../actions/map'
import Map from '../components/map/Map'
import { Colors } from '../constants/colors'

function BusNearStation({
  route: {
    params: { station },
  },
  navigation,
}) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      setSelectedBusStation({
        latitude: station.coordinate.latitude,
        longitude: station.coordinate.longitude,
      })
    )
  }, [station])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: `Trạm: ${station.name ?? ''}`,
      headerStyle: { backgroundColor: Colors.primary },
      headerTintColor: Colors.white,
    })
  }, [navigation, station])

  const nearBusList = [
    {
      routeNumber: 'R16',
      name: 'Kim Liên - CĐ Việt Hàn',
      direction: 'lượt về',
      speed: '11 km/h',
      distance: '305 m',
      timeLeft: '2 phút',
      busNumber: '43B151015',
    },
    {
      routeNumber: 'R16',
      name: 'Kim Liên - CĐ Việt Hàn',
      direction: 'lượt về',
      speed: '11 km/h',
      distance: '305 m',
      timeLeft: '2 phút',
      busNumber: '43B151015',
    },
    {
      routeNumber: 'R16',
      name: 'Kim Liên - CĐ Việt Hàn',
      direction: 'lượt về',
      speed: '11 km/h',
      distance: '305 m',
      timeLeft: '2 phút',
      busNumber: '43B151015',
    },
    {
      routeNumber: 'R16',
      name: 'Kim Liên - CĐ Việt Hàn',
      direction: 'lượt về',
      speed: '11 km/h',
      distance: '305 m',
      timeLeft: '2 phút',
      busNumber: '43B151015',
    },
    {
      routeNumber: 'R16',
      name: 'Kim Liên - CĐ Việt Hàn',
      direction: 'lượt về',
      speed: '11 km/h',
      distance: '305 m',
      timeLeft: '2 phút',
      busNumber: '43B151015',
    },
    {
      routeNumber: 'R16',
      name: 'Kim Liên - CĐ Việt Hàn',
      direction: 'lượt về',
      speed: '11 km/h',
      distance: '305 m',
      timeLeft: '2 phút',
      busNumber: '43B151015',
    },
    {
      routeNumber: 'R16',
      name: 'Kim Liên - CĐ Việt Hàn',
      direction: 'lượt về',
      speed: '11 km/h',
      distance: '305 m',
      timeLeft: '2 phút',
      busNumber: '43B151015',
    },
    {
      routeNumber: 'R16',
      name: 'Kim Liên - CĐ Việt Hàn',
      direction: 'lượt về',
      speed: '11 km/h',
      distance: '305 m',
      timeLeft: '2 phút',
      busNumber: '43B151015',
    },
    {
      routeNumber: 'R16',
      name: 'Kim Liên - CĐ Việt Hàn',
      direction: 'lượt về',
      speed: '11 km/h',
      distance: '305 m',
      timeLeft: '2 phút',
      busNumber: '43B151015',
    },
  ]

  return (
    <View style={styles.container}>
      <Map busStation={station}></Map>
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Xe gần tới trạm</Text>
        </View>
        <View style={styles.main}>
          {nearBusList ? (
            <FlatList
              style={styles.itemList}
              data={nearBusList}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: Colors.primary,
                        width: 45,
                        height: 45,
                        borderRadius: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Text style={{ color: Colors.white }}>
                        {item.routeNumber}
                      </Text>
                    </View>
                    <Text
                      style={{
                        color: Colors.primary,
                        fontSize: 12,
                        fontWeight: '500',
                      }}
                    >
                      {item.busNumber}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}
                    >
                      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        <Text style={{ fontSize: 15 }}>{item.name}</Text>
                        <Text
                          style={{ color: Colors.blue }}
                        >{` (${item.direction})`}</Text>
                      </View>
                      <View
                        style={{
                          width: 40,
                          height: 40,
                          borderWidth: 1,
                          borderColor: '#24ae24',
                          borderRadius: 7,
                          alignItems: 'center',
                          justifyContent: 'center',
                          paddingHorizontal: 5,
                        }}
                      >
                        <Text
                          style={{
                            textAlign: 'center',
                            fontSize: 12,
                            color: '#24ae24',
                            fontWeight: '500',
                          }}
                        >
                          {item.timeLeft}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 100,
                        alignItems: 'center',
                        paddingHorizontal: 5,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 5,
                        }}
                      >
                        <Ionicons
                          name="speedometer"
                          size={24}
                          color="#ffb85c"
                        />
                        <Text>{item.speed}</Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 5,
                        }}
                      >
                        <MaterialCommunityIcons
                          name="map-marker-distance"
                          size={24}
                          color="#ffb85c"
                        />
                        <Text>{item.distance}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              )}
            />
          ) : (
            <Text>Không tìm thấy xe nào gần tới trạm!</Text>
          )}
        </View>
      </View>
    </View>
  )
}

export default BusNearStation

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    position: 'absolute',
    top: '50%',
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#ffb85c',
    height: 60,
  },
  headerText: {
    textAlign: 'center',
    lineHeight: 60,
    fontSize: 16,
    color: '#fafafa',
    fontWeight: '500',
  },
  main: {
    paddingVertical: 10,
    flex: 1,
  },
  itemList: {},
  item: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 1,
    alignItems: 'stretch',
    gap: 10,
  },
})
