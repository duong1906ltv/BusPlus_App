import { SET_SELECTED_LOCATION, SET_SELECTED_BUS_STATION } from './types'

export const setSelectedLocation = (data) => ({
  type: SET_SELECTED_LOCATION,
  payload: data,
})
export const setSelectedBusStation = (data) => ({
  type: SET_SELECTED_BUS_STATION,
  payload: data,
})
