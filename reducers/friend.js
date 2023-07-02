const initialState = {
  listFriend: [],
  isLoading: false,
  error: null,
  request: [],
}

const friendReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SEND_FRIEND_INVITE_REQUEST':
      return {
        ...state,
        isLoading: true,
      }
    case 'SEND_FRIEND_INVITE_SUCCESS':
      return {
        ...state,
        isLoading: false,
      }
    case 'SEND_FRIEND_INVITE_FAILURE':
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
      }
    case 'GET_FRIEND_REQUEST':
      return {
        ...state,
        isLoading: true,
      }
    case 'GET_FRIEND_SUCCESS':
      return {
        ...state,
        listFriend: action.payload,
        isLoading: false,
      }
    case 'GET_FRIEND_FAILURE':
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
      }

    case 'GET_FRIEND_INVITE_REQUEST':
      return {
        ...state,
        isLoading: true,
      }
    case 'GET_FRIEND_INVITE_SUCCESS':
      return {
        ...state,
        request: action.payload,
      }
    case 'GET_FRIEND_INVITE_FAILUTE':
      return {
        ...state,
        error: action.payload.error,
      }

    case 'ACCEPT_FRIEND_REQUEST':
      return {
        ...state,
        isLoading: true,
      }

    case 'REJECT_FRIEND_REQUEST':
      return {
        ...state,
        isLoading: true,
      }

    case 'ACCEPT_FRIEND_SUCCESS':
      return {
        ...state,
        request: action.payload,
      }

    case 'REJECT_FRIEND_SUCCESS':
      return {
        ...state,
        request: action.payload,
      }

    case 'ACTIVE_FRIEND_REQUEST':
      return {
        ...state,
        isLoading: true,
      }

    case 'ACTIVE_FRIEND_SUCCESS':
      return {
        ...state,
        listFriend: action.payload,
        isLoading: false,
      }

    case 'ACTIVE_FRIEND_FAILURE':
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
      }

    case 'FREEZE_FRIEND_REQUEST':
      return {
        ...state,
        isLoading: true,
      }

    case 'FREEZE_FRIEND_SUCCESS':
      return {
        ...state,
        listFriend: action.payload,
        isLoading: false,
      }

    case 'FREEZE_FRIEND_FAILURE':
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
      }

    default:
      return state
  }
}

export default friendReducer
