import {
  SET_SELECTED_LOCATION,
  SET_SELECTED_BUS_STATION,
} from '../actions/types'

const initialState = {
  defaultLocation: {
    location: {
      lat: 16.0544077,
      lng: 108.2021667,
    },
    zoom: 14,
  },
  selectedLocation: null,
  selectedBusStation: null,
}

function mapReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case SET_SELECTED_LOCATION:
      return {
        ...state,
        selectedLocation: payload,
      }
    case SET_SELECTED_BUS_STATION:
      return {
        ...state,
        selectedBusStation: payload,
      }
    default:
      return state
  }
}
export const selectMap = (state) => state.map
export const selectBusStation = (state) => state.map.selectedBusStation
export default mapReducer
