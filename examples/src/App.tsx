import React from 'react'
import Form from './Form'
import './App.css'

function App() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Form formId='app-form-1' />
      <Form formId='app-form-2' />
    </div>
  )
}

export default App
