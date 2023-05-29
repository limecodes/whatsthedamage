import React, {
  createContext,
  ReactNode,
  useMemo,
  useContext,
  useReducer,
  useCallback,
} from 'react'
import { Transaction, Category } from '@app/types'
import { transactionsReducer } from './transactionsReducer'

type TransactionsContextValue = {
  transactions: Transaction[]
  setTransactions: (transactions: Transaction[]) => void
  updateTransaction: (transaction: Transaction) => void
  updateSimilarTransactions: (
    description: Transaction['description'],
    category: Category,
  ) => void
  removeTransaction: (id: Transaction['id']) => void
  saveToLocalStorage: () => void
}

interface TransactionProviderProps {
  children: ReactNode
}

const TransactionsContext = createContext<TransactionsContextValue>({
  transactions: [],
  setTransactions: () => {},
  updateTransaction: () => {},
  updateSimilarTransactions: () => {},
  removeTransaction: () => {},
  saveToLocalStorage: () => {},
})

export function TransactionsProvider({ children }: TransactionProviderProps) {
  // TODO, use a helper for working with local storage
  const [transactions, dispatch] = useReducer(
    transactionsReducer,
    JSON.parse(window.localStorage.getItem('transactions') || '[]'),
  )

  const setTransactions = useCallback(
    (transactions: Transaction[]) => {
      dispatch({ type: 'SET_TRANSACTIONS', transactions })
    },
    [dispatch],
  )

  const updateTransaction = useCallback(
    (transaction: Transaction) => {
      dispatch({ type: 'UPDATE_TRANSACTION', transaction })
    },
    [dispatch],
  )

  const updateSimilarTransactions = useCallback(
    (description: Transaction['description'], category: Category) => {
      dispatch({ type: 'UPDATE_SIMILAR_TRANSACTIONS', description, category })
    },
    [dispatch],
  )

  const removeTransaction = useCallback(
    (id: Transaction['id']) => {
      dispatch({ type: 'REMOVE_TRANSACTION', id })
    },
    [dispatch],
  )

  const saveToLocalStorage = useCallback(() => {
    window.localStorage.setItem('transactions', JSON.stringify(transactions))
  }, [transactions])

  const value = useMemo<TransactionsContextValue>(() => {
    return {
      transactions,
      setTransactions,
      updateTransaction,
      updateSimilarTransactions,
      removeTransaction,
      saveToLocalStorage,
    }
  }, [
    transactions,
    setTransactions,
    updateSimilarTransactions,
    removeTransaction,
    saveToLocalStorage,
  ])

  return (
    <TransactionsContext.Provider value={value}>
      {children}
    </TransactionsContext.Provider>
  )
}

export const useTransactions = () => useContext(TransactionsContext)
