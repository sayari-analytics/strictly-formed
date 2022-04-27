import type { Id, SetHandler, StrictForm, ValidationModel } from '~src/types'
import { componentExists, getComponentState } from '~src/redux/selectors'
import { useCallback, useEffect, useRef } from 'react'
import { clearComponent, setComponent } from '~src/redux/actions'
import { useIdCache, useSelector } from './internal'
import { useDispatch, useStore } from 'react-redux'

type Meta = {
  valid: boolean
  validate(): boolean
  errors: Set<string>
  exists: boolean
}

const getKeys = <Form extends object>(form: Form) => Object.keys(form) as (keyof Form)[]

export const useStrictForm = <Form extends object>(
  _id: Id<StrictForm<Form>>,
  _form: Form,
  _validators: ValidationModel<Form> = {}
): [Form, SetHandler<Form>, Meta] => {
  const dispatch = useDispatch()
  const store = useStore()

  const id = useIdCache(_id)
  const validators = useRef<ValidationModel<Form>>(_validators)
  const init = useRef<StrictForm<Form>>({ form: _form, valid: true, errors: new Set<string>() })
  const exists = useSelector((state) => componentExists(state, id))
  const { form, ...meta } = useSelector((state) => getComponentState(state, id, init.current))

  const set: SetHandler<Form> = useCallback((value) => {
    if (value === undefined) {
      dispatch(clearComponent(id))
    } else {
      const current = getComponentState(store.getState(), id, init.current)
      dispatch(
        setComponent(id, {
          ...current,
          form: value instanceof Function ? value(current.form) : value,
        })
      )
    }
  }, [])

  const validate = useCallback(() => {
    const current = getComponentState(store.getState(), id, init.current)
    const errors = new Set<string>()

    getKeys(current.form).forEach((key) => {
      const e = validators.current[key]?.(current.form[key])
      if (e !== undefined) {
        errors.add(`${key}.${e}`)
      }
    })

    if (errors.size > 0) {
      dispatch(setComponent(id, { ...current, valid: false, errors }))
      return false
    } else if (current.valid === false || current.errors.size > 0) {
      dispatch(setComponent(id, { ...current, valid: true, errors: new Set<string>() }))
    }
    return true
  }, [])

  useEffect(() => {
    return () => {
      if (componentExists(store.getState(), id)) {
        dispatch(clearComponent(id))
      }
    }
  }, [])

  return [form, set, { ...meta, validate, exists }]
}
