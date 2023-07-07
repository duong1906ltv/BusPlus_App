import { CREATE_TRANSACTION_FAILURE, CREATE_TRANSACTION_REQUEST, CREATE_TRANSACTION_SUCCESS } from "../actions/types"

const initialState = {
  transactions : []
}

const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TRANSACTION_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case CREATE_TRANSACTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case CREATE_TRANSACTION_FAILURE:
      return {
        ...state,
        isLoading: false,
      }

    default:
      return state
  }
}



export default transactionReducer
