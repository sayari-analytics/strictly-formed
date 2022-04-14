import { useRef } from 'react'
import type { Id } from '~/src/types'

const createId = (() => {
  const _ids = new Set<string>()
  return <Component>(id: string): Id<Component> => {
    if (_ids.has(id)) {
      throw Error(`
      strictly-formed | ERROR:
        the id: "${id}" is already in use.
        please use unique ids.
      `)
    } else {
      _ids.add(id)
    }
    return id as Id<Component>
  }
})()

export const useComponentId = <Component>(_id: string): Id<Component> => {
  const id = useRef<Id<Component>>()

  if (id.current === undefined) {
    id.current = createId<Component>(_id)
  }

  return id.current
}
