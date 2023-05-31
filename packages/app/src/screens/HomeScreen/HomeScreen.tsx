import React from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { ItemCard } from '@app/components'
import { useTransactions } from '@app/contexts'

type Action = 'setup' | 'track' | 'forecast'

export function HomeScreen() {
  const navigate = useNavigate()
  // TODO: Loaded doesn't seem appropriate for what I'm doing
  const { loaded: transactionsLoaded } = useTransactions()

  // This can be a function factory to return based on action
  const handleAction = (action: Action) => () => {
    console.log('action click', action)
    switch (action) {
      case 'setup':
        navigate(transactionsLoaded ? '/transactions' : '/upload')
        break
      case 'track':
        navigate('/track')
        break
      case 'forecast':
        navigate('/forecast')
        break
      default:
        break
    }
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Home screen
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <ItemCard
            title="Setup budget"
            description="Define your budget based on the previous month's transactions."
            steps={[
              'Import your transactions from the previous month.',
              'Categorise your transactions.',
              'Examine your expenditure for each category.',
              'Establish your ideal budget per category.',
            ]}
            buttonText={transactionsLoaded ? 'Continue' : 'Start'}
            onAction={handleAction('setup')}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <ItemCard
            title="Track Spending"
            description="Monitor your expenditure against your budget by logging your
                transactions."
            steps={[
              'Import your transactions since your last payday.',
              'Let the app automatically recognize and categorize your transactions.',
              'Monitor your spending against your budget.',
            ]}
            buttonText={'Start'}
            onAction={handleAction('track')}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <ItemCard
            title="Forecast Your Cash Flow"
            description="Predict how your savings will accumulate based on your income
                and spending habits. Visualize the impact of potential purchases
                on your savings."
            steps={[
              'Enter your projected income for the upcoming period.',
              'Input any planned or "wish-list" purchases.',
              'See the projected impact on your savings.',
              "Note: This feature assists with impulse purchases and ensures you're on track with your budget.",
            ]}
            buttonText={'Start'}
            onAction={handleAction('forecast')}
          />
        </Grid>
      </Grid>
    </Container>
  )
}
