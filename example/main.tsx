import ReactDOM from 'react-dom'
import React from 'react'
import { Provider } from 'react-redux'
import { UserForm } from './components/UserForm'
import { store } from './redux/store'
import styled from 'styled-components'
import { cache } from '~src'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
`
const App = () => {
  return (
    <Container>
      <UserForm id='one' />
    </Container>
  )
}
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.dispose(() => {
    cache.reset()
  })
}
