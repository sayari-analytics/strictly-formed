import type { Id, ReduxState } from '~/src/types'
import { componentExists, getComponentState } from '~src/redux/selectors'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { clearComponent, setComponent } from '~src/redux/actions'
import { useCallback, useEffect } from 'react'
import { useComponentId } from './useComponentId'

export const useComponentState = <Component, State extends ReduxState<Component>>(
  initialState: Component,
  componentId?: string
): [
  Component,
  (value?: Component | ((state: Component) => Component)) => void,
  { dirty: boolean; id: Id<Component> }
] => {
  const id = useComponentId<Component>(componentId)
  const store = useStore<State>()
  const dispatch = useDispatch()
  const state = useSelector<State, Component>((state) => getComponentState(state, id, initialState))
  const exists = useSelector<State, boolean>((state) => componentExists(state, id))

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
      if (componentExists(store.getState(), id)) {
        dispatch(clearComponent<Component>(id))
      }
    }
  }, [id, store, dispatch])

  return [state, set, { id, dirty: !exists }]
}
