import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
  useCallback,
  useContext,
} from 'react'
import { StorageKey } from '@app/types'
import * as Storage from './helpers'
import {
  PersistedData,
  PersistedDataValue,
  PersistedTransaction,
  PersistedCategory,
  PersistedBudget,
} from './types'

type PersistedDataContextValue = {
  data: {
  	transactions: PersistedTransaction[]
  	categories: PersistedCategory[]
  	budget: PersistedBudget
  },
  saveData: (key: StorageKey, item: PersistedDataValue) => void,
  loaded: boolean,
}

interface PersistedDataProviderProps {
  children: ReactNode
}

const initialState = {
  transactions: [],
  categories: [],
  budget: {},
}

const PersistedDataContext = createContext<PersistedDataContextValue>({
  data: initialState,
  saveData: () => {},
  loaded: false,
})

export function PersistedDataProvider({
  children,
}: PersistedDataProviderProps) {
	const [loaded, setLoaded] = useState(false)
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
      setLoaded(true)
    }
  }, [])

  const transactions = useMemo<PersistedTransaction[]>(() => {
  	return data.transactions as PersistedTransaction[]
  }, [data])

  const categories = useMemo<PersistedCategory[]>(() => {
  	return data.categories as PersistedCategory[]
  }, [data])

  const budget = useMemo<PersistedBudget>(() => {
  	return data.budget as PersistedBudget
  }, [data])

  const saveData = useCallback(
    (key: StorageKey, item: PersistedDataValue) => {
      const updatedData = { ...data, [key]: item }
      setData(updatedData)

      Object.entries(updatedData).forEach(([key, value]) => {
        Storage.persistData<PersistedDataValue>(key as StorageKey, value)
      })
    },
    [data],
  )

  const value = useMemo<PersistedDataContextValue>(() => {
    return {
    	saveData,
    	loaded,
    	data: {
    		transactions,
    		categories,
    		budget,
    	},
    }
  }, [transactions, categories, budget, loaded, saveData])

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
