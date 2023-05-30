import { Transaction, Category, Budget } from '@app/types'

// TODO: Anything dealing with Persisted<Type>
// should go into hooks/usePersistedData/types
// I have a separate type because the shape might sometimes be different
// At the moment, local storage is my data source however
// in the future if I switch to a server (rest/graphql) or indexed db
// the data shape coming from the data source might be different

export type PersistedData = Record<StorageKey, PersistedDataValue>

export type PersistedTransaction = Transaction

export type PersistedCategory = Omit<Category, 'inputValue'>

export type PersistedBudget = Budget

export type PersistedDataValue =
  | PersistedTransaction[]
  | PersistedCategory[]
  | PersistedBudget

export enum StorageKey {
  transactions = 'transactions',
  categories = 'categories',
  budget = 'budget',
}
