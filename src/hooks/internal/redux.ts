import { useSelector as _useSelector, TypedUseSelectorHook } from 'react-redux'
import type { ReduxState } from '~src/types'

export const useSelector: TypedUseSelectorHook<ReduxState> = _useSelector
