import type { Id, ReduxState } from '~/src/types'

export const componentExists = <Component>(state: ReduxState<Component>, id: Id<Component>) => {
  return state.components.hasOwnProperty(id)
}

export const getComponent = <Component>(state: ReduxState<Component>, id: Id<Component>) => {
  if (componentExists(state, id)) {
    return state.components[id]
  }
}

export const getComponentState = <Component>(
  state: ReduxState<Component>,
  id: Id<Component>,
  initial: Component
) => {
  if (componentExists(state, id)) {
    return state.components[id]
  } else {
    return initial
  }
}
