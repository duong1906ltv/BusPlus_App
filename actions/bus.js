import io from 'socket.io-client'
import { GET_ACTIVE_BUSES } from './types'
import axiosClient from '../api/axiosClient'

const socket = io('https://busplus.onrender.com/')

export const startListeningToServer = () => {
  return (dispatch) => {
    // Lắng nghe sự kiện "busChange" từ server thông qua socket
    socket.on('busChange', (data) => {
      // Xử lý dữ liệu nhận được từ server
      dispatch(receiveBusStatusChange(data))
    })
    // Lắng nghe sự kiện "locationChange" từ server thông qua socket
    socket.on('locationChange', (data) => {
      // Xử lý dữ liệu nhận được từ server
      dispatch(receiveLocationChange(data))
    })
  }
}

export const getAllBusActive = () => async (dispatch) => {
  try {
    const res = await axiosClient.get(`/api/buses/active`)

    dispatch({
      type: GET_ACTIVE_BUSES,
      payload: res.data,
    })
  } catch (err) {}
}

export const receiveBusStatusChange = (data) => {
  return {
    type: 'BUS_STATUS_CHANGED',
    payload: data,
  }
}

export const receiveLocationChange = (data) => {
  return {
    type: 'LOCATION_CHANGED',
    payload: data,
  }
}
