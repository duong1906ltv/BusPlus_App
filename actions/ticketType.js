import api from '../services/api1.js'
import { GET_TICKET_TYPE_FAILURE, GET_TICKET_TYPE_REQUEST, GET_TICKET_TYPE_SUCCESS } from './types.js'
export const getAllTicketType = () => async (dispatch) => {
  dispatch({
    type: GET_TICKET_TYPE_REQUEST,
  });
  try {
    const response = await api.get(`/ticket-type`);
    dispatch({
      type: GET_TICKET_TYPE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_MY_TICKET_FAILURE,
      payload: error.response.data,
    })
  }
};

