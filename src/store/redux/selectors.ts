import type { FormStateMap, AbstractForm, Status } from '~/src/types'
import { path, pathOr } from 'ramda'

// SELECTORS
export const getForm = <
  Form extends AbstractForm = AbstractForm,
  State extends FormStateMap = FormStateMap
>(
  state: State,
  formId: string,
  defaultForm: Form
): Form => pathOr(defaultForm, ['formState', formId, 'form'], state)

export const getFormStatus = <State extends FormStateMap = FormStateMap>(
  state: State,
  formId: string
): Status => pathOr('complete', ['formState', formId, 'status'], state)

export const getFormError = <State extends FormStateMap = FormStateMap>(
  state: State,
  formId: string
): string | undefined => path(['formState', formId, 'error'], state)

export const getField = <State extends FormStateMap = FormStateMap>(
  state: State,
  formId: string,
  field: string
) => path([formId, 'form', field], state)
