import { useSelector } from 'react-redux'
import api from '../services/api1.js'

import store from '../store.js'
const state = store.getState()
// Action Edit Profile (logout)
export const editProfileButtonClick = () => {
  return {
    type: 'EDIT_PROFILE_CLICK',
  }
}

export const getProfile = () => {
  return (dispatch, getState) => {
    const state = getState()
    dispatch({ type: 'GET_PROFILE_REQUEST' })

    api
      .get(`/profile/${state.auth.user._id}`)
      .then((response) => {
        dispatch({
          type: 'GET_PROFILE_SUCCESS',
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: 'GET_PROFILE_FAILURE',
          payload: response.data,
        })
      })
  }
}
