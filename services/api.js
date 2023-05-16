import { API_URL, MAPBOX_API_KEY } from '@env'
import axios from 'axios'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getAllRoutesApi = () => api.get('/routes')

export const getRoutesInformationApi = () => api.get('/routes/routeinfo')

export const getForwardRouteApi = (routeName) =>
  api.get(`/routes/forward-route/${routeName}`)

export const getBackwardRouteApi = (routeName) =>
  api.get(`/routes/backward-route${routeName}`)

export const getDetailDirectionApi = (coordinates) => {
  let coordinatesString = ''

  let i = 0
  while (i < coordinates.length) {
    const coordinate = coordinates[i]
    coordinatesString += coordinate.longitude + ',' + coordinate.latitude + ';'
    i++
  }
  coordinatesString = coordinatesString.slice(0, -1)

  return api.get(
    `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinatesString}?alternatives=true&continue_straight=false&geometries=polyline&language=en&overview=simplified&access_token=${MAPBOX_API_KEY}`
  )
}

export default api
