import {
  DataInputResult,
  DataInputHeader,
  RawTransaction,
  Transaction,
  TransactionType,
  Category,
} from '@app/types'
import { toPositiveNumber, toNumber, toInteger } from './helpers'
import { getUnixTimestamp } from './dateTimeHelpers'

export function createTransactions(
  rawData: DataInputResult[],
  categories: Category[],
): Transaction[] {
  const [dataHeaders, ...dataRows] = validateData(rawData)

  return dataRows
    .map((dataRow) => createTransaction(dataHeaders, dataRow, categories))
    .sort(sortTransactionAscending)
}

function createTransaction(
  dataHeaders: string[],
  dataRow: DataInputResult,
  categories: Category[],
): Transaction {
  const rawTransaction = parseRawTransaction(dataHeaders, dataRow)

  const date = rawTransaction[DataInputHeader.date]
  const time = rawTransaction[DataInputHeader.time]
  const timestamp = getUnixTimestamp({ date, time })
  const amount = toPositiveNumber(rawTransaction[DataInputHeader.amount])
  const description = rawTransaction[DataInputHeader.description]
  const balanceAfter = toNumber(rawTransaction[DataInputHeader.balanceAfter])
  const type = getTransactionType(rawTransaction[DataInputHeader.amount])
  const id = `${timestamp}-${toInteger(amount)}`
  const category = getCategory(description, categories)

  return {
    id,
    type,
    timestamp,
    amount,
    description,
    balanceAfter,
    category,
  }
}

function getCategory(
  description: Transaction['description'],
  categories: Category[],
): Category | null {
  if (categories.length === 0) return null

  const categoryByDescription = categories.find((category) =>
    category.associatedDescriptions?.includes(description),
  )

  return categoryByDescription ? categoryByDescription : null
}

function sortTransactionAscending(a: Transaction, b: Transaction) {
  return a.timestamp - b.timestamp
}

function parseRawTransaction(
  dataHeaders: string[],
  dataRow: DataInputResult,
): RawTransaction {
  const [rawTransaction, validIndices] = createRawTransaction(dataHeaders)

  Object.keys(rawTransaction).forEach((key, index) => {
    const castedKey = key as keyof RawTransaction

    if (validIndices.includes(index)) {
      rawTransaction[castedKey] = dataRow[index]
    }
  })

  return rawTransaction
}

function createRawTransaction(
  rawHeaders: string[],
): [RawTransaction, number[]] {
  const validIndices: number[] = []

  const rawTransaction = rawHeaders.reduce((acc, rawHeader, index) => {
    const validatedHeader = validateHeader(rawHeader)

    if (validatedHeader) {
      acc[validatedHeader] = ''
      validIndices.push(index)
    }

    return acc
  }, {} as RawTransaction)

  return [rawTransaction, validIndices]
}

function validateData(rawData: DataInputResult[]): DataInputResult[] {
  const [headers, ...rows] = rawData

  const validRows = rows.filter(
    (row) => row.length === headers.length && row.some((value) => value !== ''),
  )

  // I choose not to validate the headers here
  // Because I'll need to exclude any columns
  // In this function I'm mainly concerned about the raw data being valid
  return [headers, ...validRows]
}

function validateHeader(header: string): DataInputHeader | undefined {
  if (!Object.values(DataInputHeader).includes(header as DataInputHeader)) {
    console.warn(`Invalid header ${header}, skipping`)
    return
  }

  return header as DataInputHeader
}

function getTransactionType(rawAmount: string): TransactionType {
  const amount = toNumber(rawAmount)

  return amount > 0 ? 'credit' : 'debit'
}
