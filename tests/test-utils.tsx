import React from 'react'
import { combineReducers, createStore } from 'redux'
import { render, RenderOptions } from '@testing-library/react'
import { componentStateReducer } from '~src'
import { Provider } from 'react-redux'

export const store = createStore(
  combineReducers({
    components: componentStateReducer,
  })
)

const Wrapper: React.FC = ({ children }) => <Provider store={store}>{children}</Provider>

const customRender = (ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) => {
  return render(ui, { wrapper: Wrapper, ...options })
}

export * from '@testing-library/react'
export { customRender as render }
