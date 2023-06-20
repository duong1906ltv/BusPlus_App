// import L from 'leaflet'
// import { calculateDrivingDistance } from '../services/api';
import { API_BASE_URL, MAPBOX_API_KEY } from '@env'
import api from '../services/api1'
import { getDistance } from 'geolib';
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
  SET_PROGRESS,
} from './types'
export const calculateDistance = (_origin, _destination) => {
  const origin = {
    latitude: _origin.lat,
    longitude: _origin.lng,
  }
  const destination = {
    latitude: _destination.lat,
    longitude: _destination.lng,
  }
  const meters = getDistance(origin, destination);
  return meters
};


export const getAllRoutes = () => async (dispatch) => {
  try {
    const res = await api.get(`/routes`);
    res.data.forEach((route) => {
      var index = -1
      route.forwardRoute.forEach(async (station) => {
        var distance = 0
        ++index
        
        if (index < route.forwardRoute.length - 1) {
          distance = calculateDistance(station.location, route.forwardRoute[index + 1].location)
          station.distance = distance
          station.numberBusStop = index
          station.routeNumber = route.routeNumber
          station.location = {
            latitude: station.location.lat,
            longitude: station.location.lng,
          }
        }
      });
      index = -1
      route.backwardRoute.forEach(async (station) => {
        var distance = 0
        ++index
        
        if (index < route.backwardRoute.length - 1) {
          distance = calculateDistance(station.location, route.backwardRoute[index + 1].location)
          station.distance = distance
          station.numberBusStop = index
          station.routeNumber = route.routeNumber
          station.location = {
            latitude: station.location.lat,
            longitude: station.location.lng,
          }
          
        }
      });
    });
    dispatch({
      type: GET_ALL_ROUTES,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getForwardRouteStations = (routeNumber) => async (dispatch) => {
  try {
    const res = await api.get(
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
    const res = await api.get(
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
export const setProgress = (data) => ({
  type: SET_PROGRESS,
  payload: data,
})
