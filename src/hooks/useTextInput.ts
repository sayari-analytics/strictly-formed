import type { Id, SetHandler, TextInput, ValidationError } from '~src/types'
import { componentExists, getComponentState } from '~src/redux/selectors'
import { useDispatch, useStore } from 'react-redux'
import { useSelector, useIdCache } from './internal'
import { clearComponent, setComponent } from '~src/redux/actions'
import { useCallback, useEffect, useRef } from 'react'

export type InputValidators = {
  pattern?: RegExp
  required?: boolean
  length?: [number, number]
  autoFocus?: boolean
}

export type TextInputProps = InputValidators & { value?: string }

export type Meta = {
  ref: React.RefObject<HTMLInputElement>
  valid: boolean
  exists: boolean
  validate: () => boolean
  error?: ValidationError
}

export type UseTextInputReturn = [string, SetHandler<string>, Meta]

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

export const useTextInput = (
  _id: Id<TextInput>,
  { value: initial = '', ...props }: TextInputProps = {}
): UseTextInputReturn => {
  const store = useStore()
  const dispatch = useDispatch()
  const ref = useRef<HTMLInputElement>(null)
  const id = useIdCache(_id)
  const validators = useRef<InputValidators>(props)
  const exists = useSelector((state) => componentExists(state, id))
  const { value, ...meta } = useSelector((state) =>
    getComponentState(state, id, { value: initial, valid: true })
  )

  const set: SetHandler<string> = useCallback(
    (target) => {
      if (target === undefined) {
        dispatch(clearComponent(id))
      } else {
        const current = getComponentState(store.getState(), id, { value: initial, valid: true })
        const _value = target instanceof Function ? target(current.value) : target

        dispatch(setComponent(id, { ...current, value: _value }))
      }
    },
    [initial]
  )

  const validate = useCallback(() => {
    const current = getComponentState(store.getState(), id, { value: initial, valid: true })
    const result = handleValidation(current.value, validators.current)
    dispatch(setComponent(id, { value: current.value, ...result }))
    return result.valid
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
        dispatch(clearComponent(id))
      }
    }
  }, [])

  return [value, set, { ref, exists, validate, ...meta }]
}
