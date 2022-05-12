import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createId, useComponentState } from '~/src'
import { updateUser, getUser } from '~/example/redux/modules/users'
import { State } from '~/example/redux/store'
import { Button, FlexRow, Form, Input, Label } from './styled'

export type Props = { id: string }

export type UserFormState = {
  name: string
  vip: boolean
  status: 'complete' | 'pending' | 'error'
  message?: string
}

const USER_FORM = createId<UserFormState>('USER_FORM')
const DEFAULT_STATE: UserFormState = {
  name: '',
  vip: false,
  status: 'complete',
}

export const UserForm = ({ id: user_id }: Props) => {
  const dispatch = useDispatch()

  const user = useSelector((state: State) => getUser(state, user_id))
  /**
   * if any field is undefined in the form, default to the saved value
   */
  const [{ name, vip, ...form }, set, exists] = useComponentState(USER_FORM, {
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

  const clear = useCallback(
    (event: React.SyntheticEvent) => {
      event.preventDefault()
      set()
    },
    [set]
  )
  const submit = useCallback(
    (event: React.SyntheticEvent) => {
      event.preventDefault()
      dispatch(updateUser(name, vip))
    },
    [dispatch, name, vip]
  )

  return (
    <>
      <Form onSubmit={submit}>
        <Label htmlFor='name'>
          <span>Name:</span>
          <Input type='text' name='name' value={name} onChange={setName} />
        </Label>
        <FlexRow>
          <Label htmlFor='vip'>VIP:</Label>
          <Input width={25} type='checkbox' id='vip' checked={vip} onChange={setVIP} />
        </FlexRow>
        <FlexRow end>
          <Button onClick={clear}>Clear</Button>
          {/* disable submit if form doesn't contain new info */}
          <Button type='submit' disabled={!exists}>
            Submit
          </Button>
        </FlexRow>
      </Form>
      {form.status === 'pending' && 'loading...'}
      {form.status === 'error' && form.message}
      {form.status === 'complete' && form.message}
    </>
  )
}
