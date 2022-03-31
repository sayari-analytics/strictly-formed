import type { AbstractForm, Status } from '~/src/types'
import type { Action as ReduxAction } from 'redux'
import {
  CLEAR_FORM,
  UPDATE_FORM,
  SET_FORM_STATUS,
  SET_FIELD_VALUE,
} from './constants'

export type FormAction =
  | ClearFormAction
  | UpdateFormAction
  | SetFormStatusAction
  | SetFieldValueAction

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

export type UpdateFormAction = ReturnType<typeof updateForm>
export const updateForm = createActionCreator<
  { formId: string; form: AbstractForm },
  typeof UPDATE_FORM
>(UPDATE_FORM)

export type SetFormStatusAction = ReturnType<typeof setFormStatus>
export const setFormStatus = createActionCreator<
  { formId: string; status: Status; error?: string },
  typeof SET_FORM_STATUS
>(SET_FORM_STATUS)

export type SetFieldValueAction = ReturnType<typeof setFieldValue>
export const setFieldValue = createActionCreator<
  { formId: string; field: string; value: unknown },
  typeof SET_FIELD_VALUE
>(SET_FIELD_VALUE)
