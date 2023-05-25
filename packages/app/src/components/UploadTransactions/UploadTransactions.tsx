import React, { ChangeEvent } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { FileUpload } from '../FileUpload'

interface UploadTransactionsProps {
	onSubmitFile: (event: ChangeEvent<HTMLInputElement>) => void
}

export function UploadTransactions({ onSubmitFile }: UploadTransactionsProps) {
  return (
    <Card>
      <CardHeader title="Step 1" />
      <CardContent>
        <p>Upload your statement in csv format.</p>
        <p>Retrieve a CSV statement for the period that you want to analyse.</p>
        <p>Normally it's from your last pay up to the latest pay.</p>
        <FileUpload onFileUpload={onSubmitFile} />
      </CardContent>
    </Card>
  )
}
