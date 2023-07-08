import api from '../services/api1.js'

export const getFriendsCheckInStatus = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'GET_FRIEND_CHECK_IN_REQUEST' })
    const state = getState()

    api
      .get(`/checkin/friends/checkin/${state.auth.user._id}`)
      .then((response) => {
        dispatch({
          type: 'GET_FRIEND_CHECK_IN_SUCCESS',
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: 'GET_FRIEND_CHECK_IN_FAILURE',
          payload: error.response.data,
        })
      })
  }
}
