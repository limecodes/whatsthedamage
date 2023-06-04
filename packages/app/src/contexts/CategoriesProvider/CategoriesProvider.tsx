import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useMemo,
  useEffect,
  useReducer,
  useCallback,
} from 'react'
import { Category, StorageKey } from '@app/types'
import { usePersistedData } from '@app/contexts'
import { categoriesReducer } from './categoriesReducer'

type CategoriesContextValue = {
  categories: Category[]
  addCategory: (category: Category) => void
  removeCategory: (category: Category) => void
  updateCategory: (category: Category) => void
}

interface CategroriesProviderProps {
  children: ReactNode
}

const CategoriesContext = createContext<CategoriesContextValue>({
  categories: [],
  addCategory: () => {},
  removeCategory: () => {},
  updateCategory: () => {},
})

export function CategoriesProvider({ children }: CategroriesProviderProps) {
  const {
    categories: persistedCategories,
    loaded: dataLoaded,
    saveData,
  } = usePersistedData()
  const [categories, dispatch] = useReducer(categoriesReducer, [])

  useEffect(() => {
    if (dataLoaded) {
      setCategories(persistedCategories)
    }
  }, [dataLoaded, persistedCategories])

  useEffect(() => {
    if (dataLoaded && categories.length > 0) {
      saveData(StorageKey.categories, categories)
    }
  }, [dataLoaded, categories])

  const setCategories = useCallback(
    (categories: Category[]) => {
      dispatch({ type: 'SET_CATEGORIES', categories })
    },
    [dispatch],
  )

  const addCategory = useCallback(
    (category: Category) => {
      dispatch({ type: 'ADD_CATEGORY', category })
    },
    [dispatch],
  )

  const removeCategory = useCallback(
    (category: Category) => {
      const { name } = category

      dispatch({ type: 'REMOVE_CATEGORY', name })
    },
    [dispatch],
  )

  const updateCategory = useCallback(
    (category: Category) => {
      dispatch({ type: 'UPDATE_CATEGORY', category })
    },
    [dispatch],
  )

  const value = useMemo(() => {
    return {
      categories,
      addCategory,
      removeCategory,
      updateCategory,
    }
  }, [categories, addCategory, removeCategory, updateCategory])

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  )
}

export const useCategories = () => useContext(CategoriesContext)
