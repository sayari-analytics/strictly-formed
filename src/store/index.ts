import type { FormStateMap } from '~/src/types'
import type { TypedUseSelectorHook } from 'react-redux'
import { useSelector as _useSelector } from 'react-redux'

export const useSelector: TypedUseSelectorHook<FormStateMap> = _useSelector

export type { FormAction } from './redux/actions'
export { clearForm, setForm, setFormStatus, setField } from './redux/actions'

export { formReducer } from './redux/reducer'

export {
  getForm,
  getFormError,
  getFormStatus,
  isFormDirty,
} from './redux/selectors'
