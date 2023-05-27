import React from 'react'
import ReactDOM from 'react-dom/client'
import { WhatsTheDamageApp } from './WhatsTheDamageApp'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <WhatsTheDamageApp />
  </React.StrictMode>,
)
