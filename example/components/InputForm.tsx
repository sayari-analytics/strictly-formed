import React, { FunctionComponent, useCallback } from 'react'
import { InputValidators } from '~src/hooks/useTextInput'
import { useTextInput } from '~src'

type Props = InputValidators & {
  id: string
  label: string
  placeholder?: ''
}

const InputForm: FunctionComponent<Props> = ({ id, label, placeholder, ...validators }) => {
  const [value, set, validate, meta] = useTextInput(id, validators)

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      set(event.target.value)
    },
    [set]
  )

  const onSubmit = useCallback(() => {
    if (validate().valid) {
      alert(`input value: ${value}`)
      set()
    }
  }, [value, set, validate])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}>
      <label
        htmlFor={id}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}>
        <div
          style={{
            display: 'inline-flex',
            gap: '2px',
            fontSize: '14px',
            letterSpacing: 0.1,
            lineHeight: '16px',
            fontWeight: 400,
            color: '#101419',
          }}>
          <span>{label}</span>
          {!meta.valid && (
            <span style={{ color: '#FF0A0A' }}>
              {meta.error === 'required'
                ? '* required'
                : meta.error === 'pattern'
                ? '* invalid email'
                : '*'}
            </span>
          )}
        </div>
        <input
          id={id}
          name={id}
          ref={meta.ref}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
      </label>
      <button onClick={onSubmit}>submit</button>
    </div>
  )
}

export default InputForm
