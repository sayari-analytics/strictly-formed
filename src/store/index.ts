export {
  clearForm,
  updateForm,
  setFormStatus,
  setFieldValue,
} from './redux/actions'

export { CLEAR_FORM, UPDATE_FORM, SET_FORM_STATUS } from './redux/constants'

export {
  getForm,
  getFormError,
  getFormStatus,
  getField,
} from './redux/selectors'

export { formReducer } from './redux/reducer'

import type { FormStateMap } from '~/src/types'
import type { TypedUseSelectorHook } from 'react-redux'
import { useSelector as _useSelector } from 'react-redux'

export const useSelector: TypedUseSelectorHook<FormStateMap> = _useSelector
