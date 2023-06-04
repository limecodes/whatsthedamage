import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ParseResult } from 'papaparse'
import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useTransactions, useCategories } from '@app/contexts'
import { UploadTransactions } from '@app/components'
import { DataInputResult } from '@app/types'
import { createTransactions } from '@app/utils'

export function UploadScreen() {
  const navigate = useNavigate()
  const { categories } = useCategories()
  const { setTransactions } = useTransactions()

  const handleTransactionsResult = useCallback(
    ({ data }: ParseResult<DataInputResult>) =>
      setTransactions(createTransactions(data, categories)),
    [setTransactions, categories],
  )

  const handleContinue = useCallback(() => {
    navigate('/transactions')
  }, [navigate])

  // TODO: Show the error to the user
  const handleError = (err: Error) => {
    console.error(`Something went wrong uploading the file: ${err}`)
  }

  return (
    <Container>
      <Card>
        <CardHeader title="Step 1" />
        <CardContent>
          <p>Upload your statement in csv format.</p>
          <p>
            Retrieve a CSV statement for the period that you want to analyse.
          </p>
          <p>Normally it's from your last pay up to the latest pay.</p>
          <UploadTransactions
            onComplete={handleTransactionsResult}
            onError={handleError}
            onContinue={handleContinue}
          />
        </CardContent>
      </Card>
    </Container>
  )
}
