import React from 'react'
import { useComponentState, createId, SetHandler, CLEAR_COMPONENT, SET_COMPONENT } from '~src'
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

const TEST_COMPONENT_STATE = createId<TestState>('TEST_COMPONENT_STATE')

const STATE = 0
const SET = 1
const EXISTS = 2

// utils
const isObject = (value: unknown): value is object =>
  typeof value === 'object' && typeof value !== null

const getState = () => {
  return store.getState().components[TEST_COMPONENT_STATE] as TestState | undefined
}

const setup = () => {
  const props = {}

  function TestComponent() {
    Object.assign(props, useComponentState(TEST_COMPONENT_STATE, initialState))
    return null
  }

  const { unmount, rerender } = render(<TestComponent />)

  return {
    unmount,
    rerender,
    props: props as [TestState, SetHandler<TestState>, boolean],
  }
}

// tests
describe('[useComponentState]', () => {
  beforeAll(() => {
    jest.spyOn(store, 'dispatch')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('[on mount]', () => {
    let component: ReturnType<typeof setup>

    beforeEach(() => {
      component = setup()
    })

    it('returns the initial state exactly as provided', () => {
      expect(isObject(component.props[STATE])).toBe(true)
      expect(component.props[STATE]).toEqual(initialState)
    })

    it('does not dispatch any actions before the "set" handler is invoked', () => {
      expect(store.dispatch).toHaveBeenCalledTimes(0)
      expect(component.props[EXISTS]).toBe(false)
      expect(getState()).toBeUndefined()
    })
  })

  describe('[on update]', () => {
    let component: ReturnType<typeof setup>
    const firstUpdate = {
      ...initialState,
      name: 'testing state updates',
    }

    beforeEach(() => {
      component = setup()

      // first update
      act(() => {
        component.props[SET](firstUpdate)
      })
    })

    it('correctly updates state via "set" handler', () => {
      expect(component.props[EXISTS]).toBe(true)
      expect(store.dispatch).toHaveBeenLastCalledWith({
        id: TEST_COMPONENT_STATE,
        type: SET_COMPONENT,
        value: firstUpdate,
      })

      expect(getState()).toEqual(firstUpdate)
      expect(component.props[STATE]).toEqual(firstUpdate)

      // second update
      const secondUpdate = { ...firstUpdate, open: true }
      act(() => {
        component.props[SET](secondUpdate)
      })

      expect(store.dispatch).toHaveBeenCalledTimes(2)
      expect(component.props[STATE]).toEqual(secondUpdate)
      expect(getState()).toEqual(secondUpdate)
    })

    it('clears component state from redux when no argument is provided to "set" handler', () => {
      act(() => {
        component.props[SET]()
      })
      expect(store.dispatch).toHaveBeenLastCalledWith({
        id: TEST_COMPONENT_STATE,
        type: CLEAR_COMPONENT,
      })
      expect(component.props[EXISTS]).toBe(false)
      expect(getState()).toBeUndefined()
    })
  })

  describe('[on unmount]', () => {
    let component: ReturnType<typeof setup>

    beforeEach(() => {
      component = setup()
    })

    it('does not dispatch any actions if the state never changed', () => {
      component.unmount()
      expect(store.dispatch).toBeCalledTimes(0)
      expect(getState()).toBeUndefined()
    })

    it('clears component state from redux if the state changed', () => {
      act(() => {
        component.props[SET]((current) => ({ ...current, open: true }))
      })

      component.unmount()
      expect(store.dispatch).toHaveBeenLastCalledWith({
        id: TEST_COMPONENT_STATE,
        type: CLEAR_COMPONENT,
      })
      expect(getState()).toBeUndefined()
    })
  })
})
