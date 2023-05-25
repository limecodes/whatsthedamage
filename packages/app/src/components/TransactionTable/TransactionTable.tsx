import React from 'react'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import { Transaction } from '../types'

interface TransactionTableProps {
  transactions: Transaction[]
}

function formatUnixTimestamp(unixTimestamp: number): string {
  const date = new Date(unixTimestamp * 1000)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  return `${day}.${month}.${year}`
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  const sortedTransactions = [...transactions].sort(
    (a, b) => a.timestamp - b.timestamp,
  )

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Balance After</TableCell>
            <TableCell>Category</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedTransactions.map(
            ({ timestamp, amount, description, balanceAfter }) => (
              <TableRow>
                <TableCell>{formatUnixTimestamp(timestamp)}</TableCell>
                <TableCell>{amount}</TableCell>
                <TableCell>{description}</TableCell>
                <TableCell>{balanceAfter}</TableCell>
                <TableCell>Category Placeholder</TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
