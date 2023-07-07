import { API_BASE_URL, MAPBOX_API_KEY } from '@env'
import axios from 'axios'
import { getDistance } from 'geolib'

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// axios
export const authFetch = axios.create({
  baseURL: '/api',
  timeout: 3000,
})
// request

authFetch.interceptors.request.use(
  (config) => {
    config.headers.common['Authorization'] = `Bearer ${state.token}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
// response

authFetch.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.status === 401) {
      logoutUser()
    }
    return Promise.reject(error)
  }
)

export const getAllRoutesApi = () => api.get('/routes')

export const getRoutesInformationApi = () => api.get('/routes/routeinfo')

export const getForwardRouteApi = (routeName) =>
  api.get(`/routes/forward-route/${routeName}`)

export const getBackwardRouteApi = (routeName) =>
  api.get(`/routes/backward-route${routeName}`)

export const getSchedules = () => api.get('/schedules')

export const getDetailDirectionApi = (coordinates) => {
  let coordinatesString = ''
  let i = 0
  while (i < coordinates.length) {
    const coordinate = coordinates[i]
    if (Object.keys(coordinate).includes('longitude')) {
      coordinatesString +=
        coordinate.longitude + ',' + coordinate.latitude + ';'
    } else {
      coordinatesString += coordinate.lng + ',' + coordinate.lat + ';'
    }
    i++
  }
  coordinatesString = coordinatesString.slice(0, -1)

  return api.get(
    `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinatesString}?alternatives=true&continue_straight=false&geometries=polyline&language=en&overview=simplified&access_token=${MAPBOX_API_KEY}`
  )
}


export const getLocation = (query) => {
  const url = `https://rsapi.goong.io/geocode?address=${encodeURIComponent(
    query
  )}&api_key=yiOtDspWb1HocRioIwx5awYH85WSm2vEYGo9iTKa`
  return axios.get(url)
}
