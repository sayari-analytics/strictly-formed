import type { AbstractForm, Status } from '~/src/types'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import {
  clearForm as _clearForm,
  getFormStatus,
  getFormError,
  useSelector,
  setFormStatus,
  setFieldValue,
  updateForm,
  getForm,
} from '~/src/store'

export const useForm = <Form extends AbstractForm>(
  formId: string,
  defaultForm: Form
) => {
  const dispatch = useDispatch()
  const form = useSelector((state) => getForm(state, formId, defaultForm))
  const status = useSelector((state) => getFormStatus(state, formId))
  const error = useSelector((state) => getFormError(state, formId))

  const setField = useCallback(
    <Field extends keyof Form & string, Value extends Form[Field]>(
      field: Field,
      value: Value
    ) => {
      dispatch(setFieldValue({ formId, field, value }))
    },
    [dispatch, formId]
  )

  const setForm = useCallback(
    (changes: Form) => {
      dispatch(updateForm({ formId, form: changes }))
    },
    [dispatch, formId]
  )

  const clearForm = useCallback(() => {
    dispatch(_clearForm({ formId }))
  }, [dispatch, formId])

  const setError = useCallback(
    (error?: string) => {
      dispatch(setFormStatus({ formId, status: 'error', error }))
    },
    [dispatch, formId]
  )

  const setStatus = useCallback(
    (status: Status) => {
      dispatch(setFormStatus({ formId, status }))
    },
    [dispatch, formId]
  )

  return {
    form,
    error,
    status,
    setForm,
    setError,
    setStatus,
    setField,
    clearForm,
  }
}
