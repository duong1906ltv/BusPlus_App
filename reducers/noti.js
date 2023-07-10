import { GET_CURRENT_ADMIN_NOTICE } from "../actions/types"

const initialState = {
  listNoti: [],
  currentNotices: [],
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
    case GET_CURRENT_ADMIN_NOTICE:
      return {
        ...state,
        currentNotices: action.payload,
        isLoading: false,
      }
    default:
      return state
  }
}

export const selectCurrentNotice = (state) => state.noti.currentNotices


export default notiReducer
