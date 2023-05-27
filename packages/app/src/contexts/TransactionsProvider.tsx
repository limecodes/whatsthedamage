import React, {
  createContext,
  ReactNode,
  useState,
  useMemo,
  useContext,
} from 'react'
import { Transaction } from '../types'

type TransactionsContextValue = {
  transactions: Transaction[]
}

interface TransactionProviderProps {
  children: ReactNode
}

const TransactionsContext = createContext<TransactionsContextValue>({
  transactions: [],
})

export function TransactionsProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const value = useMemo<TransactionsContextValue>(() => {
    return {
      transactions,
      setTransactions,
    }
  }, [transactions, setTransactions])

  return (
    <TransactionsContext.Provider value={value}>
      {children}
    </TransactionsContext.Provider>
  )
}

export const useTransactions = () => useContext(TransactionsContext)
