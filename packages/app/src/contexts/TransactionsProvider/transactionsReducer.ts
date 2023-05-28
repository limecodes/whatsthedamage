import { Transaction } from '@app/types'

type Action =
  | { type: 'SET_TRANSACTIONS'; transactions: Transaction[] }
  | { type: 'REMOVE_TRANSACTION'; id: Transaction['id'] }
  | { type: 'UPDATE_TRANSACTION'; transaction: Transaction }

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
        transaction.id === action.transaction.id ? action.transaction : transaction,
      )
    default:
      return state
  }
}
