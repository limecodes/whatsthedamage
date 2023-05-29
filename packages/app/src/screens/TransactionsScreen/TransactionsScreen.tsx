import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '@mui/material/Container'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import NavigationIcon from '@mui/icons-material/Navigation'
import FavoriteIcon from '@mui/icons-material/Favorite'
import EditIcon from '@mui/icons-material/Edit'
import { useTransactions } from '@app/contexts'
import { TransactionTable } from '@app/components'

export function TransactionsScreen() {
  const navigate = useNavigate()
  const { transactions, saveToLocalStorage } = useTransactions()

  useEffect(() => {
    if (transactions.length === 0) {
      navigate('/upload')
    }
  }, [transactions, navigate])

  const handleBuildReport = () => {
    navigate('/report')
  }

  return (
    <Container>
      <AppBar position="sticky" style={{ backgroundColor: 'lightgray' }}>
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
          <Fab
            onClick={saveToLocalStorage}
            color="primary"
            aria-label="add"
            variant="extended"
          >
            <AddIcon />
            Save draft
          </Fab>
          <Fab
            onClick={handleBuildReport}
            color="secondary"
            aria-label="edit"
            variant="extended"
          >
            <EditIcon />
            Build report
          </Fab>
          <Fab variant="extended">
            <NavigationIcon sx={{ mr: 1 }} />
            Navigate
          </Fab>
          <Fab disabled aria-label="like">
            <FavoriteIcon />
          </Fab>
        </Box>
      </AppBar>

      <TransactionTable />
    </Container>
  )
}
