import { GET_TICKET_TYPE_FAILURE, GET_TICKET_TYPE_REQUEST, GET_TICKET_TYPE_SUCCESS } from "../actions/types"

const initialState = {
  ticketTypes : []
}

const ticketTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TICKET_TYPE_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case GET_TICKET_TYPE_SUCCESS:
      return {
        ...state,
        ticketTypes: action.payload,
        isLoading: false,
      }
    case GET_TICKET_TYPE_FAILURE:
      return {
        ...state,
        isLoading: false,
      }

    default:
      return state
  }
}

export const selectTicketType = (state) => state.ticketType.ticketTypes


export default ticketTypeReducer
