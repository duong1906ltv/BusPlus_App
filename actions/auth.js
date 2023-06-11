// import api from '../services/api'
import { API_BASE_URL, MAPBOX_API_KEY } from '@env'

import axios from 'axios'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

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
  return (dispatch) => {
    dispatch({ type: 'LOGIN_REQUEST' })

    api
      .post('/auth/login', userData)
      .then((response) => {
        console.log(response.data)
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: response.data,
        })
      })
      .catch((error) => {
        console.log(error)
        dispatch({
          type: 'LOGIN_FAILURE',
          payload: error.response.data,
        })
      })
  }
}

// Action đăng xuất (logout)
export const logout = () => {
  return {
    type: 'LOGOUT',
  }
}
