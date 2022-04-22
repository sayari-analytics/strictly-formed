import type { Id, ReduxState, SetHandler, TextInput, ValidationError } from '~src/types'
import { componentExists, getComponent, getComponentState } from '~src/redux/selectors'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { clearComponent, setComponent } from '~src/redux/actions'
import { useCallback, useEffect, useRef } from 'react'
import { useComponentId } from './useComponentId'

export type InputValidators = {
  pattern?: RegExp
  required?: boolean
  length?: [number, number]
  autofocus?: boolean
}

export type TextInputProps = InputValidators & { value?: string }

type Meta = {
  id: Id<TextInput>
  valid: boolean
  error?: ValidationError
  ref: React.MutableRefObject<HTMLInputElement | undefined>
}

const validate = (
  value: string,
  { length: [min, max] = [0, Infinity], required, pattern }: InputValidators
): {
  valid: boolean
  error?: ValidationError
} => {
  return value === '' && required
    ? { valid: false, error: 'required' }
    : value.length < min
    ? { valid: false, error: 'minlength' }
    : value.length > max
    ? { valid: false, error: 'maxlength' }
    : pattern && !pattern.test(value)
    ? { valid: false, error: 'pattern' }
    : { valid: true }
}

export const useTextInput = <State extends ReduxState<TextInput>>(
  _id: string,
  { value: initial = '', ...props }: TextInputProps
): [string, SetHandler<string>, Meta] => {
  const store = useStore()
  const dispatch = useDispatch()
  const ref = useRef<HTMLInputElement>()
  const id = useComponentId<TextInput>(_id)
  const validators = useRef<InputValidators>(props)

  const { value, ...meta } = useSelector((state: State) =>
    getComponentState(state, id, { value: initial, valid: true })
  )

  const set: SetHandler<string> = useCallback(
    (target) => {
      if (target === undefined) {
        dispatch(clearComponent<TextInput>(id))
      } else {
        const _value =
          target instanceof Function
            ? target(getComponent(store.getState(), id)?.value || initial)
            : target

        dispatch(
          setComponent(id, {
            value: _value,
            ...validate(_value, validators.current),
          })
        )
      }
    },
    [initial]
  )

  useEffect(() => {
    if (validators.current.autofocus && ref.current) {
      ref.current.focus()
    }
    return () => {
      if (componentExists(store.getState(), id)) {
        dispatch(clearComponent<TextInput>(id))
      }
    }
  }, [])

  return [value, set, { id, ref, ...meta }]
}
