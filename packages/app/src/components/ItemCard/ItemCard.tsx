import React, { ReactNode } from 'react'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Button from '@mui/material/Button'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import * as Styles from './styles'

interface ItemCardProps {
  title: string
  description: string
  steps: string[]
  onAction: () => void
  addonBefore?: ReactNode
  addonAfter?: ReactNode
  addonActions?: ReactNode
}

export function ItemCard({
  title,
  description,
  steps,
  onAction,
  addonBefore,
  addonAfter,
  addonActions,
}: ItemCardProps) {
  return (
    <Styles.Wrapper>
      {addonBefore}
      <Styles.ItemCard>
        <Styles.ItemCardContent>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2">{description}</Typography>

          <List>
            {steps.map((step, index) => (
              <ListItem>
                <Styles.ListNumber>{index + 1}</Styles.ListNumber>
                <ListItemText primary={step} />
              </ListItem>
            ))}
          </List>
        </Styles.ItemCardContent>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            startIcon={<PlayCircleOutlineIcon />}
            onClick={onAction}
          >
            Start
          </Button>
          {addonActions}
        </CardActions>
      </Styles.ItemCard>
      {addonAfter}
    </Styles.Wrapper>
  )
}
