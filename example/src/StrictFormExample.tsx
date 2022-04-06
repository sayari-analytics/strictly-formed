import React, { FunctionComponent, useCallback, useState } from 'react'
import { useStrictForm, InputField } from '~/src'

type Props = {
  formId: string
}

const StrictFormExample: FunctionComponent<Props> = ({ formId }) => {
  const [val, setVal] = useState('')
  const { status, clearForm, setStatus, setInput, setSelected, form } =
    useStrictForm(formId, {
      firstName: { field: 'input' },
      lastName: { field: 'input' },
      age: { field: 'input', type: 'number' },
      color: {
        field: 'select',
        options: [
          { id: 'blue', label: 'Blue' },
          { id: 'green', label: 'Green' },
          { id: 'pink', label: 'Pink' },
          { id: 'orange', label: 'Orange' },
        ],
      },
    })
  const { firstName, lastName, age, color } = form

  const onSubmit = useCallback(
    (event: React.SyntheticEvent) => {
      event.preventDefault()
      setStatus('pending')
      setVal('validating form...')
      setTimeout(() => {
        setVal('form validated')
        setStatus('complete')
        clearForm()
      }, 1000)
    },
    [setStatus, clearForm]
  )

  const onInputChange = useCallback(
    (field: InputField) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setInput(field, event.target.value)
    },
    [setInput]
  )

  const onSelectColor = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelected(color, event.target.value)
    },
    [color, setSelected]
  )

  return (
    <form
      onSubmit={onSubmit}
      style={{
        maxWidth: 400,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}>
      <h1>{val}</h1>
      <h5 style={{ color: 'grey' }}>{status}</h5>
      <p>
        <span>{JSON.stringify({ firstName: firstName.value })}</span>
        <span>{JSON.stringify({ lastName: lastName.value })}</span>
        <span>{JSON.stringify({ age: age.value })}</span>
        <span>{JSON.stringify({ color: color.selected })}</span>
      </p>
      <label htmlFor={firstName.name}>First Name:</label>
      <input
        name={firstName.name}
        value={firstName.value}
        onChange={onInputChange(firstName)}
      />
      <label htmlFor={lastName.name}>Last Name:</label>
      <input value={lastName.value} onChange={onInputChange(lastName)} />
      <label htmlFor={age.name}>Age:</label>
      <input type='number' value={age.value} onChange={onInputChange(age)} />
      <label htmlFor={color.name}>Favorite Color:</label>
      <select value={color.selected} onChange={onSelectColor}>
        {color.options.map(({ id, label }) => (
          <option key={id} value={id}>
            {label}
          </option>
        ))}
      </select>
      <button type='submit'>Submit</button>
    </form>
  )
}

export default StrictFormExample
