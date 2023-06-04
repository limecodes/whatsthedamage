import React, { useState, useCallback, useEffect, useMemo } from 'react'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete'
import CategoryIcon from '@mui/icons-material/Category'
import { useCategories, useTransactions } from '@app/contexts'
import { Transaction, Category } from '@app/types'
import { formatUnixTimestamp } from '@app/utils'
import { SelectCategory } from '@app/components/SelectCategory'

interface TransactionItemProps {
  transaction: Transaction
}

export function TransactionItem({ transaction }: TransactionItemProps) {
  const {
    id,
    timestamp,
    amount,
    description,
    balanceAfter,
    category: transactionCategory,
  } = transaction
  const { categories, addCategory } = useCategories()
  const {
    transactions,
    updateTransaction,
    updateSimilarTransactions,
    removeTransaction,
  } = useTransactions()
  const [selectedCategory, setSelectedCategory] = useState(transactionCategory)

  const latestTransaction = useMemo(() => {
    return transactions.find((t) => t.id === transaction.id)
  }, [transactions])

  useEffect(() => {
    if (latestTransaction) {
      setSelectedCategory(latestTransaction.category)
    }
  }, [latestTransaction])

  const handleSelectCategory = useCallback(
    (selectedValue: Category | null) => {
      setSelectedCategory(selectedValue)
      if (selectedValue) {
        updateTransaction({
          ...transaction,
          category: selectedValue,
        })
      }
    },
    [updateTransaction, transaction],
  )

  const handleClearCategory = useCallback(() => {
    updateTransaction({
      ...transaction,
      category: null,
    })
  }, [id, setSelectedCategory])

  const handleAddCategory = useCallback(
    (newCategory: Category) => {
      const associatedDescriptions = [description]

      addCategory({ ...newCategory, associatedDescriptions })
    },
    [addCategory],
  )

  const handleExclude = useCallback(() => {
    removeTransaction(id)
  }, [removeTransaction, id])

  const handleAutoCategorise = useCallback(() => {
    if (selectedCategory) {
      updateSimilarTransactions(description, selectedCategory)
    }
  }, [updateSimilarTransactions, description, selectedCategory])

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
          onClearCategory={handleClearCategory}
        />
      </TableCell>
      <TableCell>
        {/*
        	Clicking "Exclude" should remove this transaction from the global state
        	Clicking "Auto-categorise" should find transactions with a similar description
        	and set the category to be the same as the selected category.

        	Sometimes transactions may have one of these words in the description, so maybe best to use
        	a regex to find similar descriptions instead of string === description
        */}
        <Button
          onClick={handleExclude}
          startIcon={<DeleteIcon />}
          color="secondary"
        >
          Exclude
        </Button>
        <Button
          onClick={handleAutoCategorise}
          startIcon={<CategoryIcon />}
          color="primary"
        >
          Auto-categorise
        </Button>
      </TableCell>
    </TableRow>
  )
}
