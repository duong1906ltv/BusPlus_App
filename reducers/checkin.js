const initialState = {
  listFriendCheckIn: [],
  isLoading: false,
  error: null,
}

const checkinReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_FRIEND_CHECK_IN_REQUEST':
      return {
        ...state,
        isLoading: true,
      }
    case 'GET_FRIEND_CHECK_IN_SUCCESS':
      return {
        ...state,
        listFriendCheckIn: action.payload,
        isLoading: false,
      }

    case 'GET_FRIEND_CHECK_IN_FAILURE':
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
      }

    default:
      return state
  }
}

export default checkinReducer
