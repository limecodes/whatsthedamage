export type TransactionType = 'credit' | 'debit'

export type Transaction = {
  id: string
  type: TransactionType
  timestamp: number
  amount: number
  description: string
  balanceAfter: number
  category: Category | null
}

export type CategoryName = string

export type Category = {
  name: CategoryName
  inputValue?: string
}

// TODO: Anything dealing with Persisted<Type>
// should go into hooks/usePersistedData/types
// I have a separate type because the shape might sometimes be different
// At the moment, local storage is my data source however
// in the future if I switch to a server (rest/graphql) or indexed db
// the data shape coming from the data source might be different
export type PersistedDataValue = PersistedTransaction[] | PersistedCategory[] | PersistedBudget

export type PersistedCategory = Omit<Category, 'inputValue'>
export type PersistedTransaction = Transaction
export type PersistedBudget = Budget

export enum StorageKey {
	transactions = 'transactions',
  categories = 'categories',
  budget = 'budget'
}

export type Report = Map<CategoryName, number>
export type Budget = Record<CategoryName, string>

export enum DataInputHeader {
  date = 'Date',
  time = 'Time',
  category = 'Category',
  card = 'Card',
  description = 'Operation description',
  amount = 'Card currency amount',
  currency = 'Card currency',
  transactionCurrencyAmount = 'Transaction currency amount',
  transactionCurrency = 'Transaction currency',
  balanceAfter = 'Ending balance',
  restCurrency = 'Rest currency',
}

export type RawTransaction = Record<DataInputHeader, string>

export type DataInputResult = string[]
