import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useComponentState } from '~/src'
import { updateUser, getUser } from '~/example/redux/modules/users'
import { State } from '~/example/redux/store'

export type Props = { id: string }

export type UserFormState = {
  name?: string
  vip?: boolean
  status: 'complete' | 'pending' | 'error'
  message?: string
}

const DEFAULT_STATE: UserFormState = {
  name: undefined,
  vip: undefined,
  status: 'complete',
}

export const SignUpForm = ({ id: user_id }: Props) => {
  const dispatch = useDispatch()

  const user = useSelector((state: State) => getUser(state, user_id))
  /**
   * if any field is undefined in the form, default to the saved value
   */
  const [{ name, vip, ...form }, set, { id, dirty }] = useComponentState({
    ...DEFAULT_STATE,
    ...user,
  })

  const setName = useCallback(
    ({ target: { value } }) => {
      set((state) => ({ ...state, name: value }))
    },
    [set]
  )

  const setVIP = useCallback(
    ({ target: { checked } }) => {
      set((state) => ({ ...state, vip: checked }))
    },
    [set]
  )

  const clear = useCallback(() => set(), [set])
  const submit = useCallback(() => {
    dispatch(updateUser(id, name, vip))
  }, [dispatch, id, name, vip])

  return (
    <>
      <form onSubmit={submit}>
        <label>
          Name:
          <input type='text' name='name' value={name} onChange={setName} />
        </label>
        <input type='checkbox' id='vip' checked={vip} onChange={setVIP} />
        <label htmlFor='vip'>VIP</label>
        <button onClick={clear}>Clear</button>
        {/* disable submit if form doesn't contain new info */}
        <input type='submit' value='Submit' disabled={!dirty} />
      </form>
      {form.status === 'pending' && 'loading...'}
      {form.status === 'error' && form.message}
      {form.status === 'complete' && form.message}
    </>
  )
}
