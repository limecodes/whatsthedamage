import { Category } from '@app/types'

type Action =
  | { type: 'SET_CATEGORIES'; categories: Category[] }
  | { type: 'ADD_CATEGORY'; category: Category }
  | { type: 'UPDATE_CATEGORY'; category: Category }
  | { type: 'REMOVE_CATEGORY'; name: Category['name'] }
  | { type: 'CLEAR_CATEGORIES' }

export function categoriesReducer(
  state: Category[],
  action: Action,
): Category[] {
  switch (action.type) {
    case 'SET_CATEGORIES':
      return action.categories
    case 'ADD_CATEGORY':
      return [...state, action.category]
    case 'UPDATE_CATEGORY':
      return state.map((category) =>
        category.name === action.category.name ? action.category : category,
      )
    case 'REMOVE_CATEGORY':
      return state.filter((category) => category.name !== action.name)
    case 'CLEAR_CATEGORIES':
      return []
    default:
      return state
  }
}
