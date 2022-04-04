import type { FormStateMap, AbstractForm, Status } from '~/src/types'
import { has, path, pathOr } from 'ramda'

type FormSelector<Result> = <State extends FormStateMap = FormStateMap>(
  state: State,
  formId: string
) => Result

// SELECTORS
export const getForm = <
  Form extends AbstractForm = AbstractForm,
  State extends FormStateMap = FormStateMap
>(
  state: State,
  formId: string,
  defaultForm: Form
): Form => pathOr(defaultForm, ['formState', formId, 'form'], state)

export const getFormStatus: FormSelector<Status> = (state, formId) =>
  pathOr('complete', ['formState', formId, 'status'], state)

export const getFormError: FormSelector<string | undefined> = (state, formId) =>
  path(['formState', formId, 'error'], state)

export const formExists: FormSelector<boolean> = (state, formId) =>
  has(formId, state.formState)
