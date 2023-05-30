import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import SaveIcon from '@mui/icons-material/Save'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useTransactions, useCategories } from '@app/contexts'
import { Transaction, Report, Budget } from '@app/types'
import { toPositiveNumber } from '@app/utils'

export function ReportScreen() {
  const navigate = useNavigate()
  const { transactions } = useTransactions()
  const { categories } = useCategories()

  useEffect(() => {
    if (transactions.length === 0) {
      navigate('/upload')
    }
  }, [transactions, navigate])

  const report: Report = categories.reduce((acc, category) => {
    acc.set(category.name, 0)
    return acc
  }, new Map<string, number>())

  report.set('Uncategorised', 0)

  transactions.forEach((transaction) => {
    const { category, amount, type } = transaction

    const categoryName = category ? category.name : 'Uncategorised'
    const adjustedAmount = type === 'debit' ? -amount : amount
    const currentTotal = report.get(categoryName) || 0

    report.set(categoryName, currentTotal + adjustedAmount)
  })

  const goBack = () => {
    navigate('/transactions')
  }

  // TODO: I should adjust the toNumber function
  // to convert to a decimal financial number
  // So that my type is <string, number>
  // So that I don't use the "toFixed" method
  // as it's inaccurate for financial transactions
  const handleSaveReport = () => {
    const reportObj = Array.from(report).reduce(
      (acc, [category, total]) => ({
        ...acc,
        [category]: toPositiveNumber(total).toFixed(2),
      }),
      {} as Budget,
    )

    localStorage.setItem('budget', JSON.stringify(reportObj))
  }

  return (
    <Container>
      <Card>
        <CardHeader title="Expense Report" />
        <CardContent>
          {Array.from(report).map(([category, total]) => (
            <div key={category}>
              <strong>{category}: </strong> {toPositiveNumber(total).toFixed(2)}
            </div>
          ))}
          <Button
            variant="contained"
            color="primary"
            startIcon={<ArrowBackIcon />}
            onClick={goBack}
            style={{ marginRight: '15px' }}
          >
            Go Back
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<SaveIcon />}
            onClick={handleSaveReport}
          >
            Save Budget
          </Button>
        </CardContent>
      </Card>
    </Container>
  )
}
