import React, { useState, useCallback, useEffect } from 'react'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import { useCategories, useTransactions } from '@app/contexts'
import { Transaction, Category } from '@app/types'
import { formatUnixTimestamp } from '@app/utils'
import { SelectCategory } from '@app/components/SelectCategory'

interface TransactionItemProps {
  transaction: Transaction
}

export function TransactionItem({
  transaction,
}: TransactionItemProps) {
  const { id, timestamp, amount, description, balanceAfter, category: transactionCategory } = transaction
  const { categories, addCategory } = useCategories()
  const { updateTransaction } = useTransactions()
  const [selectedCategory, setSelectedCategory] = useState(transactionCategory)

  useEffect(() => {
  	setSelectedCategory(transactionCategory)
  }, [transactionCategory])

  useEffect(() => {
  	if (selectedCategory !== transactionCategory) {
  		updateTransaction({
  			...transaction,
  			category: selectedCategory,
  		})
  	}
  }, [selectedCategory, transaction, updateTransaction])

  const handleSelectCategory = useCallback((selectedValue: Category | null) => {
  	setSelectedCategory(selectedValue)
  }, [])

  const handleAddCategory = useCallback((newCategory: Category) => {
    addCategory(newCategory)
  }, [addCategory])

  return (
    <TableRow key={id}>
      <TableCell>{formatUnixTimestamp(timestamp)}</TableCell>
      <TableCell>{amount}</TableCell>
      <TableCell>{description}</TableCell>
      <TableCell>{balanceAfter}</TableCell>
      <TableCell>
        <SelectCategory
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
          onAddCategory={handleAddCategory}
        />
      </TableCell>
      <TableCell>Action</TableCell>
    </TableRow>
  )
}
