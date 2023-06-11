import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const middleware = [thunk]

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store
