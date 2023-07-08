import api from '../services/api1.js'
import { CREATE_TRANSACTION_FAILURE, CREATE_TRANSACTION_REQUEST, CREATE_TRANSACTION_SUCCESS } from './types.js'
export const createTransaction = (data) => async (dispatch, getState) => {
  const state = getState()
  dispatch({
    type: CREATE_TRANSACTION_REQUEST,
  });
  try {
    await api.post('/transactions', data, {
            headers: {
              Authorization: `Bearer ${state.auth.token}`,
            },
          })
    dispatch({
      type: CREATE_TRANSACTION_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: CREATE_TRANSACTION_FAILURE,
    })
  }
};

