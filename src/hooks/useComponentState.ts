import type { Id, ReduxState } from '~/src/types'
import { componentStateExists, getComponentState } from '~src/redux/selectors'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { clearComponent, setComponent } from '~src/redux/actions'
import { useCallback, useEffect } from 'react'
import { useId } from './useId'

export const useComponentState = <Component, State extends ReduxState<Component>>(
  initialState: Component
): [
  Id<Component>,
  Component,
  (value?: Component | ((state: Component) => Component)) => void,
  boolean
] => {
  const id = useId<Component>()
  const store = useStore<State>()
  const dispatch = useDispatch()
  const state = useSelector<State, Component>((state) => getComponentState(state, id, initialState))
  const exists = useSelector<State, boolean>((state) => componentStateExists(state, id))

  const set = useCallback(
    (value?: Component | ((state: Component) => Component)) => {
      if (value === undefined) {
        dispatch(clearComponent<Component>(id))
      } else {
        dispatch(setComponent(id, value instanceof Function ? value(state) : value))
      }
    },
    [dispatch, state, id]
  )

  useEffect(() => {
    return () => {
      if (componentStateExists(store.getState(), id)) {
        dispatch(clearComponent<Component>(id))
      }
    }
  }, [id, store, dispatch])

  return [id, state, set, exists]
}
