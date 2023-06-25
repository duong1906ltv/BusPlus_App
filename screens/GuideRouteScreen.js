import { Divider, Icon } from '@rneui/themed'
import React, { useState } from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSelector } from 'react-redux'
import Map from '../components/map/Map'
import { Colors } from '../constants/colors'
import { iconSize } from '../constants/styles'
import { selectSuggestedRoute } from '../reducers/route'

const GUIDE_DETAIL = 'GUIDE_DETAIL'
const ROUTE_PASS_THROUGH = 'ROUTE_PASS_THROUGH'

const HandleTouchEnd = ({ navigation }) => {
  const [tagHeight, setTagHeight] = useState(300)
  const [selectedTab, setSelectedTab] = useState(GUIDE_DETAIL)
  const suggestedRoute = useSelector(selectSuggestedRoute)

  const goBack = () => {
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <Map />
      </View>
      <View style={{ height: tagHeight }}>
        <Divider></Divider>
        <View style={styles.tabContainer}>
          <View
            style={selectedTab === GUIDE_DETAIL ? styles.activeTab : styles.tab}
          >
            <TouchableOpacity onPress={() => setSelectedTab(GUIDE_DETAIL)}>
              <Text
                style={
                  selectedTab === GUIDE_DETAIL ? styles.activeText : styles.text
                }
              >
                Hướng dẫn đường đi
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={
              selectedTab === ROUTE_PASS_THROUGH ? styles.activeTab : styles.tab
            }
          >
            <TouchableOpacity
              onPress={() => setSelectedTab(ROUTE_PASS_THROUGH)}
            >
              <Text
                style={
                  selectedTab === ROUTE_PASS_THROUGH
                    ? styles.activeText
                    : styles.text
                }
              >
                Các tuyến đi qua
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView>
          {selectedTab === GUIDE_DETAIL ? (
            <View style={styles.guideContainer}>
              {suggestedRoute ? (
                suggestedRoute.map((item) =>
                  item.transport === 'walking' ? (
                    <>
                      <View style={styles.guideDetail}>
                        <Image
                          style={iconSize(30)}
                          source={require('../assets/images/icon_walking_person.png')}
                        />
                        {item.listPoint[1].routeNumber ? (
                          <View style={styles.guiText}>
                            <Text style={{ color: '#111' }}>Đi đến trạm</Text>
                            <Text style={{ color: '#999' }}>
                              Từ vị trí bắt đầu đi đến trạm xe ở{' '}
                              {item.listPoint[1].name}
                            </Text>
                          </View>
                        ) : (
                          <View style={styles.guiText}>
                            <Text style={{ color: '#111' }}>
                              Xuống trạm và đi đến điểm đến
                            </Text>
                            <Text style={{ color: '#999' }}>
                              Xuống tại trạm {item.listPoint[0].name}{' '}
                            </Text>
                          </View>
                        )}

                        <View style={{ height: '100%', marginLeft: 'auto' }}>
                          <Text style={{ color: Colors.primary }}>
                            {item.totalDistance}m
                          </Text>
                        </View>
                      </View>
                      <Divider />
                    </>
                  ) : (
                    <>
                      <View style={styles.guideDetail}>
                        <Image
                          style={iconSize(30)}
                          source={require('../assets/images/icon_bus.png')}
                        />
                        <View style={styles.guiText}>
                          <Text style={{ color: '#111' }}>
                            Đi tuyến {item.routeNumber}
                          </Text>
                          <Text style={{ color: '#999' }}>
                            {item.listPoint[0].name}
                            {` -> `}
                            {item.listPoint[item.listPoint.length - 1].name}
                          </Text>
                        </View>
                        <View style={{ height: '100%', marginLeft: 'auto' }}>
                          <Text style={{ color: Colors.primary }}>
                            {item.totalDistance}m
                          </Text>
                        </View>
                      </View>
                      <Divider />
                    </>
                  )
                )
              ) : (
                <></>
              )}
            </View>
          ) : suggestedRoute ? (
            suggestedRoute.map((item) =>
              item.transport === 'bus' ? (
                <View style={styles.routePassContainer}>
                  <View
                    style={{
                      ...styles.verticalDivider,
                      backgroundColor: item.color,
                    }}
                  ></View>
                  <View style={styles.routePassContent}>
                    {item.listPoint.map((point, index) => (
                      <View style={styles.item}>
                        <View style={{ paddingVertical: 10 }}>
                          <Text style={{ color: '#111' }}>{point.name}</Text>
                        </View>
                        <Divider></Divider>
                        {index === 0 || index === item.listPoint.length - 1 ? (
                          <View
                            style={{
                              ...styles.circle,
                              backgroundColor: item.color,
                            }}
                          ></View>
                        ) : (
                          <View
                            style={{
                              ...styles.square,
                              backgroundColor: item.color,
                            }}
                          ></View>
                        )}
                      </View>
                    ))}
                  </View>
                </View>
              ) : (
                <></>
              )
            )
          ) : (
            <></>
          )}
        </ScrollView>
      </View>
      <View style={styles.backIcon}>
        <TouchableOpacity onPress={goBack}>
          <Icon
            size={30}
            color="#fff"
            name="ios-chevron-back-outline"
            type="ionicon"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.routeNameContainer}>
        {suggestedRoute ? (
          suggestedRoute.map((item) =>
            item.transport === 'bus' ? (
              <View
                style={{ ...styles.routeName, backgroundColor: item.color }}
              >
                <Image
                  style={iconSize(18)}
                  source={require('../assets/images/white_icon_bus.png')}
                />
                <Text style={{ fontSize: 14, color: '#fff', fontWeight: 600 }}>
                  {item.routeNumber}
                </Text>
              </View>
            ) : (
              <></>
            )
          )
        ) : (
          <></>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    position: 'relative',
  },
  backIcon: {
    height: 40,
    width: 40,
    position: 'absolute',
    left: 25,
    top: 30,
    backgroundColor: Colors.primary,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  routeNameContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 15,
    gap: 10,
    position: 'absolute',
    right: 0,
    top: 20,
  },
  routeName: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    borderRadius: 4,
    paddingHorizontal: 2,
    paddingVertical: 3,
  },
  mapContainer: {
    flex: 1,
    backgroundColor: 'lightgray',
  },
  tagContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
  },
  tabContainer: {
    flexDirection: 'row',
    with: '100%',
  },
  tab: {
    width: '50%',
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  activeTab: {
    width: '50%',
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
  text: {
    color: '#808080',
    fontSize: 16,
    fontWeight: 600,
  },
  activeText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: 600,
  },
  guideContainer: {
    paddingHorizontal: 10,
  },
  guideDetail: {
    flexDirection: 'row',
    paddingVertical: 20,
    gap: 10,
  },
  guiText: {
    width: '80%',
    gap: 3,
  },
  routePassContainer: {
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  verticalDivider: {
    height: '90%',
    width: 3,
    backgroundColor: Colors.primary,
  },
  routePassContent: {
    width: '100%',
  },
  item: {
    width: '100%',
    position: 'relative',
    marginLeft: 20,
  },
  square: {
    height: '100%',
    position: 'absolute',
    width: 6,
    height: 4,
    top: 17,
    left: -20,
  },
  circle: {
    height: '100%',
    position: 'absolute',
    width: 15,
    height: 15,
    borderRadius: 8,
    top: 11,
    left: -29,
  },
})

export default HandleTouchEnd
