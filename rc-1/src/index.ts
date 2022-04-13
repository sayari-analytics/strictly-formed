import { useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { AnyAction } from 'redux'

/**
 * types
 */
declare const idType: unique symbol

export type Id<Component = unknown> = string & { readonly [idType]: Component }

export type ReduxState<Component = unknown> = {
  componentState: State<Component>
}

export type State<Component = unknown> = {
  [id: Id<Component>]: Component | undefined
}

export type SetComponentAction<Component = unknown> = {
  type: typeof SET_COMPONENT
  id: Id<Component>
  value: Component
}

export type ClearComponentAction<Component = unknown> = {
  type: typeof CLEAR_COMPONENT
  id: Id<Component>
}

export type Action<Component = unknown> =
  | SetComponentAction<Component>
  | ClearComponentAction<Component>

/**
 * utils
 */
let _id = 0
export const useId = <Component>(): Id<Component> => {
  const id = useRef<Id<Component>>()

  if (id.current === undefined) {
    id.current = `${_id++}` as Id<Component>
  }

  return id.current
}

/**
 * constants
 */
export const SET_COMPONENT = 'SET_COMPONENT'

export const CLEAR_COMPONENT = 'CLEAR_COMPONENT'

/**
 * selectors
 */
export const getComponent = <Component>(
  state: ReduxState,
  id: Id<Component>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Component | undefined => (state.componentState as any)[id]

/**
 * action creators
 */
export const setComponent = <Component>(
  id: Id<Component>,
  value: Component
): SetComponentAction<Component> => ({ type: SET_COMPONENT, id, value })

export const clearComponent = <Component>(
  id: Id<Component>
): ClearComponentAction<Component> => ({ type: CLEAR_COMPONENT, id })

/**
 * reducer
 */
export const reducer = <Component>(
  state: State<Component>,
  action: AnyAction
) => {
  if (action.type === SET_COMPONENT) {
    return {
      ...state,
      [action.id]: action.value,
    }
  } else if (action.type === CLEAR_COMPONENT) {
    const _state: State<Component> = {}
    for (const id in state) {
      if (id !== action.id) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        _state[id as any] = state[id as any]
      }
    }
    return _state
  }

  return state
}

/**
 * hook
 */
export const useComponentState = <
  Component,
  State extends ReduxState<Component>
>(
  defaultValue: Component
) => {
  const id = useId() as Id<Component>

  const store = useStore<State>()

  const dispatch = useDispatch()

  const state =
    useSelector<State, Component | undefined>((state) =>
      getComponent(state, id)
    ) ?? defaultValue

  const set = useCallback(
    (value: Component | ((state: Component) => Component)) => {
      dispatch(
        value instanceof Function
          ? {
              type: SET_COMPONENT,
              id,
              value: value(getComponent(store.getState(), id) ?? defaultValue),
            }
          : { type: SET_COMPONENT, id, value }
      )
    },
    [defaultValue]
  )

  const clear = useCallback(() => dispatch({ type: CLEAR_COMPONENT, id }), [])

  useEffect(() => {
    return () => {
      if (getComponent(store.getState(), id) !== undefined) {
        clear()
      }
    }
  }, [])

  return { id, state, set, clear }
}
