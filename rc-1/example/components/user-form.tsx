import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useComponentState } from '../../src'
import { updateUser, getUser } from '../redux/module/users'
import { State } from '../redux/store'

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

  const { id, state, set, clear } = useComponentState(DEFAULT_STATE)

  const user = useSelector<State, { name: string; vip: boolean }>((state) =>
    getUser(state, user_id)
  )

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

  /**
   * if any field is undefined in the form, default to the saved value
   */
  const nameField = state.name ?? user.name
  const vipField = state.vip ?? user.vip

  const submit = useCallback(() => {
    dispatch(updateUser(id, nameField, vipField))
  }, [dispatch, id, nameField, vipField])

  return (
    <>
      <form onSubmit={submit}>
        <label>
          Name:
          <input type='text' name='name' value={nameField} onChange={setName} />
        </label>
        <input
          type='checkbox'
          id='vip'
          checked={state.vip ?? user.vip}
          onChange={setVIP}
        />
        <label htmlFor='vip'>VIP</label>
        <button onClick={clear}>Clear</button>
        {/* disable submit if form doesn't contain new info */}
        <input
          type='submit'
          value='Submit'
          disabled={nameField === user.name && vipField === user.vip}
        />
      </form>
      {state.status === 'pending' && 'loading...'}
      {state.status === 'error' && state.message}
      {state.status === 'complete' && state.message}
    </>
  )
}
