import { StyleSheet, View } from 'react-native'
import RouteDetails from '../components/routes/RouteDetails'
import RouteDirection from '../components/routes/RouteDirection'

function RouteDetailScreen({ route }) {
  const routeNumber = route.params.routeNumber
  return (
    <View style={styles.container}>
      <RouteDirection routeNumber={routeNumber} />
      <RouteDetails />
    </View>
  )
}

export default RouteDetailScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
