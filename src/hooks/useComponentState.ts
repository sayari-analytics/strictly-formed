import type { Id, SetHandler } from '~src/types'
import { componentExists, getComponentState } from '~src/redux/selectors'
import { clearComponent, setComponent } from '~src/redux/actions'
import { useSelector, useIdCache } from './internal'
import { useCallback, useEffect } from 'react'
import { useDispatch, useStore } from 'react-redux'

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
