import type { FormStateMap, AbstractForm } from '~/src/types'
import { path, pathOr } from 'ramda'

// SELECTORS
export const getForm = <
  State extends FormStateMap = FormStateMap,
  Form extends AbstractForm = AbstractForm
>(
  state: State,
  formId: string,
  defaultForm: Form
) => {
  if (state.formState[formId] === undefined) {
    return defaultForm
  } else {
    return Object.entries(state.formState[formId].fields).reduce<AbstractForm>(
      (acc, [name, field]) => {
        acc[name] = field.value
        return acc
      },
      {}
    ) as Form
  }
}

export const getFormStatus = <State extends FormStateMap = FormStateMap>(
  state: State,
  formId: string
) => pathOr('complete', ['formState', formId, 'status'], state)

export const getFormError = <State extends FormStateMap = FormStateMap>(
  state: State,
  formId: string
): string | undefined => path(['formState', formId, 'error'], state)

export const getInputValue = <State extends FormStateMap = FormStateMap>(
  state: State,
  formId: string,
  name: string
) => {
  const form = state.formState[formId]
  if (form === undefined || form.fields[name] === undefined) {
    return ''
  }
  return form.fields[name].value
}
