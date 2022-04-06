import { formReducer } from '~/src'
import { composeWithDevTools } from '@redux-devtools/extension'
import { createStore, combineReducers } from 'redux'

const store = createStore(
  combineReducers({
    formState: formReducer,
  }),
  composeWithDevTools()
)

export default store
