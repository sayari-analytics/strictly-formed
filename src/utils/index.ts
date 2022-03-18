import { lensPath, over } from 'ramda'
import type { Action as ReduxAction } from 'redux'
import type { O } from 'ts-toolbelt'

type ActionCreator<Type extends string, Props extends object> = (
  props: Props
) => ReduxAction<Type> & Props

export const createActionCreator =
  <Props extends object, Type extends string>(
    type: Type
  ): ActionCreator<Type, Props> =>
  (props: Props): ReduxAction<Type> & Props =>
    Object.assign({ type }, props)

export const assocPath = <
  T extends object,
  P extends string[],
  V extends O.Path<T, P>
>(
  fn: (current: V) => V,
  value: T,
  ...path: P
): T => over(lensPath(path), fn, value)

export const uniqueFormId = (formIds: Set<string>): string => {
  const id = `form_${Math.floor(Math.random() * 1000)}`

  if (formIds.has(id)) {
    return uniqueFormId(formIds)
  }

  return id
}
