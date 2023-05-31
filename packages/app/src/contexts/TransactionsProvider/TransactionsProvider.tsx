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
})

export function TransactionsProvider({ children }: TransactionProviderProps) {
  const { data, saveData, loaded: dataLoaded } = usePersistedData()
  const [transactions, dispatch] = useReducer(
    transactionsReducer,
    [],
  )

  useEffect(() => {
  	if (dataLoaded) {
  		setTransactions(data.transactions)
  	}
  }, [dataLoaded, data.transactions])

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
    }
  }, [
  	loaded,
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
