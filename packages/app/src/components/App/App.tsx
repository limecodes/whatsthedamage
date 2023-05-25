import React, { useState, ChangeEvent } from 'react'
import Papa, { ParseResult } from 'papaparse'
import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { FileUpload } from '../FileUpload'
import { UploadTransactions } from '../UploadTransactions'
import { toCamelCase, getUnixTimestamp, rawToCamelCasedHeader, toPositiveNumber, toNumber } from './utils'
import { RawTransaction, RawHeader, Transaction } from './types'

function convertRawToTransaction(
  rawTransaction: RawTransaction,
): Transaction | undefined {
  const {
    date = '',
    time = '',
    cardCurrencyAmount,
    operationDescription = '',
    endingBalance,
  } = rawTransaction

  if (!cardCurrencyAmount || !endingBalance) return undefined

  return {
    timestamp: getUnixTimestamp({ date, time }),
    amount: Math.abs(Number(cardCurrencyAmount)),
    description: operationDescription,
    balanceAfter: Number(endingBalance),
  }
}

function createTransaction(
  headers: RawHeader[],
  row: string[],
): Transaction | undefined {
  const rawTransaction = headers.reduce((acc, header, index) => {
    acc[rawToCamelCasedHeader(header)] = ''
    return acc
  }, {} as RawTransaction)

  Object.keys(rawTransaction).map((key, index) => {
    rawTransaction[key as keyof RawTransaction] = row[index]
  })

  return convertRawToTransaction(rawTransaction)
}

function parseResultsToTransactions(
  results: ParseResult<string[]>,
): Transaction[] {
  if (!results.data || results.data.length === 0) return []

  const [headers, ...rows] = results.data

  return rows.reduce((transactions: Transaction[], row: string[]) => {
    const transaction = createTransaction(headers as RawHeader[], row)
    if (transaction) {
      transactions.push(transaction)
    }

    return transactions
  }, [])
}

export function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files && event.target.files[0]
    if (file) {
      Papa.parse(file, {
        complete: function (results: ParseResult<string[]>) {
          const transactions = parseResultsToTransactions(results)

          setTransactions(transactions)
        },
      })
    }
  }

  return (
    <Container>
      {transactions.length > 0 ? <p>{JSON.stringify(transactions)}</p> : <UploadTransactions onSubmitFile={handleFile} />}
    </Container>
  )
}
