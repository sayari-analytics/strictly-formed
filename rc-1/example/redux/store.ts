import { applyMiddleware, combineReducers, createStore } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import {
  State as ComponentState,
  Action as ComponentStateAction,
  reducer as componentStateReducer,
} from '../../src'
import {
  createUserEpic,
  reducer as userReducer,
  UsersState,
} from './module/users'
import { UsersAction } from './module/users'

/**
 * types
 */
export type Action = UsersAction | ComponentStateAction

export type State = {
  componentState: ComponentState
  users: UsersState
}

/**
 * store
 */
const epicMiddleware = createEpicMiddleware<Action, Action, State>()

export const store = createStore(
  combineReducers({
    componentState: componentStateReducer,
    users: userReducer,
  }),
  applyMiddleware(epicMiddleware)
)

epicMiddleware.run(createUserEpic)
