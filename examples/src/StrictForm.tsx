/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FunctionComponent, useCallback } from 'react'
import { useStrictForm } from '~/src/hooks/useStrictForm'

interface Props {
  formId: string
}

const StrictForm: FunctionComponent<Props> = ({ formId }) => {
  const { status, error, setInput, firstName, lastName, age, selly } =
    useStrictForm(formId, {
      firstName: { field: 'input', type: 'text' },
      lastName: { field: 'input' },
      age: { field: 'input', type: 'number' },
      selly: { field: 'select', options: [{ id: 's', label: 'sdsdf' }] },
    })

  React.useEffect(() => {
    console.log('firstName', firstName)
  }, [firstName])
  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInput(firstName, event.target.value)
    },
    [setInput, firstName]
  )

  return (
    <div>
      <input
        value={firstName.field === 'input' ? (firstName.value as string) : ''}
        onChange={onChange}
      />
      <input type='number' value={age} />
      <input />
    </div>
  )
}

export default StrictForm
