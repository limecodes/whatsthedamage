import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {
  TransactionsProvider,
  CategoriesProvider,
  PersistedDataProvider,
} from '@app/contexts'
import {
  HomeScreen,
  UploadScreen,
  TransactionsScreen,
  ReportScreen,
} from '@app/screens'

export function WhatsTheDamageApp() {
  return (
    <PersistedDataProvider>
      <TransactionsProvider>
        <CategoriesProvider>
          <Router>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/upload" element={<UploadScreen />} />
              <Route path="/transactions" element={<TransactionsScreen />} />
              <Route path="/report" element={<ReportScreen />} />
            </Routes>
          </Router>
        </CategoriesProvider>
      </TransactionsProvider>
    </PersistedDataProvider>
  )
}
