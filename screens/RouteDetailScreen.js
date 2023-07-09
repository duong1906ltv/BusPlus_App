import { useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { setSelectedBusStation } from '../actions/map'
import RouteDetails from '../components/routes/RouteDetails'
import RouteDirection from '../components/routes/RouteDirection'
import { Colors } from '../constants/colors'
import { getForwardRouteApi, getSchedules } from '../services/api'
import { getFullDetailDirection } from '../utils/mapUtils'

function RouteDetailScreen({
  route: {
    params: { routeNumber },
  },
  navigation,
}) {
  const dispatch = useDispatch()
  const [routeDirection, setRouteDirection] = useState([])
  const [routeStations, setRouteStations] = useState([])
  const [route, setRoute] = useState([])
  const [schedule, setSchedule] = useState()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: routeNumber,
      headerStyle: { backgroundColor: Colors.primary },
      headerTintColor: Colors.white,
    })
  }, [navigation, routeNumber])

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const routeData = await getForwardRouteApi(routeNumber)
        const forwardRoute = routeData.data.route.forwardRoute
        setRoute(routeData.data.route)

        const decodedStations = forwardRoute.map((station) => ({
          latitude: station.location.lat,
          longitude: station.location.lng,
          name: station.name,
        }))
        setRouteStations(
          decodedStations.map((item) => ({
            coordinate: {
              latitude: item.latitude,
              longitude: item.longitude,
            },
            icon: '../../assets/images/orange_icon_bus_station.png',
            name: item.name,
          }))
        )

        const direction = await getFullDetailDirection([...decodedStations])

        setRouteDirection(direction)
        dispatch(setSelectedBusStation(decodedStations[0]))
      } catch (error) {
        // Handle the error
        console.log(error)
      }
    }
    fetchRoute()
  }, [])

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const schedulesData = await getSchedules()
        const schedules = schedulesData.data
        const scheduleData = schedules.filter(
          (schedule) => schedule.route === route.id
        )[0]
        setSchedule(scheduleData)
      } catch (error) {
        // Handle the error
        console.log(error)
      }
    }

    if (route?.id) {
      fetchSchedule()
    }
  }, [route])

  return (
    <View style={styles.container}>
      <RouteDirection
        routeDirection={routeDirection}
        routeStations={routeStations}
      />
      <RouteDetails route={route} schedule={schedule} />
    </View>
  )
}

export default RouteDetailScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
