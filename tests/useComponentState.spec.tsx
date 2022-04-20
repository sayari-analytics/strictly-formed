import React from 'react'
import type { Id, SetHandler } from '~src/types'
import { useComponentState } from '~src/hooks/useComponentState'
import { store, render, act } from '~tests/test-utils'

type TestState = {
  input: string
  open: boolean
  name?: string
}

const initialState: TestState = {
  input: '',
  open: false,
}

const TEST_COMPONENT_STATE = 'TEST_COMPONENT_STATE'

// utils
const isObject = (value: unknown): value is object =>
  typeof value === 'object' && typeof value !== null

const getState = () => {
  return store.getState().components[TEST_COMPONENT_STATE as Id<TestState>] as TestState | undefined
}

const setup = () => {
  const props = {}

  function TestComponent() {
    Object.assign(props, useComponentState(TEST_COMPONENT_STATE, initialState))
    return null
  }

  render(<TestComponent />)
  return props as ReturnType<typeof useComponentState>
}

// tests
describe('[useComponentState]', () => {
  let component: ReturnType<typeof setup>

  beforeEach(() => {
    component = setup()
  })

  it('returns the initial state exactly as provided before interaction', () => {
    const state = component[0] as TestState

    expect(isObject(state)).toBe(true)
    expect(state.input).toEqual('')
    expect(state.open).toBe(false)
    expect(state.name).toBe(undefined)
    expect(component[2].id).toEqual(TEST_COMPONENT_STATE)
  })

  it('is not initialized in redux before interaction', () => {
    expect(component[2].exists).toBe(false)
    expect(getState()).toBe(undefined)
  })

  it('correctly updates state in component & redux via "set" handler', () => {
    const set = component[1] as SetHandler<TestState>

    // first update
    act(() => {
      set((current) => ({
        ...current,
        name: 'testing state updates',
      }))
    })

    expect(component[2].exists).toBe(true)
    expect(getState()).toBeDefined()

    expect((component[0] as TestState).name).toEqual('testing state updates')
    expect(getState()?.name).toEqual('testing state updates')

    // second update
    act(() => {
      set((current) => ({
        ...current,
        open: true,
      }))
    })

    expect((component[0] as TestState).open).toBe(true)
    expect(getState()?.open).toBe(true)

    // first update persists
    expect((component[0] as TestState).name).toEqual('testing state updates')
    expect(getState()?.name).toEqual('testing state updates')
  })

  it('clears state from redux when no argument is provided to "set" handler', () => {
    const set = component[1] as SetHandler<TestState>

    act(() => {
      set((current) => ({
        ...current,
        name: 'testing state updates',
      }))
    })

    expect(component[2].exists).toBe(true)

    act(() => {
      set()
    })

    expect(component[2].exists).toBe(false)
  })
})
