import { Toast } from 'react-native-toast-message/lib/src/Toast.js'
import api from '../services/api1.js'

export const getListFriend = () => {
  return async (dispatch, getState) => {
    const state = getState()
    dispatch({ type: 'GET_FRIEND_REQUEST' })
    try {
      const response = await api.get(
        `/profile/get-friends/${state.auth.user._id}`
      )

      dispatch({
        type: 'GET_FRIEND_SUCCESS',
        payload: response.data,
      })
    } catch (error) {
      dispatch({
        type: 'GET_FRIEND_FAILURE',
        payload: error.response.data,
      })
    }
  }
}

export const sentFriendRequest = (phone) => {
  return (dispatch, getState) => {
    const state = getState()
    dispatch({ type: 'SEND_FRIEND_INVITE_REQUEST' })
    api
      .post('/profile/send-request', phone, {
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
        },
      })
      .then((response) => {
        Toast.show({
          type: 'success',
          text1: 'SUCCESS',
          text2: response.data.message,
          autoHide: true,
        })
        dispatch({
          type: 'SEND_FRIEND_INVITE_SUCCESS',
        })
      })
      .catch((error) => {
        Toast.show({
          type: 'error',
          text1: 'ERROR',
          text2: error.response.data.error,
          autoHide: true,
        })
        dispatch({
          type: 'SEND_FRIEND_INVITE_FAILURE',
          payload: error.response.data,
        })
      })
  }
}

export const getFriendRequest = () => {
  return (dispatch, getState) => {
    const state = getState()
    dispatch({ type: 'GET_FRIEND_INVITE_REQUEST' })

    api
      .get(`/profile/get-request/${state.auth.user._id}`)
      .then((response) => {
        dispatch({
          type: 'GET_FRIEND_INVITE_SUCCESS',
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: 'GET_FRIEND_INVITE_FAILURE',
          payload: error.response.data,
        })
      })
  }
}

export const acceptRequest = (requestId) => {
  return (dispatch) => {
    dispatch({ type: 'ACCEPT_FRIEND_REQUEST' })

    api
      .post(`/profile/accept-request/${requestId}`)
      .then((response) => {
        Toast.show({
          type: 'success',
          text1: 'SUCCESS',
          text2: 'We are friend now',
          autoHide: true,
        })
        dispatch({
          type: 'ACCEPT_FRIEND_SUCCESS',
          payload: response.data,
        })
      })
      .catch((error) => {
        Toast.show({
          type: 'error',
          text1: 'ERROR',
          text2: error.response.data.error,
          autoHide: true,
        })
      })
  }
}

export const rejectRequest = (requestId) => {
  return (dispatch) => {
    dispatch({ type: 'REJECT_FRIEND_REQUEST' })

    api
      .post(`/profile/reject-request/${requestId}`)
      .then((response) => {
        Toast.show({
          type: 'success',
          text1: 'SUCCESS',
          text2: 'Reject friend successful',
          autoHide: true,
        })
        dispatch({
          type: 'REJECT_FRIEND_SUCCESS',
          payload: response.data,
        })
      })
      .catch((error) => {
        Toast.show({
          type: 'error',
          text1: 'ERROR',
          text2: error.response.data.error,
          autoHide: true,
        })
      })
  }
}

export const freezedFriend = (friendId) => {
  return async (dispatch, getState) => {
    dispatch({ type: 'FREEZE_FRIEND_REQUEST' })
    try {
      const state = getState()
      const response = await api.post(
        `/profile/freeze`,
        {
          userId: friendId,
        },
        {
          headers: {
            Authorization: `Bearer ${state.auth.token}`,
          },
        }
      )
      dispatch({ type: 'FREEZE_FRIEND_SUCCESS', payload: response.data })
    } catch (error) {
      dispatch({ type: 'FREEZE_FRIEND_FAILURE', payload: error.response.data })

      Toast.show({
        type: 'error',
        text1: 'ERROR',
        text2: error.response.data.error,
        autoHide: true,
      })
    }
  }
}

export const activeFriend = (friendId) => {
  return async (dispatch, getState) => {
    dispatch({ type: 'ACTIVE_FRIEND_REQUEST' })

    try {
      const state = getState()
      const response = await api.post(
        `/profile/active`,
        {
          userId: friendId,
        },
        {
          headers: {
            Authorization: `Bearer ${state.auth.token}`,
          },
        }
      )

      dispatch({ type: 'ACTIVE_FRIEND_SUCCESS', payload: response.data })
    } catch (error) {
      console.log(error.response.data.message)
      dispatch({ type: 'ACTIVE_FRIEND_FAILURE', payload: error.response.data })

      Toast.show({
        type: 'error',
        text1: 'ERROR',
        text2: error.response.data.error,
        autoHide: true,
      })
    }
  }
}
