const initialState = {
  listNoti: [],
  isLoading: false,
  error: null,
}

const notiReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_NOTI_REQUEST':
      return {
        ...state,
        isLoading: true,
      }
    case 'GET_NOTI_SUCCESS':
      return {
        ...state,
        listNoti: action.payload,
        isLoading: false,
      }
    case 'GET_NOTI_FAILURE':
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
      }

    default:
      return state
  }
}

export default notiReducer
