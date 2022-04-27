import type { Id, TextInput, StrictForm } from '~src/types'

export const createId = <Component>(id: string) => id as Id<Component>

export const createInputId = (id: string) => id as Id<TextInput>

export const createFormId = <Form extends object>(id: string) => id as Id<StrictForm<Form>>
