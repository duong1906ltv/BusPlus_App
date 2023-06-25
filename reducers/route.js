import {
  GET_ALL_ROUTES,
  GET_FORWARD_ROUTE_STATIONS,
  GET_BACKWARD_ROUTE_STATIONS,
  SET_DIRECTION,
  RESET_ROUTE_STATION,
  SET_FOUND_ROUTE,
  SET_SUGGESTED_ROUTE_LIST,
  SET_SELECTED_SUGGESTED_ROUTE,
  SET_MAXIMUM_NUMBER_OF_ROUTE,
  SET_PROGRESS,
} from '../actions/types'
import { FORWARD } from '../share/constants/direction'

const initialState = {
  inProgress: false,
  direction: FORWARD,
  routes: [],
  route: {},
  stations: {},
  schedule: {},
  foundRoute: {
    destination: null,
    original: null,
  },
	// foundRoute: { "destination": { "location": { "lat": 16.065846021000027, "lng": 108.19974490600003 }, "name": "120 Điện Biên Phủ, Chính Gián, Thanh Khê, Đà Nẵng", "zoom": 17 }, "original": { "location": { "lat": 16.07359725300006, "lng": 108.14986788200008 }, "name": "54 Nguyễn Lương Bằng, Hòa Khánh Bắc, Liên Chiểu, Đà Nẵng", "zoom": 17 } },
  suggestedRouteList: [],
  suggestedRoute: null,
  maximumNumOfRoute: 1,
}

function routeReducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case GET_ALL_ROUTES:
      return {
        ...state,
        routes: payload,
      }
    case GET_FORWARD_ROUTE_STATIONS:
      return {
        ...state,
        route: payload.route,
        stations: payload.route.forwardRoute,
        schedule: payload.schedule.departureTime,
      }
    case GET_BACKWARD_ROUTE_STATIONS:
      return {
        ...state,
        route: payload.route,
        stations: payload.route.backwardRoute,
        schedule: payload.schedule.arrivalTime,
      }
    case RESET_ROUTE_STATION:
      return {
        ...state,
        route: {},
        stations: {},
        schedule: {},
      }
    case SET_DIRECTION:
      return {
        ...state,
        direction: payload,
      }

    case SET_FOUND_ROUTE:
      return {
        ...state,
        foundRoute: payload,
      }
    case SET_SUGGESTED_ROUTE_LIST:
      return {
        ...state,
        suggestedRouteList: payload,
      }
    case SET_SELECTED_SUGGESTED_ROUTE:
      return {
        ...state,
        suggestedRoute: payload,
      }
    case SET_MAXIMUM_NUMBER_OF_ROUTE:
      return {
        ...state,
        maximumNumOfRoute: payload,
      }
    case  SET_PROGRESS:
      return {
        ...state,
        inProgress: payload,
      }
    default:
      return state
  }
}

export const selectDirection = (state) => state.route.direction
export const selectRoutes = (state) => state.route.routes
export const selectRoute = (state) => state.route.route
export const selectStations = (state) => state.route.stations
export const selectSchedule = (state) => state.route.schedule
export const selectFoundRoute = (state) => state.route.foundRoute
export const selectSuggestedRouteList = (state) =>
  state.route.suggestedRouteList
export const selectSuggestedRoute = (state) => state.route.suggestedRoute
export const selectMaximumNumOfRoute = (state) => state.route.maximumNumOfRoute
export const selectProgress = (state) => state.route.inProgress
export default routeReducer
