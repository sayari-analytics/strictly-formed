export {
  clearForm,
  submitForm,
  updateForm,
  submitFormError,
  submitFormSuccess,
} from './redux/actions'

export {
  CLEAR_FORM,
  UPDATE_FORM,
  SUBMIT_FORM,
  SUBMIT_FORM_ERROR,
  SUBMIT_FORM_SUCCESS,
} from './redux/constants'

export { getForm, getFormError, getFormStatus } from './redux/selectors'

export { formMiddleware } from './redux/middleware'

export { formReducer } from './redux/reducer'

import type { FormStateMap } from '~/src/types'
import type { TypedUseSelectorHook } from 'react-redux'
import { useSelector as _useSelector } from 'react-redux'

export const useSelector: TypedUseSelectorHook<FormStateMap> = _useSelector
