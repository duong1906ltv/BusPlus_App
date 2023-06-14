import { combineReducers } from 'redux'
import mapReducer from './map'
import routeReducer from './route'
import busReducer from './bus'
import authReducer from './auth'
import profileReducer from './profile'

const rootReducer = combineReducers({
  map: mapReducer,
  route: routeReducer,
  bus: busReducer,
  auth: authReducer,
  profile: profileReducer,
})

export default rootReducer
