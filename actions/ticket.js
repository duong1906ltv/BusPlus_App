import api from '../services/api1.js'

export const getMyTicket = () => {
  return (dispatch, getState) => {
    const state = getState()
    dispatch({ type: 'GET_MY_TICKET_REQUEST' })

    api
      .get(`/ticket/my-ticket/${state.auth.user._id}`)
      .then((response) => {
        dispatch({
          type: 'GET_MY_TICKET_SUCCESS',
          payload: response.data,
        })
      })
      .catch((error) => {
        console.log(error.response.data)

        dispatch({
          type: 'GET_MY_TICKET_FAILURE',
          payload: error.response.data,
        })
      })
  }
}

export const getQRCode = () => {
  return (dispatch, getState) => {
    const state = getState()

    api
      .get(`/ticket/qrcode/${state.auth.user._id}`)
      .then((response) => {
        dispatch({
          type: 'QR_CODE',
          payload: response.data,
        })
      })
      .catch((error) => {
        console.log(error.response.data)
      })
  }
}
