import React, { FunctionComponent } from 'react'
import { Button, ErrorMsg, FlexRow, Form, Input, Label } from './styled'
import { createFormId } from '~src/hooks/createId'
import { useStrictForm } from '~src/hooks/useStrictForm'
import { ValidationModel } from '~src/types'

type Profile = {
  firstName: string
  lastName: string
  email?: string
  age?: number
}

const EMAIL_REGEX = new RegExp(
  /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
)
const init: Profile = { firstName: '', lastName: '' }

const validators: ValidationModel<Profile> = {
  firstName: (value) => (value === '' ? 'required' : undefined),
  lastName: (value) => (value === '' ? 'required' : undefined),
  email: (value) => (value && !EMAIL_REGEX.test(value) ? 'invalid' : undefined),
  age: (value) => (value === undefined ? 'required' : undefined),
}

export const PROFILE_ID = createFormId<Profile>('PROFILE_ID')

const ProfileForm: FunctionComponent = () => {
  const [profile, set, { validate, errors }] = useStrictForm(PROFILE_ID, init, validators)

  const setFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
    set((form) => ({ ...form, firstName: event.target.value }))
  }
  const setLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
    set((form) => ({ ...form, lastName: event.target.value }))
  }
  const setEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    set((form) => ({ ...form, email: event.target.value }))
  }
  const setAge = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isNaN(+event.target.value)) {
      set((form) => ({ ...form, age: +event.target.value }))
    }
  }

  const onClear = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    set()
  }
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (validate()) {
      alert(JSON.stringify(profile))
      set()
    }
  }

  return (
    <Form onSubmit={onSubmit}>
      <Label htmlFor='firstName'>
        <FlexRow>
          <span>First Name:</span>
          {errors.has('firstName.required') && <ErrorMsg>* required</ErrorMsg>}
        </FlexRow>
        <Input name='firstName' value={profile.firstName} onChange={setFirstName} />
      </Label>
      <Label htmlFor='lastName'>
        <FlexRow>
          <span>Last Name:</span>
          {errors.has('lastName.required') && <ErrorMsg>* required</ErrorMsg>}
        </FlexRow>
        <Input name='lastName' value={profile.lastName} onChange={setLastName} />
      </Label>
      <Label htmlFor='email'>
        <FlexRow>
          <span>E-mail:</span>
          {errors.has('email.invalid') && <ErrorMsg>* invalid e-mail</ErrorMsg>}
        </FlexRow>
        <Input name='email' value={profile.email ?? ''} onChange={setEmail} />
      </Label>
      <Label htmlFor='age'>
        <FlexRow>
          <span>Age:</span>
          {errors.has('age.required') && <ErrorMsg>* required</ErrorMsg>}
        </FlexRow>
        <Input type='number' name='age' value={profile.age ?? ''} onChange={setAge} />
      </Label>
      <FlexRow end>
        <Button onClick={onClear}>Clear</Button>
        <Button type='submit'>Submit</Button>
      </FlexRow>
    </Form>
  )
}

export default ProfileForm
