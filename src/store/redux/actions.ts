import { createActionCreator } from '~/src/utils'
import type { AbstractForm } from '~/src/types'
import {
  CLEAR_FORM,
  UPDATE_FORM,
  SUBMIT_FORM,
  SUBMIT_FORM_ERROR,
  BATCH_CLEAR,
  SET_INPUT_VALUE,
} from './constants'

export type FormAction =
  | ClearFormAction
  | SubmitFormAction
  | UpdateFormAction
  | SubmitFormErrorAction
  | BatchClearFormsAction
  | SetInputFieldAction

// ACTIONS
export type ClearFormAction = ReturnType<typeof clearForm>
export const clearForm = createActionCreator<
  { formId: string },
  typeof CLEAR_FORM
>(CLEAR_FORM)

export type BatchClearFormsAction = ReturnType<typeof batchClearForms>
export const batchClearForms = createActionCreator<
  { formIds: Set<string> },
  typeof BATCH_CLEAR
>(BATCH_CLEAR)

export type UpdateFormAction = ReturnType<typeof updateForm>
export const updateForm = createActionCreator<
  { formId: string; form: AbstractForm },
  typeof UPDATE_FORM
>(UPDATE_FORM)

export type SubmitFormAction = ReturnType<typeof submitForm>
export const submitForm = createActionCreator<
  {
    formId: string
    onSubmit?: <Form extends AbstractForm>(form: Form) => unknown
  },
  typeof SUBMIT_FORM
>(SUBMIT_FORM)

export type SubmitFormErrorAction = ReturnType<typeof submitFormError>
export const submitFormError = createActionCreator<
  { formId: string; error: string },
  typeof SUBMIT_FORM_ERROR
>(SUBMIT_FORM_ERROR)

export type SetInputFieldAction = ReturnType<typeof setInputField>
export const setInputField = createActionCreator<
  { formId: string; name: string; value: string | number },
  typeof SET_INPUT_VALUE
>(SET_INPUT_VALUE)
