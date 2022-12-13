import { useSelector as _useSelector, TypedUseSelectorHook } from 'react-redux'
import { useEffect, useRef } from 'react'
import type { Id, ReduxState } from '~src/types'
import cache from '~src/cache'

export const useSelector: TypedUseSelectorHook<ReduxState> = _useSelector

export const useIdCache = <Component>(_id: Id<Component>): Id<Component> => {
  const id = useRef<Id<Component>>()

  if (id.current === undefined) {
    cache.add(_id)
    id.current = _id
  }

  useEffect(() => {
    return () => {
      if (id.current !== undefined) {
        cache.remove(id.current)
      }
    }
  }, [])

  return id.current
}
