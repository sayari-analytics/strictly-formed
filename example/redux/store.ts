import { applyMiddleware, combineReducers, createStore } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { ComponentState, ComponentStateAction, componentStateReducer } from '~/src'
import { createUserEpic, reducer as userReducer, UsersState, UsersAction } from './modules/users'

/**
 * types
 */
export type Action = UsersAction | ComponentStateAction

export type State = {
  components: ComponentState
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