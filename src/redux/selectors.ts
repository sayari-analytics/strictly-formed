import type { Id, ReduxState } from '~src/types'

export const componentExists = <Component, State extends ReduxState = ReduxState>(
  state: State,
  id: Id<Component>
) => {
  return state.components.hasOwnProperty(id)
}

export const getComponent = <Component, State extends ReduxState = ReduxState>(
  state: State,
  id: Id<Component>
) => {
  if (componentExists(state, id)) {
    return state.components[id] as Component
  }
}

export const getComponentState = <Component, State extends ReduxState = ReduxState>(
  state: State,
  id: Id<Component>,
  initial: Component
): Component => {
  if (componentExists(state, id)) {
    return state.components[id] as Component
  } else {
    return initial
  }
}
