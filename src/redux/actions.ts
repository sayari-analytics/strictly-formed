import type { Id } from '~src/types'

// constants
export const SET_COMPONENT = 'SET_COMPONENT'
export const CLEAR_COMPONENT = 'CLEAR_COMPONENT'

// actions
export type ComponentStateAction = SetComponentAction | ClearComponentAction

export type SetComponentAction<Component = unknown> = {
  type: typeof SET_COMPONENT
  id: Id<Component>
  value: Component
}

export type ClearComponentAction<Component = unknown> = {
  type: typeof CLEAR_COMPONENT
  id: Id<Component>
}

// action creators
export const setComponent = <Component>(
  id: Id<Component>,
  value: Component
): SetComponentAction<Component> => ({ type: SET_COMPONENT, id, value })

export const clearComponent = <Component>(id: Id<Component>): ClearComponentAction<Component> => ({
  type: CLEAR_COMPONENT,
  id,
})
