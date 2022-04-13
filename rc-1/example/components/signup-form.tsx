import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useComponentState } from '../../src'
import { createUser } from '../redux/module/users'

export type SignupFormState = {
  name?: string
  vip: boolean
  status: 'complete' | 'pending' | 'error'
  message?: string
}

const DEFAULT_STATE: SignupFormState = {
  name: undefined,
  vip: false,
  status: 'complete',
}

export const SignUpForm = () => {
  const dispatch = useDispatch()

  const { id, state, set, clear } = useComponentState(DEFAULT_STATE)

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

  const submit = useCallback(() => {
    // simple validation
    if (state.name === undefined || state.name === '') {
      set((state) => ({
        ...state,
        status: 'error',
        message: 'Name can not be undefined',
      }))
    } else {
      dispatch(createUser(id, state.name, state.vip))
    }
  }, [dispatch, id, set, state.name, state.vip])

  return (
    <>
      <form onSubmit={submit}>
        <label>
          Name:
          <input
            type='text'
            name='name'
            value={state.name}
            onChange={setName}
          />
        </label>
        <input type='checkbox' id='vip' checked={state.vip} onChange={setVIP} />
        <label htmlFor='vip'>VIP</label>
        <button onClick={clear}>Clear</button>
        {/* disable submit if new user fails validation */}
        <input
          type='submit'
          value='Submit'
          disabled={state.name === undefined || state.name === ''}
        />
      </form>
      {state.status === 'pending' && 'loading...'}
      {state.status === 'error' && state.message}
      {state.status === 'complete' && state.message}
    </>
  )
}
