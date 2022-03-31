import { createStore, compose, combineReducers } from 'redux'
import { formReducer } from '../../../src/index'

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  combineReducers({
    formState: formReducer,
  }),
  composeEnhancers()
)

export default store
