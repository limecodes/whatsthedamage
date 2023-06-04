import React, {
  createContext,
  ReactNode,
  useMemo,
  useContext,
  useReducer,
  useCallback,
  useEffect,
} from 'react'
import { Transaction, Category, StorageKey } from '@app/types'
import { usePersistedData } from '../PersistedDataProvider'
import { transactionsReducer } from './transactionsReducer'

type TransactionsContextValue = {
  loaded: boolean
  transactions: Transaction[]
  setTransactions: (transactions: Transaction[]) => void
  updateTransaction: (transaction: Transaction) => void
  updateSimilarTransactions: (
    description: Transaction['description'],
    category: Category,
  ) => void
  removeTransaction: (id: Transaction['id']) => void
  saveToLocalStorage: () => void
  clearTransactions: () => void
}

interface TransactionProviderProps {
  children: ReactNode
}

const TransactionsContext = createContext<TransactionsContextValue>({
  loaded: false,
  transactions: [],
  setTransactions: () => {},
  updateTransaction: () => {},
  updateSimilarTransactions: () => {},
  removeTransaction: () => {},
  saveToLocalStorage: () => {},
  clearTransactions: () => {},
})

export function TransactionsProvider({ children }: TransactionProviderProps) {
  const {
    transactions: persistedTransactions,
    saveData,
    loaded: dataLoaded,
    clearPersistedDataByKey,
  } = usePersistedData()
  const [transactions, dispatch] = useReducer(transactionsReducer, [])

  useEffect(() => {
    if (dataLoaded) {
      setTransactions(persistedTransactions)
    }
  }, [dataLoaded, persistedTransactions])

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
    saveData(StorageKey.transactions, transactions)
  }, [transactions])

  const clearTransactions = useCallback(() => {
    dispatch({ type: 'CLEAR_TRANSACTIONS' })
    clearPersistedDataByKey(StorageKey.transactions)
  }, [dispatch, clearPersistedDataByKey])

  const loaded = useMemo(() => {
    return dataLoaded && transactions.length > 0
  }, [dataLoaded, transactions])

  const value = useMemo<TransactionsContextValue>(() => {
    return {
      loaded,
      transactions,
      setTransactions,
      updateTransaction,
      updateSimilarTransactions,
      removeTransaction,
      saveToLocalStorage,
      clearTransactions,
    }
  }, [
    loaded,
    transactions,
    setTransactions,
    updateSimilarTransactions,
    removeTransaction,
    saveToLocalStorage,
    clearTransactions,
  ])

  return (
    <TransactionsContext.Provider value={value}>
      {children}
    </TransactionsContext.Provider>
  )
}

export const useTransactions = () => useContext(TransactionsContext)
