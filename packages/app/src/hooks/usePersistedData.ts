import { useEffect, useState } from 'react'
import {
  PersistedTransaction,
  PersistedCategory,
  PersistedBudget,
  PersistedDataValue,
  StorageKey,
} from '@app/types'
import * as Storage from './helpers'

type PersistedData = Record<StorageKey, PersistedDataValue>

const initialState: PersistedData = {
  transactions: [],
  categories: [],
  budget: {},
}

export function usePersistedData(): PersistedData {
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

  const saveData = (key: StorageKey, item: PersistedDataValue) => {
    const updatedData = { ...data, item }
    setData(updatedData)

    Object.entries(updatedData).forEach(([key, value]) => {
      Storage.persistData<PersistedDataValue>(key as StorageKey, value)
    })
  }

  return data
}
