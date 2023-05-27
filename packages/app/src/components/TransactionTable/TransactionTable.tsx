import React from 'react'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import { useTransactions } from '@app/contexts'
import { TransactionItem } from '@app/components/TransactionItem'

export function TransactionTable() {
  const { transactions } = useTransactions()

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Balance After</TableCell>
            <TableCell width="200px">Category</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map(
            (transaction) => <TransactionItem key={transaction.id} transaction={transaction} />
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
