import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import React from 'react'
import { store } from './redux/store'
import { UserForm } from './components/UserForm'

const App = () => {
  const [tog, setTog] = React.useState(true)
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}>
      <h1>Mikey Pioli</h1>
      {tog ? (
        <div style={{ backgroundColor: 'pink' }}>
          <UserForm id='one' />
        </div>
      ) : (
        <div style={{ backgroundColor: 'lime' }}>
          <UserForm id='two' />
          <UserForm id='three' />
        </div>
      )}
      <button onClick={() => setTog((x) => !x)}>tog</button>
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
