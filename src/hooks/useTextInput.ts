import type { Id, ReduxState } from '~src/types'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { clearComponent, setComponent } from '~src/redux/actions'
import { getComponentState } from '~src/redux/selectors'
import { useComponentId } from './useComponentId'
import { useCallback } from 'react'

export type TextInputProps = {
  value?: string
  pattern?: RegExp
  required?: boolean
  length?: [number, number]
}

export const useTextInput = <State extends ReduxState<string>>(
  _id: string,
  { value: initial = '', length: [min, max] = [0, Infinity], required, pattern }: TextInputProps
): [
  string,
  (value?: string | ((value: string) => string)) => void,
  {
    id: Id<string>
    valid: boolean
    error?: 'required' | 'minlength' | 'maxlength' | 'pattern'
  }
] => {
  const store = useStore()
  const dispatch = useDispatch()
  const id = useComponentId<string>(_id)
  const value = useSelector((state: State) => getComponentState(state, id, initial))

  const set = useCallback(
    (target?: string | ((value: string) => string)) => {
      if (target === undefined) {
        dispatch(clearComponent<string>(id))
      } else {
        dispatch(
          setComponent(
            id,
            target instanceof Function
              ? target(getComponentState(store.getState(), id, initial))
              : target
          )
        )
      }
    },
    [initial]
  )

  return [
    value,
    set,
    {
      id,
      ...(value === '' && required
        ? { valid: false, error: 'required' }
        : value.length < min
        ? { valid: false, error: 'minlength' }
        : value.length > max
        ? { valid: false, error: 'maxlength' }
        : pattern && !pattern.test(value)
        ? { valid: false, error: 'pattern' }
        : { valid: true }),
    },
  ]
}
