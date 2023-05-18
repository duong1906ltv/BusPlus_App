import { useEffect, useState } from 'react'
import { getForwardRouteApi } from '../../services/api'
import { getFullDetailDirection } from '../../utils/mapUtils'
import Map from '../map/Map'

function RouteDirection() {
  const [routeDirection, setRouteDirection] = useState([])
  const [routeStations, setRouteStations] = useState([])
  const [route, setRoute] = useState([])

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const routeData = await getForwardRouteApi('R16')
        const forwardRoute = routeData.data.route.forwardRoute
        setRoute(forwardRoute)

        const decodedStations = forwardRoute.map((station) => ({
          latitude: station.location.lat,
          longitude: station.location.lng,
        }))
        setRouteStations(decodedStations)

        const direction = await getFullDetailDirection([...decodedStations])

        setRouteDirection(direction)
      } catch (error) {
        // Handle the error
        console.log(error)
      }
    }

    fetchRoute()
  }, [])

  return <Map coordinates={routeDirection} stations={routeStations} />
}

export default RouteDirection
