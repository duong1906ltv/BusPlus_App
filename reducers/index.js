import { combineReducers } from 'redux'
import mapReducer from './map'
import routeReducer from './route'
import busReducer from './bus'
import authReducer from './auth'

const rootReducer = combineReducers({
  map: mapReducer,
  route: routeReducer,
  bus: busReducer,
  auth: authReducer,
})

export default rootReducer
