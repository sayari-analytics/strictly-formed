import { handleInput, createFields, handleSelect } from '~/src/utils/fields'
import { useMemoCompare } from './useMemoCompare'
import { useDispatch } from 'react-redux'
import { useCallback } from 'react'
import {
  useSelector,
  getFormStatus,
  getFormError,
  setField,
  getForm,
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
) => StrictForm<Props> & {
  status: Status
  error: string | undefined
  setInput: (field: InputField, value: string) => void
  setSelected: (field: SelectField, selectedKey?: SelectedKey) => void
} = (formId, fieldProps) => {
  const dispatch = useDispatch()
  const fields = useMemoCompare(() => createFields(fieldProps), [fieldProps])

  const state = useSelector((store) => getForm(store, formId, fields))
  const status = useSelector((store) => getFormStatus(store, formId))
  const error = useSelector((store) => getFormError(store, formId))

  const setInput = useCallback(
    (field: InputField, value: string) => {
      dispatch(
        setField({
          formId,
          name: field.name,
          value: handleInput(field, value),
        })
      )
    },
    [dispatch, formId]
  )

  const setSelected = useCallback(
    (field: SelectField, selectedKey?: SelectedKey) => {
      dispatch(
        setField({
          formId,
          name: field.name,
          value: handleSelect(field, selectedKey),
        })
      )
    },
    [dispatch, formId]
  )

  return {
    ...state,
    status,
    error,
    setInput,
    setSelected,
  }
}
