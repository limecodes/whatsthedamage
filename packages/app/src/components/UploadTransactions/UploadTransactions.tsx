import React, { ChangeEvent } from 'react'
import Papa, { ParseResult } from 'papaparse'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { FileUpload } from '@app/components/FileUpload'
import { DataInputResult } from '@app/types'

interface UploadTransactionsProps {
  onTransactionsResult: (results: ParseResult<DataInputResult>) => void
}

export function UploadTransactions({
  onTransactionsResult,
}: UploadTransactionsProps) {
  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]

    if (file) {
      Papa.parse(file, {
        complete: onTransactionsResult,
      })
    }
  }

  return (
    <Card>
      <CardHeader title="Step 1" />
      <CardContent>
        <p>Upload your statement in csv format.</p>
        <p>Retrieve a CSV statement for the period that you want to analyse.</p>
        <p>Normally it's from your last pay up to the latest pay.</p>
        <FileUpload onFileUpload={handleFile} />
      </CardContent>
    </Card>
  )
}
