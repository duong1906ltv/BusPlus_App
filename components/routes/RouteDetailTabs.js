import * as React from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native'
import { SceneMap, TabView } from 'react-native-tab-view'

function RouteDetailTabs({ route, schedule }) {
  const layout = useWindowDimensions()
  const stations = route?.forwardRoute
  const timeline = schedule?.arrivalTime

  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: 'first', title: 'Timeline' },
    { key: 'second', title: 'Station' },
    { key: 'third', title: 'Route Info' },
  ])

  const FirstRoute = () => (
    <View style={styles.tabContent}>
      {timeline && (
        <FlatList
          data={timeline}
          renderItem={({ item }) => (
            <View style={styles.timelineItem}>
              <Text>{item}</Text>
            </View>
          )}
          alwaysBounceVertical={false}
        />
      )}
    </View>
  )

  const SecondRoute = () => (
    <View style={styles.tabContent}>
      {stations && (
        <FlatList
          data={stations}
          renderItem={({ item }) => (
            <View style={styles.stationItem}>
              <Text>{item.name}</Text>
            </View>
          )}
          alwaysBounceVertical={false}
        />
      )}
    </View>
  )

  const ThirdRoute = () => (
    <View style={styles.tabContent}>
      <View style={styles.infoItem}>
        <Text style={styles.infoTitle}>Route No: </Text>
        <Text style={styles.infoContent}> {route.routeNumber}</Text>
      </View>
      <View style={styles.infoItem}>
        <Text style={styles.infoTitle}>Route Name: </Text>
        <Text style={styles.infoContent}> {route.routeName}</Text>
      </View>
      <View style={styles.infoItem}>
        <Text style={styles.infoTitle}>Ticket Price: </Text>
        <Text style={styles.infoContent}> {route.cost}</Text>
      </View>
    </View>
  )

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  })

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  )
}
export default RouteDetailTabs

const styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  stationItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  timelineItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  infoItem: {
    width: '100%',
    paddingVertical: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  infoTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  infoContent: {
    fontSize: 16,
  },
})
