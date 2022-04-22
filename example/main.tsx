import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import React from 'react'
import { store } from './redux/store'
import { UserForm } from './components/UserForm'
import InputForm from './components/InputForm'

const EMAIL_REGEX = new RegExp(
  /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
)

const App = () => {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 16,
      }}>
      <InputForm
        required
        autoFocus
        id='text_input_example'
        label='Text Input Example'
        pattern={EMAIL_REGEX}
      />

      <div style={{ backgroundColor: 'pink' }}>
        <UserForm id='one' />
      </div>
    </div>
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
