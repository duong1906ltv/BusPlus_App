import {
  BUS_STATUS_CHANGED,
  GET_ACTIVE_BUSES,
  LOCATION_CHANGED,
} from '../actions/types'

const initialState = {
  buses: [],
}

function busReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ACTIVE_BUSES:
      const buses = action.payload.bus
      const location = action.payload.location
      const activeBuses = [...state.buses, { ...buses, location: location }]
      return {
        ...state,
        buses: activeBuses,
      }
    case BUS_STATUS_CHANGED:
      // Lấy bus mới từ payload
      const newBus = action.payload.updatedBus
      const currentLocation = action.payload.currentLocation
      // Nếu status là true và chưa tồn tại trong mảng buses, thêm bus mới vào mảng
      if (
        newBus.activeStatus &&
        !state.buses.some((bus) => bus._id === newBus._id)
      ) {
        const updatedBuses = [
          ...state.buses,
          { ...newBus, location: currentLocation },
        ]
        return {
          ...state,
          buses: updatedBuses,
        }
      }
      // Nếu status là false và bus đã tồn tại trong mảng buses, xóa bus khỏi mảng
      if (
        !newBus.activeStatus &&
        state.buses.some((bus) => bus._id === newBus._id)
      ) {
        return {
          ...state,
          buses: state.buses.filter((bus) => bus._id !== newBus._id),
        }
      }
      // Nếu status không thay đổi, trả về state hiện tại
      return state
    case LOCATION_CHANGED:
      // Lấy location mới từ payload
      const newLocation = action.payload
      // Cập nhật vị trí cho bus có id tương ứng với location mới
      const updatedBuses = state.buses.map((bus) => {
        if (bus._id === newLocation.busId) {
          return {
            ...bus,
            location: newLocation,
          }
        }
        return bus
      })
      return {
        ...state,
        buses: updatedBuses,
      }
    default:
      return state
  }
}

export const selectBuses = (state) => state.bus.buses

export default busReducer
