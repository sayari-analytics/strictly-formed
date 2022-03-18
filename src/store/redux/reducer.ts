import type { FormAction } from './actions'
import type { Reducer } from 'redux'
import type { FormData, FormState } from '~/src/types'
import { assocPath } from '~/src/utils'
import { assoc, dissoc, omit } from 'ramda'
import {
  CLEAR_FORM,
  SUBMIT_FORM,
  UPDATE_FORM,
  SET_INPUT_VALUE,
  SUBMIT_FORM_ERROR,
  COMPLETE,
  PENDING,
  ERROR,
  BATCH_CLEAR,
} from './constants'

// REDUCER
export const formReducer: Reducer<FormState, FormAction> = (
  state = {},
  action
) => {
  switch (action.type) {
    case UPDATE_FORM:
      if (state[action.formId] === undefined) {
        return {
          ...state,
          [action.formId]: {
            status: COMPLETE,
            fields: Object.entries(action.form).reduce<FormData['fields']>(
              (acc, [key, value]) => assoc(key, { value }, acc),
              {}
            ),
          },
        }
      }
      return assocPath(
        (current) => ({
          ...current,
          status: COMPLETE,
          fields: Object.entries(action.form).reduce<FormData['fields']>(
            (acc, [key, value]) => {
              if (acc[key] === undefined) {
                acc[key] = { value }
              } else {
                acc[key].value = value
              }
              return acc
            },
            current.fields
          ),
        }),
        state,
        action.formId
      )
    case CLEAR_FORM:
      return dissoc(action.formId, state)
    case BATCH_CLEAR:
      return omit(Array.from(action.formIds), state)
    case SUBMIT_FORM:
      if (state[action.formId] === undefined) {
        return state
      }

      return assocPath(
        (current) => ({
          ...current,
          status: PENDING,
        }),
        state,
        action.formId
      )
    case SUBMIT_FORM_ERROR:
      if (state[action.formId] === undefined) {
        return state
      }
      return assocPath(
        (current) => ({
          ...current,
          status: ERROR,
          error: action.error,
        }),
        state,
        action.formId
      )
    case SET_INPUT_VALUE:
      const fields = {
        [action.name]: {
          type: 'input',
          value: action.value,
        },
      }
      if (state[action.formId] === undefined) {
        return {
          ...state,
          [action.formId]: {
            fields,
            status: COMPLETE,
          },
        }
      }
      return assocPath(
        (current) => ({
          ...current,
          fields: {
            ...current.fields,
            ...fields,
          },
        }),
        state,
        action.formId
      )
    default:
      return state
  }
}
