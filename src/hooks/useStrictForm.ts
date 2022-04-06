import { handleInput, createFields, handleSelect } from '~/src/utils/fields'
import { useMemoCompare } from './useMemoCompare'
import { useDispatch } from 'react-redux'
import { useCallback } from 'react'
import {
  useSelector,
  isFormDirty,
  getFormStatus,
  getFormError,
  setField,
  getForm,
  setForm,
  setFormStatus,
  clearForm as _clearForm,
} from '~/src/store'
import type {
  InputField,
  FieldProps,
  SelectField,
  SelectedKey,
  StrictForm,
  Status,
} from '~/src/types'

export const useStrictForm: <Props extends FieldProps>(
  formId: string,
  fieldProps: Props
) => {
  form: StrictForm<Props>
  status: Status
  dirty: boolean
  error: string | undefined
  setStatus: (status: Status) => void
  setError: (error: string) => void
  setInput: (field: InputField, value: string) => void
  setSelected: (field: SelectField, selectedKey?: SelectedKey) => void
  clearForm: () => void
} = (formId, fieldProps) => {
  const dispatch = useDispatch()
  const fields = useMemoCompare(() => createFields(fieldProps), [fieldProps])

  const form = useSelector((store) => getForm(store, formId, fields))
  const status = useSelector((store) => getFormStatus(store, formId))
  const error = useSelector((store) => getFormError(store, formId))
  const dirty = useSelector((state) => isFormDirty(state, formId))

  const clearForm = useCallback(() => {
    dispatch(_clearForm({ formId }))
  }, [dispatch, formId])

  const setError = useCallback(
    (error: string) => {
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

  const setInput = useCallback(
    (target: InputField, value: string) => {
      if (dirty) {
        dispatch(
          setField({
            formId,
            name: target.name,
            value: handleInput(target, value),
          })
        )
      } else {
        dispatch(
          setForm({
            formId,
            form: { ...fields, [target.name]: handleInput(target, value) },
          })
        )
      }
    },
    [dispatch, fields, dirty, formId]
  )

  const setSelected = useCallback(
    (target: SelectField, selectedKey?: SelectedKey) => {
      if (dirty) {
        dispatch(
          setField({
            formId,
            name: target.name,
            value: handleSelect(target, selectedKey),
          })
        )
      } else {
        dispatch(
          setForm({
            formId,
            form: {
              ...fields,
              [target.name]: handleSelect(target, selectedKey),
            },
          })
        )
      }
    },
    [dispatch, fields, dirty, formId]
  )

  return {
    form,
    status,
    dirty,
    error,
    setInput,
    setSelected,
    setStatus,
    setError,
    clearForm,
  }
}
