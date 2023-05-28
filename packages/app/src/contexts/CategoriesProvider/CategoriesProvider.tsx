import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useMemo,
} from 'react'
import { Category } from '@app/types'

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
  const [categories, setCategories] = useState<Category[]>([])

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
