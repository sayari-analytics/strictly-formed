import type { AbstractForm, Status } from '~/src/types'
import type { Action as ReduxAction } from 'redux'
import {
  CLEAR_FORM,
  SET_FORM,
  SET_FORM_STATUS,
  SET_FIELD,
} from '~/src/utils/constants'

export type FormAction =
  | ClearFormAction
  | SetFormAction
  | SetFormStatusAction
  | SetFieldAction

type ActionCreator<Type extends string, Props extends object> = (
  props: Props
) => ReduxAction<Type> & Props

export const createActionCreator =
  <Props extends object, Type extends string>(
    type: Type
  ): ActionCreator<Type, Props> =>
  (props: Props): ReduxAction<Type> & Props =>
    Object.assign({ type }, props)

// ACTIONS
export type ClearFormAction = ReturnType<typeof clearForm>
export const clearForm = createActionCreator<
  { formId: string },
  typeof CLEAR_FORM
>(CLEAR_FORM)

export type SetFormAction = ReturnType<typeof setForm>
export const setForm = createActionCreator<
  { formId: string; form: AbstractForm },
  typeof SET_FORM
>(SET_FORM)

export type SetFormStatusAction = ReturnType<typeof setFormStatus>
export const setFormStatus = createActionCreator<
  { formId: string; status: Status; error?: string },
  typeof SET_FORM_STATUS
>(SET_FORM_STATUS)

export type SetFieldAction = ReturnType<typeof setField>
export const setField = createActionCreator<
  { formId: string; name: string; value: unknown },
  typeof SET_FIELD
>(SET_FIELD)
