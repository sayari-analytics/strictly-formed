import React from 'react'
import Form from './Form'
import './App.css'
import StrictForm from './StrictForm'

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
      <StrictForm formId='strict-form-1' />
      <Form formId='app-form-2' />
    </div>
  )
}

export default App
