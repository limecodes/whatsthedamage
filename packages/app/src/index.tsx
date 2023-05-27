import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { TransactionsProvider } from './contexts'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <TransactionsProvider>
      <App />
    </TransactionsProvider>
  </React.StrictMode>,
)
