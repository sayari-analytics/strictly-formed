/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FunctionComponent, useCallback } from 'react'
import { useForm } from '~/src/hooks/useForm'

interface Props {
  formId: string
}

const defaultForm = {
  input: '',
}

const Form: FunctionComponent<Props> = ({ formId }) => {
  const [header, setHeader] = React.useState('')
  const { form, status, setField, setStatus, clearForm } = useForm(
    formId,
    defaultForm
  )

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setField('input', event.target.value)
    },
    [setField]
  )

  const onSubmit = useCallback(
    (event: React.SyntheticEvent) => {
      event.preventDefault()
      setStatus('pending')
      setTimeout(() => {
        setHeader(form.input)
        setStatus('complete')
        clearForm()
      }, 1000)
    },
    [setStatus, clearForm, form.input]
  )

  return (
    <div>
      <h1>{header}</h1>
      <h3 style={{ color: 'darkgray' }}>{status}</h3>
      <pre>{JSON.stringify(form)}</pre>
      <form onSubmit={onSubmit}>
        <input value={form.input} onChange={onChange} />
        <button type='submit'>SUBMIT</button>
      </form>
    </div>
  )
}

export default Form
