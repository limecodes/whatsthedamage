import React, {
  createContext,
  ReactNode,
  useState,
  useMemo,
  useContext,
  useReducer
} from 'react'
import { Transaction } from '@app/types'
import { transactionsReducer } from './transactionsReducer'

type TransactionsContextValue = {
  transactions: Transaction[]
  sortedTransactions: Transaction[]
  setTransactions: (transactions: Transaction[]) => void
}

interface TransactionProviderProps {
  children: ReactNode
}

const TransactionsContext = createContext<TransactionsContextValue>({
  transactions: [],
  sortedTransactions: [],
  setTransactions: () => {},
})

export function TransactionsProvider({ children }: TransactionProviderProps) {
	const [transactions, dispatch] = useReducer(transactionsReducer, [])

	const setTransactions = (transactions: Transaction[]) => {
		dispatch({ type: 'SET_TRANSACTIONS', payload: transactions })
	}

  const sortedTransactions = useMemo(() => {
    return [...transactions].sort((a, b) => a.timestamp - b.timestamp)
  }, [transactions])

  const value = useMemo<TransactionsContextValue>(() => {
    return {
      transactions,
      sortedTransactions,
      setTransactions,
    }
  }, [transactions, sortedTransactions, setTransactions])

  return (
    <TransactionsContext.Provider value={value}>
      {children}
    </TransactionsContext.Provider>
  )
}

export const useTransactions = () => useContext(TransactionsContext)
