import { SET_COMPONENT, CLEAR_COMPONENT } from './actions'
import type { ComponentState } from '~src/types'
import type { AnyAction } from 'redux'

export const componentStateReducer = (
  state: ComponentState = {},
  action: AnyAction
): ComponentState => {
  if (action.type === SET_COMPONENT) {
    return {
      ...state,
      [action.id]: action.value,
    }
  } else if (action.type === CLEAR_COMPONENT) {
    const _state: ComponentState = {}
    for (const id in state) {
      if (id !== action.id) {
        _state[id as keyof typeof state] = state[id as keyof typeof state]
      }
    }
    return _state
  }
  return state
}
