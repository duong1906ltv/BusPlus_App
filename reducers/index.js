import { combineReducers } from 'redux'
import mapReducer from './map'
import routeReducer from './route'
import busReducer from './bus'
import authReducer from './auth'
import profileReducer from './profile'
import friendReducer from './friend'
import ticketReducer from './ticket'
import checkinReducer from './checkin'
import notiReducer from './noti'

const rootReducer = combineReducers({
  map: mapReducer,
  route: routeReducer,
  bus: busReducer,
  auth: authReducer,
  profile: profileReducer,
  friend: friendReducer,
  ticket: ticketReducer,
  checkin: checkinReducer,
  noti: notiReducer,
})

export default rootReducer
