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
  autoFocus?: boolean
}

export type TextInputProps = InputValidators & { value?: string }

type Meta = {
  id: Id<TextInput>
  valid: boolean
  error?: ValidationError
  ref: React.RefObject<HTMLInputElement>
  exists: boolean
}

export type UseTextInputReturn = [
  string,
  SetHandler<string>,
  () => {
    valid: boolean
    error?: ValidationError
  },
  Meta
]

export const handleValidation = (
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
  { value: initial = '', ...props }: TextInputProps = {}
): UseTextInputReturn => {
  const store = useStore()
  const dispatch = useDispatch()
  const ref = useRef<HTMLInputElement>(null)
  const id = useComponentId<TextInput>(_id)
  const validators = useRef<InputValidators>(props)

  const exists = useSelector((state: State) => componentExists(state, id))
  const { value, ...meta } = useSelector((state: State) =>
    getComponentState(state, id, { value: initial, valid: true })
  )

  const set: SetHandler<string> = useCallback(
    (target) => {
      if (target === undefined) {
        dispatch(clearComponent<TextInput>(id))
      } else {
        const current = getComponentState(store.getState(), id, { value: initial, valid: true })
        const _value = target instanceof Function ? target(current.value) : target

        dispatch(setComponent(id, { ...current, value: _value }))
      }
    },
    [initial]
  )

  const validate = useCallback(() => {
    const _value = getComponent(store.getState(), id)?.value || initial
    const valid = handleValidation(_value, validators.current)
    dispatch(setComponent(id, { value: _value, ...valid }))
    return valid
  }, [initial])

  useEffect(() => {
    if (validators.current.autoFocus) {
      if (ref.current) {
        ref.current.focus()
      } else {
        // eslint-disable-next-line no-console
        console.warn(`
        strictly-formed | WARN: "missing ref"
          cannot locate input: "${id}".
          please use the provided "ref" for your input element to enable autoFocus
        `)
      }
    }
    return () => {
      if (componentExists(store.getState(), id)) {
        dispatch(clearComponent<TextInput>(id))
      }
    }
  }, [])

  return [value, set, validate, { id, ref, exists, ...meta }]
}
