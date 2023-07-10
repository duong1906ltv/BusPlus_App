import { Toast } from 'react-native-toast-message/lib/src/Toast.js'
import api from '../services/api1.js'
import { GET_CURRENT_ADMIN_NOTICE } from './types.js'

export const getListNoti = () => {
  return (dispatch, getState) => {
    const state = getState()
    dispatch({ type: 'GET_NOTI_REQUEST' })

    api
      .get(`/noti/${state.auth.user._id}`)
      .then((response) => {
        dispatch({
          type: 'GET_NOTI_SUCCESS',
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: 'GET_NOTI_FAILURE',
          payload: error.response.data,
        })
      })
  }
}

export const getCurrentAdminNotice = () => {
  return (dispatch, getState) => {
    const state = getState()

    api
      .get(`/noti/admin/current`)
      .then((response) => {
        console.log("response.data", response.data);
        dispatch({
          type: GET_CURRENT_ADMIN_NOTICE,
          payload: response.data,
        })
      })
      .catch((error) => {
        console.log("error", error);
      })
  }
}
