import { batchClearForms, clearForm, submitFormError } from './actions'
import type { Middleware, MiddlewareAPI, Dispatch } from 'redux'
import { CLEAR_FORM, SUBMIT_FORM } from './constants'
import { FormStateMap } from '~src/types'
import { has } from 'ramda'
import { getForm } from './selectors'

export const formMiddleware: Middleware =
  (store: MiddlewareAPI<Dispatch, FormStateMap>) => (next) => {
    let clearing: Set<string> | undefined

    return (action) => {
      switch (action.type) {
        case CLEAR_FORM:
          if (clearing === undefined) {
            clearing = new Set()
            setTimeout(() => {
              if (clearing && clearing.size > 0) {
                next(batchClearForms({ formIds: clearing }))
              }
              clearing = undefined
            }, 500)
          }

          clearing.add(action.formId)
        case SUBMIT_FORM:
          const onSuccess = clearForm({ formId: action.formId })
          const onError = submitFormError({
            formId: action.formId,
            error: 'submit error',
          })
          if (action.onSubmit !== undefined) {
            const form = getForm(store.getState(), action.formId, {})
            const result = action.onSubmit(form)
            if (has('then', result) && typeof result.then === 'function') {
              result.then(() => next(onSuccess)).catch(() => next(onError))
            } else {
              return next(onSuccess)
            }
          } else {
            next(onSuccess)
          }
      }
      next(action)
    }
  }
