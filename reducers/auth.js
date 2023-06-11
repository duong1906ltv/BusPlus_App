const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REGISTER_REQUEST':
    case 'LOGIN_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'REGISTER_SUCCESS':
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        loading: false,
        error: null,
      }
    case 'REGISTER_FAILURE':
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload.error,
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      }
    default:
      return state
  }
}

export default authReducer
