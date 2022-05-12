import { applyMiddleware, combineReducers, createStore } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { ComponentState, ComponentStateAction, componentStateReducer } from '~/src'
import { createUserEpic, reducer as userReducer, UsersState, UsersAction } from './modules/users'
import { composeWithDevTools } from '@redux-devtools/extension'
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
    components: componentStateReducer,
    users: userReducer,
  }),
  composeWithDevTools(applyMiddleware(epicMiddleware))
)

epicMiddleware.run(createUserEpic)
