import React, { FunctionComponent, useCallback } from 'react'
import { InputValidators } from '~src/hooks/useTextInput'
import { useTextInput } from '~src'
import styled from 'styled-components'

type Props = InputValidators & {
  id: string
  label: string
  placeholder?: ''
}

const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 200px;
`
const FlexRow = styled.div<{ end?: boolean }>`
  display: flex;
  gap: 8px;
  justify-content: ${({ end }) => (end ? 'flex-end' : 'flex-start')};
  align-items: center;
`

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-family: sans-serif;
  font-size: 14px;
  letter-spacing: 0.1;
  line-height: 16px;
  font-weight: 400;
  color: #101419;
`

const ErrorMsg = styled.span`
  color: #ff0a0a;
`

const Button = styled.button`
  background-color: #fff;
  border: 1px solid #0a85ff;
  border-radius: 6px;
  color: #0a85ff;
  padding: 6px 12px;
`

const InputForm: FunctionComponent<Props> = ({ id, label, placeholder, ...validators }) => {
  const [value, set, { ref, validate, valid, error }] = useTextInput(id, validators)

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      set(event.target.value)
    },
    [set]
  )

  const onSubmit = useCallback(
    (event: React.SyntheticEvent) => {
      event.preventDefault()
      if (validate()) {
        alert(`input value: ${value}`)
        set()
      }
    },
    [value, set, validate]
  )

  return (
    <FlexCol>
      <Label htmlFor={id}>
        <FlexRow>
          <span>{label}</span>
          {!valid && (
            <ErrorMsg>
              {error === 'required' ? '* required' : error === 'pattern' ? '* invalid email' : '*'}
            </ErrorMsg>
          )}
        </FlexRow>
        <input
          id={id}
          name={id}
          ref={ref}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </Label>
      <FlexRow end>
        <Button onClick={() => set()}>Clear</Button>
        <Button type='submit' onClick={onSubmit}>
          Submit
        </Button>
      </FlexRow>
    </FlexCol>
  )
}

export default InputForm
