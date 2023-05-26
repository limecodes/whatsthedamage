import React, { useState, useCallback } from 'react'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import { SelectCategory } from '../SelectCategory'
import { Transaction, Category, SortedTransaction } from '../types'

interface TransactionTableProps {
  transactions: Transaction[]
}

function formatUnixTimestamp(unixTimestamp: number): string {
  const date = new Date(unixTimestamp * 1000)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()

  return `${day}.${month}.${year}`
}

function valueFromCategoryName(categoryName: string): string {
  return categoryName.toLowerCase().replace(/\s/g, '-')
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  const [sortedTransactions, setSortedTransactions] = useState<
    SortedTransaction[]
  >([...transactions].sort((a, b) => a.timestamp - b.timestamp))
  const [categories, setCategories] = useState<Category[]>([
    {
      name: 'Taxi',
      value: 'taxi',
    },
    {
      name: 'Glovo',
      value: 'glovo',
    },
  ])

  const handleExclude = (id: string) => {
    setSortedTransactions((prevTransactions) => {
      return prevTransactions.filter((transaction) => transaction.id !== id)
    })
  }

  const handleAddCategory = (name: string, transactionId: string) => {
  	const newCategory: Category = {
  		name,
  		value: valueFromCategoryName(name)
  	}

    setCategories((prevCategories) => [...prevCategories, newCategory])
    handleSelectCategory(transactionId, newCategory)
  }

  const handleSelectCategory = (categoryValue: string, transactionId: string) => {
  	const selectedCategory = categories.find(({ value }) => value === categoryValue)

  	if (selectedCategory) {
  		setSortedTransactions((prevTransactions) => {
      return prevTransactions.map((transaction) =>
        transaction.id === transactionId
          ? { ...transaction, category }
          : transaction,
      )
    })
  	}
  }

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
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedTransactions.map(
            ({ id, timestamp, amount, description, balanceAfter }) => (
              <TableRow key={id}>
                <TableCell>{formatUnixTimestamp(timestamp)}</TableCell>
                <TableCell>{amount}</TableCell>
                <TableCell>{description}</TableCell>
                <TableCell>{balanceAfter}</TableCell>
                <TableCell>
                  <SelectCategory
                    categories={categories}
                    onAddCategory={(categoryName) => handleAddCategory(categoryName, id)}
                    onSelectCategory={(categoryValue) =>
                      handleSelectCategory(categoryValue, id)
                    }
                  />
                </TableCell>
                <TableCell>
                  <button onClick={() => handleExclude(id)}>Exclude</button>
                </TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
