import { useSelector as _useSelector, TypedUseSelectorHook } from 'react-redux'
import { useEffect, useRef } from 'react'
import type { Id, ReduxState } from '~src/types'

export const createIdCache = () => {
  const cache = new Set<Id>()

  const cacheId = <Component>(id: Id<Component>) => {
    if (cache.has(id)) {
      const error = new Error(`
      strictly-formed | ERROR: "duplicate id"
        the id "${id}" is already in use.
        please use unique ids.
      `)
      // eslint-disable-next-line no-console
      console.error(error.message)
    } else {
      cache.add(id)
    }
  }

  return function useIdCache<Component>(_id: Id<Component>): Id<Component> {
    const id = useRef<Id<Component>>()

    if (id.current === undefined) {
      cacheId(_id)
      id.current = _id
    }

    useEffect(() => {
      return () => {
        if (id.current !== undefined) {
          cache.delete(id.current)
        }
      }
    }, [])

    return id.current
  }
}

export const useIdCache = createIdCache()
export const useSelector: TypedUseSelectorHook<ReduxState> = _useSelector
