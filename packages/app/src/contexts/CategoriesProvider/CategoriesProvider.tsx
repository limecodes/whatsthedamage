import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useMemo,
  useEffect,
} from 'react'
import { Category, StorageKey } from '@app/types'
import { usePersistedData } from '@app/contexts'

type CategoriesContextValue = {
  categories: Category[]
  addCategory: (category: Category) => void
  removeCategory: (category: Category) => void
}

interface CategroriesProviderProps {
  children: ReactNode
}

const CategoriesContext = createContext<CategoriesContextValue>({
  categories: [],
  addCategory: () => {},
  removeCategory: () => {},
})

export function CategoriesProvider({ children }: CategroriesProviderProps) {
  const {
    categories: persistedCategories,
    loaded: dataLoaded,
    saveData,
  } = usePersistedData()
  const [categories, setCategories] = useState<Category[]>([])

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

  const addCategory = (category: Category) => {
    setCategories([...categories, category])
  }

  const removeCategory = (category: Category) => {
    setCategories(categories.filter((c) => c !== category))
  }

  const value = useMemo(() => {
    return {
      categories,
      addCategory,
      removeCategory,
    }
  }, [categories, addCategory, removeCategory])

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  )
}

export const useCategories = () => useContext(CategoriesContext)
