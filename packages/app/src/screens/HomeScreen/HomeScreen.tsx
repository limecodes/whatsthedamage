import React from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'

export function HomeScreen() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Home screen
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Setup Budget
            </Typography>
            <Typography variant="body2">
              Define your budget based on the previous month's transactions.
            </Typography>
            <List>
              <ListItem>
                Import your transactions from the previous month.
              </ListItem>
              <ListItem>Categorise your transactions.</ListItem>
              <ListItem>Examine your expenditure for each category.</ListItem>
              <ListItem>Establish your ideal budget per category.</ListItem>
            </List>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                startIcon={<PlayCircleOutlineIcon />}
              >
                Start
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Track Spending
            </Typography>
            <Typography variant="body2">
              Monitor your expenditure against your budget by logging your
              transactions.
            </Typography>
            <List>
              <ListItem>
                Import your transactions since your last payday.
              </ListItem>
              <ListItem>
                Let the app automatically recognize and categorize your
                transactions.
              </ListItem>
              <ListItem>Monitor your spending against your budget.</ListItem>
            </List>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                startIcon={<PlayCircleOutlineIcon />}
              >
                Start
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Forecast Your Cash Flow
            </Typography>
            <Typography variant="body2">
              Predict how your savings will accumulate based on your income and
              spending habits. Visualize the impact of potential purchases on
              your savings.
            </Typography>
            <List>
              <ListItem>
                Enter your projected income for the upcoming period.
              </ListItem>
              <ListItem>Input any planned or "wish-list" purchases.</ListItem>
              <ListItem>See the projected impact on your savings.</ListItem>
              <ListItem>
                Note: This feature assists with impulse purchases and ensures
                you're on track with your budget.
              </ListItem>
            </List>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                startIcon={<PlayCircleOutlineIcon />}
              >
                Start
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}
