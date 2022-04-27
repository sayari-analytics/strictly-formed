/* eslint-disable @typescript-eslint/no-unused-vars */
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import React from 'react'
import { store } from './redux/store'
import { UserForm } from './components/UserForm'
import InputForm from './components/InputForm'
import ProfileForm from './components/Profile'
import styled from 'styled-components'

const EMAIL_REGEX = new RegExp(
  /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
)

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
      {/* <InputForm required autoFocus id='text_input_example' label='Email:' pattern={EMAIL_REGEX} />
      <UserForm id='one' /> */}
      <ProfileForm />
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
