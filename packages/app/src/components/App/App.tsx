import React, { useState, ChangeEvent } from 'react'
import Papa, { ParseResult } from 'papaparse'
import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { FileUpload } from '../FileUpload'
import { toCamelCase } from '../../utils'
import { RawTransaction } from './types'

function createRawTransaction(headers: string[], row: string[]): RawTransaction {
  const rawTransaction: RawTransaction = {}

  headers.forEach(header => {
  	rawTransaction[toCamelCase(header)] = ''
  })

  Object.keys(rawTransaction).map((key, index) => {
    rawTransaction[key as keyof RawTransaction] = row[index]
  })

  return rawTransaction
}

function parseData(results: ParseResult<string[]>) {
  if (!results.data || results.data.length === 0) return []

  const [headers, ...rawData] = results.data

  return rawData.map((result, i) => {
    return createRawTransaction(headers, result)
  })
}

export function App() {
  const [transactions, setTransactions] = useState<RawTransaction[]>([])

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files && event.target.files[0]
    if (file) {
      Papa.parse(file, {
        complete: function(results: ParseResult<string[]>) {
        	const rawTransactions = parseData(results)

        	setTransactions(rawTransactions)
        },
      })
    }
  }

  return (
    <Container>
    	<p>{JSON.stringify(transactions)}</p>
      <Card>
        <CardHeader title="Step 1" />
        <CardContent>
          <p>Upload your statement in csv format.</p>
          <p>
            Retrieve a CSV statement for the period that you want to analyse.
          </p>
          <p>Normally it's from your last pay up to the latest pay.</p>
          <FileUpload onFileUpload={handleFile} />
        </CardContent>
      </Card>
    </Container>
  )
}
