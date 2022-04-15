import type { Id, ReduxState } from '~src/types'
import { componentExists, getComponentState } from '~src/redux/selectors'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { clearComponent, setComponent } from '~src/redux/actions'
import { useCallback, useEffect } from 'react'
import { useComponentId } from './useComponentId'

export const useComponentState = <Component, State extends ReduxState<Component>>(
  _id: string,
  initial: Component
): [
  Component,
  (value?: Component | ((state: Component) => Component)) => void,
  { exists: boolean; id: Id<Component> }
] => {
  const id = useComponentId<Component>(_id)
  const store = useStore<State>()
  const dispatch = useDispatch()
  const state = useSelector((state: State) => getComponentState(state, id, initial))
  const exists = useSelector((state: State) => componentExists(state, id))

  const set = useCallback(
    (value?: Component | ((state: Component) => Component)) => {
      if (value === undefined) {
        dispatch(clearComponent<Component>(id))
      } else {
        dispatch(
          setComponent(
            id,
            value instanceof Function
              ? value(getComponentState(store.getState(), id, initial))
              : value
          )
        )
      }
    },
    [initial]
  )

  useEffect(() => {
    return () => {
      if (componentExists(store.getState(), id)) {
        dispatch(clearComponent<Component>(id))
      }
    }
  }, [])

  return [state, set, { id, exists }]
}
