import { useEffect, useRef } from 'react'
import type { Id } from '~/src/types'

const createUseComponentId = () => {
  const _ids = new Set<string>()

  const createId = <Component>(id: string): Id<Component> => {
    if (_ids.has(id)) {
      const error = new Error(`
      strictly-formed | ERROR: "duplicate id"
        the id "${id}" is already in use.
        please use unique ids.
      `)
      // eslint-disable-next-line no-console
      console.error(error.message)
    } else {
      _ids.add(id)
    }
    return id as Id<Component>
  }

  return function useComponentId<Component>(_id: string): Id<Component> {
    const id = useRef<Id<Component>>()

    if (id.current === undefined) {
      id.current = createId<Component>(_id)
    }

    useEffect(() => {
      return () => {
        if (id.current !== undefined) {
          _ids.delete(id.current)
        }
      }
    }, [])

    return id.current
  }
}

export const useComponentId = createUseComponentId()
