import { Transaction, Category } from '@app/types'

type Action =
  | { type: 'SET_TRANSACTIONS'; transactions: Transaction[] }
  | { type: 'REMOVE_TRANSACTION'; id: Transaction['id'] }
  | { type: 'UPDATE_TRANSACTION'; transaction: Transaction }
  | {
      type: 'UPDATE_SIMILAR_TRANSACTIONS'
      description: Transaction['description']
      category: Category
    }

export function transactionsReducer(
  state: Transaction[],
  action: Action,
): Transaction[] {
  switch (action.type) {
    case 'SET_TRANSACTIONS':
      return action.transactions
    case 'REMOVE_TRANSACTION':
      return state.filter((transaction) => transaction.id !== action.id)
    case 'UPDATE_TRANSACTION':
      return state.map((transaction) =>
        transaction.id === action.transaction.id
          ? action.transaction
          : transaction,
      )
    case 'UPDATE_SIMILAR_TRANSACTIONS':
      return state.map((transaction) =>
        updateSimilarTransaction(
          transaction,
          action.description,
          action.category,
        ),
      )
    default:
      return state
  }
}

function updateSimilarTransaction(
  target: Transaction,
  description: Transaction['description'],
  category: Category,
): Transaction {
  const isSimilar = isSimilarTransaction(target.description, description)

  return isSimilar ? { ...target, category } : target
}

function isSimilarTransaction(
  target: Transaction['description'],
  compare: Transaction['description'],
): boolean {
  const targetFirstWord = target.split(' ')[0].toLowerCase()
  const compareFirstWord = compare.split(' ')[0].toLowerCase()

  return targetFirstWord === compareFirstWord
}
