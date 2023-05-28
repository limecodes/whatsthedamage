import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { TransactionsProvider, CategoriesProvider } from '@app/contexts'
import { HomeScreen, UploadScreen, TransactionsScreen } from '@app/screens'

export function WhatsTheDamageApp() {
  return (
    <TransactionsProvider>
      <CategoriesProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/upload" element={<UploadScreen />} />
            <Route path="/transactions" element={<TransactionsScreen />} />
          </Routes>
        </Router>
      </CategoriesProvider>
    </TransactionsProvider>
  )
}
