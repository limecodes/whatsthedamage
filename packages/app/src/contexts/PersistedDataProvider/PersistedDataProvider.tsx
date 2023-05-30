import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
  useCallback,
  useContext,
} from 'react'
import * as Storage from './helpers'
import {
  StorageKey,
  PersistedData,
  PersistedDataValue,
  PersistedTransaction,
  PersistedCategory,
  PersistedBudget,
} from './types'

type PersistedDataContextValue = [
  PersistedData,
  (key: StorageKey, item: PersistedDataValue) => void,
]

interface PersistedDataProviderProps {
  children: ReactNode
}

const initialState: PersistedData = {
  transactions: [],
  categories: [],
  budget: {},
}

const PersistedDataContext = createContext<PersistedDataContextValue>([
  initialState,
  () => {},
])

export function PersistedDataProvider({
  children,
}: PersistedDataProviderProps) {
  const [data, setData] = useState<PersistedData>(initialState)

  useEffect(() => {
    if (Storage.isAvailable()) {
      const transactions = Storage.getPersistedData<PersistedTransaction[]>(
        StorageKey.transactions,
        [],
      )
      const categories = Storage.getPersistedData<PersistedCategory[]>(
        StorageKey.categories,
        [],
      )
      const budget = Storage.getPersistedData<PersistedBudget>(
        StorageKey.budget,
        {},
      )

      setData({ transactions, categories, budget })
    }
  }, [])

  const saveData = useCallback(
    (key: StorageKey, item: PersistedDataValue) => {
      const updatedData = { ...data, item }
      setData(updatedData)

      Object.entries(updatedData).forEach(([key, value]) => {
        Storage.persistData<PersistedDataValue>(key as StorageKey, value)
      })
    },
    [data],
  )

  const value = useMemo<PersistedDataContextValue>(() => {
    return [data, saveData]
  }, [data])

  return (
    <PersistedDataContext.Provider value={value}>
      {children}
    </PersistedDataContext.Provider>
  )
}

export const usePersistedData = () => {
  const context = useContext(PersistedDataContext)
  if (!context) {
    throw new Error(
      'usePersistedData must be used within a PersistedDataProvider',
    )
  }

  return context
}
