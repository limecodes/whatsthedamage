import {
  DataInputResult,
  DataInputHeader,
  RawTransaction,
  Transaction,
} from '@app/types'
import { toPositiveNumber, toNumber, toInteger } from './helpers'
import { getUnixTimestamp } from './dateTimeHelpers'

export function createTransactions(rawData: DataInputResult[]): Transaction[] {
  const [dataHeaders, ...dataRows] = rawData

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
  const id = `${timestamp}-${toInteger(amount)}`

  return {
    id,
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

function validateHeader(header: string): DataInputHeader | undefined {
  if (!Object.values(DataInputHeader).includes(header as DataInputHeader)) {
    console.warn(`Invalid header ${header}, skipping`)
    return
  }

  return header as DataInputHeader
}
