import {
  DataInputResult,
  DataInputHeader,
  RawTransaction,
  Transaction,
  TransactionType,
} from '@app/types'
import { toPositiveNumber, toNumber, toInteger } from './helpers'
import { getUnixTimestamp } from './dateTimeHelpers'

export function createTransactions(rawData: DataInputResult[]): Transaction[] {
  const [dataHeaders, ...dataRows] = validateData(rawData)

  return dataRows
    .map((dataRow) => createTransaction(dataHeaders, dataRow))
    .sort(sortTransactionAscending)
}

function createTransaction(
  dataHeaders: string[],
  dataRow: DataInputResult,
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

  return {
    id,
    type,
    timestamp,
    amount,
    description,
    balanceAfter,
    // Categories should be initialised with simply null
    // I don't want to use the provided categories
    category: null,
  }
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
