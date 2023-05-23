import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import RouteDetails from '../components/routes/RouteDetails'
import RouteDirection from '../components/routes/RouteDirection'
import { getForwardRouteApi, getSchedules } from '../services/api'
import { getFullDetailDirection } from '../utils/mapUtils'

function RouteDetailScreen({
  route: {
    params: { routeNumber },
  },
}) {
  const [routeDirection, setRouteDirection] = useState([])
  const [routeStations, setRouteStations] = useState([])
  const [route, setRoute] = useState([])
  const [origin, setOrigin] = useState()
  const [schedule, setSchedule] = useState()

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const routeData = await getForwardRouteApi(routeNumber)
        const forwardRoute = routeData.data.route.forwardRoute
        setRoute(routeData.data.route)

        const decodedStations = forwardRoute.map((station) => ({
          latitude: station.location.lat,
          longitude: station.location.lng,
        }))
        setRouteStations(decodedStations)

        const direction = await getFullDetailDirection([...decodedStations])

        setRouteDirection(direction)
        setOrigin(decodedStations[0])
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
        origin={origin}
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
