const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isEditing: false,
  error: null,
  // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDg5MjMzODk5MzEzMzZlZmJmNDc2NjIiLCJpYXQiOjE2ODg3MTQ2MDcsImV4cCI6MTY4ODgwMTAwN30.6vvCgbT2cvYjOIQLi6PhaaNQCKH6JRO_-7-TeH2wFH4",
  token: null,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REGISTER_REQUEST':
    case 'LOGIN_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    case 'REGISTER_SUCCESS':
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
        token: action.payload.token,
      }
    case 'REGISTER_FAILURE':
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload.error,
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        token: null,
        error: null,
      }
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      }

    default:
      return state
  }
}

export const selectUser = (state) => state.auth.user

export default authReducer
