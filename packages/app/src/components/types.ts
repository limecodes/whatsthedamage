export type RawTransaction = {
  [key in CamelCasedHeader]?: string
}

export type DateTimeObject = {
  date: string
  time: string
}

export type RawHeader =
  | 'Date'
  | 'Time'
  | 'Category'
  | 'Card'
  | 'Operation description'
  | 'Card currency amount'
  | 'Card currency'
  | 'Transaction currency amount'
  | 'Transaction currency'
  | 'Ending balance'
  | 'Rest currency'

export type CamelCasedHeader =
  | 'date'
  | 'time'
  | 'category'
  | 'card'
  | 'operationDescription'
  | 'cardCurrencyAmount'
  | 'cardCurrency'
  | 'transactionCurrencyAmount'
  | 'transactionCurrency'
  | 'endingBalance'
  | 'restCurrency'

export type Transaction = {
  timestamp: number
  amount: number
  description: string
  balanceAfter: number
}
