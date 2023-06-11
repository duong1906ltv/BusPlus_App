import L from 'leaflet'
import axiosClient from '../api/axiosClient.js'
import {
  GET_ALL_ROUTES,
  SET_DIRECTION,
  GET_FORWARD_ROUTE_STATIONS,
  GET_BACKWARD_ROUTE_STATIONS,
  RESET_ROUTE_STATION,
  SET_FOUND_ROUTE,
  SET_SUGGESTED_ROUTE_LIST,
  SET_SELECTED_SUGGESTED_ROUTE,
  SET_MAXIMUM_NUMBER_OF_ROUTE,
} from './types'

const getLatLng = (data) => {
  return L.latLng(data.location.lat, data.location.lng)
}

export const getAllRoutes = () => async (dispatch) => {
  try {
    const res = await axiosClient.get(`/api/routes`)

    res.data.forEach((route) => {
      var index = -1
      route.forwardRoute.forEach((station) => {
        var distance = 0
        ++index
        if (index < route.forwardRoute.length - 1) {
          distance = parseInt(
            getLatLng(station).distanceTo(
              getLatLng(route.forwardRoute[index + 1])
            )
          )
        }
        station.numberBusStop = index
        station.routeNumber = route.routeNumber
        station.distance = distance
      })
      index = -1
      route.backwardRoute.forEach((station) => {
        var distance = 0
        ++index
        if (index < route.backwardRoute.length - 1) {
          distance = parseInt(
            getLatLng(station).distanceTo(
              getLatLng(route.backwardRoute[index + 1])
            )
          )
        }
        station.numberBusStop = index
        station.routeNumber = route.routeNumber
        station.distance = distance
      })
    })
    dispatch({
      type: GET_ALL_ROUTES,
      payload: res.data,
    })
  } catch (err) {
    console.log(err)
  }
}

export const getForwardRouteStations = (routeNumber) => async (dispatch) => {
  try {
    const res = await axiosClient.get(
      `/api/routes/forward-route/${routeNumber}`
    )
    dispatch({
      type: GET_FORWARD_ROUTE_STATIONS,
      payload: res.data,
    })
  } catch (err) {
    console.log(err)
  }
}

export const getBackwardRouteStations = (routeNumber) => async (dispatch) => {
  try {
    const res = await axiosClient.get(
      `/api/routes/backward-route/${routeNumber}`
    )

    dispatch({
      type: GET_BACKWARD_ROUTE_STATIONS,
      payload: res.data,
    })
  } catch (err) {
    console.log(err)
  }
}

export const resetRouteStations = () => async (dispatch) => {
  try {
    dispatch({
      type: RESET_ROUTE_STATION,
      payload: [],
    })
  } catch (err) {
    console.log(err)
  }
}

export const setDirection = (data) => ({
  type: SET_DIRECTION,
  payload: data,
})

export const setFoundRoute = (data) => ({
  type: SET_FOUND_ROUTE,
  payload: data,
})

export const setSuggestedRouteList = (data) => ({
  type: SET_SUGGESTED_ROUTE_LIST,
  payload: data,
})

export const setSuggestedRoute = (data) => ({
  type: SET_SELECTED_SUGGESTED_ROUTE,
  payload: data,
})

export const setMaximumNumOfRoute = (data) => ({
  type: SET_MAXIMUM_NUMBER_OF_ROUTE,
  payload: data,
})
