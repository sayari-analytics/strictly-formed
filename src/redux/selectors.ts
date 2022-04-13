import type { Id, ReduxState } from '~src/types'

export const getComponentState = <Component>(
  state: ReduxState<Component>,
  id: Id<Component>,
  initialState: Component
) => {
  if (state.components[id] === undefined) {
    return initialState
  } else {
    return state.components[id]
  }
}

export const componentStateExists = <Component>(
  state: ReduxState<Component>,
  id: Id<Component>
): boolean => state.components[id] !== undefined
