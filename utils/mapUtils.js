import polyline from '@mapbox/polyline'
import { getDetailDirectionApi } from '../services/api'

export const getFullDetailDirection = async (routeStations) => {
  let direction = []
  do {
    // Limit coordinate pairs to 25 to be able to call API
    const stations = routeStations.splice(0, 25)
    const directionData = await getDetailDirectionApi(stations)
    const directionGeometry = directionData.data.routes[0].geometry
    const decodedPolyline = polyline.decode(directionGeometry)
    const decodedDirection = decodedPolyline.map((e) => ({
      latitude: e[0],
      longitude: e[1],
    }))
    direction.push(...decodedDirection)
  } while (routeStations.length > 0)

  return direction
}
