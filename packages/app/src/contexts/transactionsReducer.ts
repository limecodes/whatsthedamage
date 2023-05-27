import { Transaction } from '@app/types'

type Action =
  | { type: 'SET_TRANSACTIONS'; payload: Transaction[] }
  | { type: 'REMOVE_TRANSACTION'; payload: string }
  | { type: 'UPDATE_TRANSACTION'; payload: Transaction }

export function transactionsReducer(
  state: Transaction[],
  action: Action,
): Transaction[] {
  switch (action.type) {
    case 'SET_TRANSACTIONS':
      return action.payload
    case 'REMOVE_TRANSACTION':
      return state.filter((transaction) => transaction.id !== action.payload)
    case 'UPDATE_TRANSACTION':
      return state.map((transaction) =>
        transaction.id === action.payload.id ? action.payload : transaction,
      )
    default:
      return state
  }
}
