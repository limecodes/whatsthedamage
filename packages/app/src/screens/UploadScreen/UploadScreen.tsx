import React from 'react'
import { ParseResult } from 'papaparse'
import Container from '@mui/material/Container'
import { useTransactions } from '@app/contexts'
import { UploadTransactions } from '@app/components'
import { DataInputResult } from '@app/types'
import { createTransaction } from '@app/utils'

export function UploadScreen() {
  const { setTransactions } = useTransactions()

  const handleTransactionsResult = ({ data }: ParseResult<DataInputResult>) => {
    const [dataHeaders, ...dataRows] = data

    setTransactions(dataRows.map(dataRow => createTransaction(dataHeaders, dataRow)))
  }

  return (
    <Container>
      <UploadTransactions onTransactionsResult={handleTransactionsResult} />
    </Container>
  )
}
