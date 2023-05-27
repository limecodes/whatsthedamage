import React, { useState } from 'react'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import { Transaction, SortedTransaction } from '@app/types'
import { useTransactions } from '@app/contexts'
import { formatUnixTimestamp } from '@app/utils'
import { SelectCategory } from '@app/components/SelectCategory'
import { TransactionItem } from '@app/components/TransactionItem'

interface TransactionTableProps {}

export function TransactionTable() {
  const { sortedTransactions } = useTransactions()
  const [categories, setCategories] = useState<string[]>(['Taxi', 'Glovo'])

  // const handleExclude = (id: string) => {
  //   setSortedTransactions((prevTransactions) => {
  //     return prevTransactions.filter((transaction) => transaction.id !== id)
  //   })
  // }

  // const handleSelectCategory = (transactionId: string, category: string) => {
  //   setSortedTransactions((prevSortedTransactions) => {
  //     return prevSortedTransactions.map((transaction) =>
  //       transaction.id === transactionId
  //         ? { ...transaction, category }
  //         : transaction,
  //     )
  //   })
  // }

  // const handleAddCategory = (transactionId: string, category: string) => {
  //   setCategories((prevCategories) => [...prevCategories, category])

  //   setSortedTransactions((prevSortedTransactions) => {
  //     return prevSortedTransactions.map((transaction) =>
  //       transaction.id === transactionId
  //         ? { ...transaction, category }
  //         : transaction,
  //     )
  //   })
  // }

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
          {sortedTransactions.map(
            (transaction) => <TransactionItem key={transaction.id} transaction={transaction} />
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
