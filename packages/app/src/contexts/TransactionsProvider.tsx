import React, {
  createContext,
  ReactNode,
  useMemo,
  useContext,
  useReducer,
  useCallback,
} from 'react'
import { Transaction } from '@app/types'
import { transactionsReducer } from './transactionsReducer'

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
  const [transactions, dispatch] = useReducer(transactionsReducer, [])

  const setTransactions = useCallback(
    (transactions: Transaction[]) => {
      dispatch({ type: 'SET_TRANSACTIONS', payload: transactions })
    },
    [dispatch],
  )

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
