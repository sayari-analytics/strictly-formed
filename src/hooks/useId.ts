import { useRef } from 'react'
import type { Id } from '~/src/types'

const createId = (() => {
  let _id = 0
  return <Component>(): Id<Component> => `${_id++}` as Id<Component>
})()

export const useId = <Component>(): Id<Component> => {
  const id = useRef<Id<Component>>()

  if (id.current === undefined) {
    id.current = createId<Component>()
  }

  return id.current
}
