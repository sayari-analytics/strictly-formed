/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FunctionComponent } from 'react'
import { useForm, useInputField } from '../../src/index'

interface Props {
  formId?: string
}

const Form: FunctionComponent<Props> = ({ formId }) => {
  const [header, setHeader] = React.useState('')
  const { ref, value, onChange } = useInputField(formId, 'input')
  const { form, submit } = useForm({
    formId,
    defaultForm: { input: '' },
    onSubmit: async (form: { input: string }) => {
      return await setTimeout(() => {
        setHeader(form.input)
      }, 1000)
    },
  })

  return (
    <div>
      <h1>{header}</h1>
      <pre>{JSON.stringify(form)}</pre>
      <form onSubmit={submit}>
        <input ref={ref} value={value} onChange={onChange} />
        <button type='submit'>SUBMIT</button>
      </form>
    </div>
  )
}

export default Form
