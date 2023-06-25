import api from '../services/api1'

// Action đăng ký (register)
export const register = (userData) => {
  return (dispatch) => {
    dispatch({ type: 'REGISTER_REQUEST' })

    api
      .post('/register', userData)
      .then((response) => {
        dispatch({
          type: 'REGISTER_SUCCESS',
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: 'REGISTER_FAILURE',
          payload: error.response.data,
        })
      })
  }
}

// Action đăng nhập (login)
export const login = (userData) => {
  return async (dispatch) => {
    dispatch({ type: 'LOGIN_REQUEST' })

    try {
      const response = await api.post('/auth/login', userData)

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: response.data,
      })
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: error.response.data,
      })
    }
  }
}

// Action đăng xuất (logout)
export const logout = () => {
  return {
    type: 'LOGOUT',
  }
}

export const clearError = () => {
  return {
    type: 'CLEAR_ERROR',
  }
}

export const clearMessage = () => {
  return {
    type: 'CLEAR_MESSAGE',
  }
}
