import type { FormAction } from './actions'
import { dissoc, lensPath, over } from 'ramda'
import { FormData, FormState } from '~/src/types'
import { Reducer } from 'redux'
import {
  COMPLETE,
  CLEAR_FORM,
  SET_FORM,
  SET_FIELD,
  SET_FORM_STATUS,
} from '~/src/utils/constants'

const assocForm = (
  fn: (form: FormData) => FormData,
  state: FormState,
  ...path: string[]
) => over(lensPath(path), fn, state)

export const formReducer: Reducer<FormState, FormAction> = (
  state = {},
  action
) => {
  switch (action.type) {
    case SET_FORM:
      return {
        ...state,
        [action.formId]: {
          status: COMPLETE,
          form: action.form,
        },
      }
    case CLEAR_FORM:
      return dissoc(action.formId, state)
    case SET_FORM_STATUS:
      if (state[action.formId] === undefined) {
        return state
      }

      return assocForm(
        (current) => ({
          ...current,
          status: action.status,
          error: action.error,
        }),
        state,
        action.formId
      )
    case SET_FIELD:
      return assocForm(
        (current) => ({
          status: COMPLETE,
          form: {
            ...(current ? current.form : {}),
            [action.name]: action.value,
          },
        }),
        state,
        action.formId
      )
    default:
      return state
  }
}
