import type { AbstractForm } from '~/src/types'
import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  getFormStatus,
  getFormError,
  useSelector,
  updateForm,
  submitForm,
  clearForm,
  getForm,
} from '~/src/store'

export interface UseFormProps<Form extends AbstractForm> {
  formId: string
  defaultForm: Form
  onSubmit?: (form: AbstractForm) => Promise<unknown>
}

export const useForm = <Form extends AbstractForm>({
  formId,
  defaultForm,
  onSubmit,
}: UseFormProps<Form>) => {
  const dispatch = useDispatch()
  const form = useSelector((state) => getForm(state, formId, defaultForm))
  const status = useSelector((state) => getFormStatus(state, formId))
  const error = useSelector((state) => getFormError(state, formId))

  useEffect(() => {
    return () => {
      dispatch(clearForm({ formId }))
    }
  }, [dispatch, formId])

  const submit = useCallback(
    <Event extends React.SyntheticEvent>(event?: Event) => {
      event?.preventDefault()
      dispatch(submitForm({ formId, onSubmit }))
    },
    [dispatch, formId, onSubmit]
  )

  const setForm = useCallback(
    (changes: Form) => {
      dispatch(updateForm({ formId, form: changes }))
    },
    [dispatch, formId]
  )

  return {
    form,
    error,
    status,
    submit,
    setForm,
  }
}
