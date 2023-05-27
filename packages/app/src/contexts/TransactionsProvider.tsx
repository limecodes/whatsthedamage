import React, {
  createContext,
  ReactNode,
  useState,
  useMemo,
  useContext,
} from 'react'
import { Transaction } from '@app/types'

type TransactionsContextValue = {
  transactions: Transaction[]
  setTransactions: (transactions: Transaction[]) => void
}

interface TransactionProviderProps {
  children: ReactNode
}

const TransactionsContext = createContext<TransactionsContextValue>({
  transactions: [],
  setTransactions: () => {},
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
