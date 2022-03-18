import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { formReducer, formMiddleware } from '../../../src/index'

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  combineReducers({
    formState: formReducer,
  }),
  composeEnhancers(applyMiddleware(formMiddleware))
)

export default store
