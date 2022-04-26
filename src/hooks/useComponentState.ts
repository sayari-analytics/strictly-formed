import type { Id, SetHandler } from '~src/types'
import { componentExists, getComponentState } from '~src/redux/selectors'
import { useDispatch, useStore } from 'react-redux'
import { useSelector } from './internal/redux'
import { clearComponent, setComponent } from '~src/redux/actions'
import { useCallback, useEffect } from 'react'
import { useIdCache } from './useIdCache'

export const useComponentState = <Component>(
  _id: Id<Component>,
  initial: Component
): [Component, SetHandler<Component>, boolean] => {
  const store = useStore()
  const dispatch = useDispatch()

  const id = useIdCache(_id)
  const state = useSelector((state) => getComponentState(state, id, initial))
  const exists = useSelector((state) => componentExists(state, id))

  const set: SetHandler<Component> = useCallback(
    (value) => {
      if (value === undefined) {
        dispatch(clearComponent(id))
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
        dispatch(clearComponent(id))
      }
    }
  }, [])

  return [state, set, exists]
}
