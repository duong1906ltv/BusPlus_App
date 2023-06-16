const initialState = {
  myTicket: [],
  isLoading: false,
  error: null,
  qrCode: null,
}

const ticketReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_MY_TICKET_REQUEST':
      return {
        ...state,
        isLoading: true,
      }
    case 'GET_MY_TICKET_SUCCESS':
      return {
        ...state,
        myTicket: action.payload,
        isLoading: false,
      }
    case 'GET_MY_TICKET_FAILURE':
      return {
        ...state,
        isLoading: false,
      }
    case 'QR_CODE':
      return {
        ...state,
        qrCode: action.payload,
      }

    default:
      return state
  }
}

export default ticketReducer
