import React, { FunctionComponent, useCallback } from 'react'
import { FlexCol, Label, FlexRow, ErrorMsg, Button } from './styled'
import { InputValidators } from '~src/hooks/useTextInput'
import { createInputId } from '~src/hooks/createId'
import { useTextInput } from '~src'

type Props = InputValidators & {
  id: string
  label: string
  placeholder?: ''
}

const InputForm: FunctionComponent<Props> = ({ id, label, placeholder, ...validators }) => {
  const [value, set, { ref, validate, valid, error }] = useTextInput(createInputId(id), validators)

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
