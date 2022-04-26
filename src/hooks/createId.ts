import { Id } from '~src/types'

export const createId = <Component>(id: string) => id as Id<Component>
