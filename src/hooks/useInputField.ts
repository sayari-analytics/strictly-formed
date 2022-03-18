import { useCallback, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from '~src/store'
import { setInputField } from '~src/store/redux/actions'
import { getInputValue } from '~src/store/redux/selectors'

export const useInputField = (formId: string, name: string) => {
  const ref = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()
  const value = useSelector((state) => getInputValue(state, formId, name))

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setInputField({ formId, name, value: event.target.value }))
    },
    [dispatch, formId, name]
  )

  return {
    ref,
    value,
    onChange,
  }
}
