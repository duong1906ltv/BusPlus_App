import { Toast } from 'react-native-toast-message/lib/src/Toast.js'
import api from '../services/api1.js'

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
