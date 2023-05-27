import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '@mui/material/Container'
import { useTransactions } from '@app/contexts'
import { TransactionTable } from '@app/components'

export function TransactionsScreen() {
  const navigate = useNavigate()
  const { transactions } = useTransactions()

  useEffect(() => {
    if (transactions.length === 0) {
      navigate('/upload')
    }
  }, [transactions, navigate])

  return (
    <Container>
      <TransactionTable />
    </Container>
  )
}
