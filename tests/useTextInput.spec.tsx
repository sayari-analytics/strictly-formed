import React from 'react'
import { useTextInput, UseTextInputReturn, TextInput, CLEAR_COMPONENT, createId } from '~src'
import { TextInputProps, handleValidation } from '~src/hooks/useTextInput'
import { store, render, act, fireEvent } from '~tests/test-utils'

// constants
const TEST_INPUT_ID = createId<TextInput>('TEST_INPUT_ID')

const EMAIL_REGEX = new RegExp(
  /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
)

// utils
const getState = () => store.getState().components[TEST_INPUT_ID] as TextInput | undefined

const setup = (props: TextInputProps = {}) => {
  const hook = {} as {
    value: string
    set: UseTextInputReturn[1]
    validate: UseTextInputReturn[2]['validate']
    meta: UseTextInputReturn[2]
  }

  function TestInput() {
    const [value, set, meta] = useTextInput(TEST_INPUT_ID, props)
    Object.assign(hook, { value, set, validate: meta.validate, meta })

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      set(event.target.value)
    }

    return <input data-testid={TEST_INPUT_ID} ref={meta.ref} value={value} onChange={onChange} />
  }

  const utils = render(<TestInput />)
  const input = utils.getByTestId(TEST_INPUT_ID) as HTMLInputElement

  return { input, ...hook, ...utils }
}

// tests
describe('[handleValidation]', () => {
  it('validates required value', () => {
    expect(handleValidation('', { required: true })).toEqual({
      valid: false,
      error: 'required',
    })
    expect(handleValidation('required field', { required: true })).toEqual({
      valid: true,
    })
  })

  it('validates minlength', () => {
    expect(handleValidation('short', { length: [10, 20] })).toEqual({
      valid: false,
      error: 'minlength',
    })
    expect(handleValidation('long enough', { length: [5, 20] })).toEqual({
      valid: true,
    })
  })

  it('validates maxlength', () => {
    expect(handleValidation('way too long string', { length: [0, 5] })).toEqual({
      valid: false,
      error: 'maxlength',
    })
    expect(handleValidation('just right', { length: [0, 20] })).toEqual({
      valid: true,
    })
  })

  it('validates regexp pattern', () => {
    expect(handleValidation('invalid email', { pattern: EMAIL_REGEX })).toEqual({
      valid: false,
      error: 'pattern',
    })
    expect(handleValidation('goodEmail@gmail.com', { pattern: EMAIL_REGEX })).toEqual({
      valid: true,
    })
  })
})

describe('[useTextInput]', () => {
  beforeAll(() => {
    jest.spyOn(store, 'dispatch')
  })
  describe('[on mount]', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('defaults initial value as ""', () => {
      const { input } = setup()
      expect(input.value).toBe('')
    })

    it('correctly sets initial value when provided without dispatching any actions', () => {
      const { input } = setup({ value: 'initial value' })
      expect(input.value).toBe('initial value')
      expect(store.dispatch).toHaveBeenCalledTimes(0)
    })

    it('does not dispatch any actions before the value changes', () => {
      const { meta } = setup()
      expect(store.dispatch).toHaveBeenCalledTimes(0)
      expect(meta.exists).toBe(false)
      expect(getState()).toBeUndefined()
    })

    test('autoFocus is disabled by default', () => {
      const { input } = setup()
      expect(document.activeElement).not.toBe(input)
    })

    test('autoFocus enabled when prop provided', () => {
      const { input } = setup({ autoFocus: true })
      expect(document.activeElement).toBe(input)
    })
  })

  describe('[on update]', () => {
    test('"set" handler updates redux state', () => {
      const { set } = setup()
      act(() => set('first update'))
      expect(getState()?.value).toBe('first update')
    })

    test('"set" handler updates redux state via input onChange', () => {
      const { input } = setup()
      fireEvent.change(input, { target: { value: 'text input value' } })
      expect(input.value).toBe('text input value')
      expect(getState()?.value).toBe('text input value')
    })

    test('"validate" handler returns truthy without any requirements', () => {
      const { validate } = setup()
      expect(validate()).toBe(true)
    })

    test('"validate" handler updates redux state on validation error', () => {
      const { validate } = setup({ required: true })
      expect(validate()).toBe(false)
      expect(getState()?.valid).toBe(false)
      expect(getState()?.error).toBe('required')
    })

    test('"validate" handler updates with the correct state when current is falsy', () => {
      const { validate, input } = setup({ required: true, value: 'initial state' })
      fireEvent.change(input, { target: { value: '' } })
      expect(validate()).toBe(false)
    })
  })

  describe('[on unmount]', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('does not dispatch any actions if the state never changed', () => {
      const { unmount, input, meta } = setup()
      expect(input.value).toBe('')
      expect(meta.exists).toBe(false)
      unmount()
      expect(store.dispatch).toHaveBeenCalledTimes(0)
      expect(getState()).toBeUndefined()
    })

    it('clears component state from redux if the state has changed', () => {
      const { unmount, set } = setup()
      act(() => set('first update'))
      expect(getState()?.value).toBe('first update')
      unmount()
      expect(store.dispatch).toHaveBeenLastCalledWith({
        id: TEST_INPUT_ID,
        type: CLEAR_COMPONENT,
      })
    })
  })
})
