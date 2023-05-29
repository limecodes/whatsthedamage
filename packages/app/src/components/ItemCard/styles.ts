import Box, { BoxProps } from '@mui/material/Box'
import Card, { CardProps } from '@mui/material/Card'
import Avatar, { AvatarProps } from '@mui/material/Avatar'
import { withStyles } from '@app/styles'

// I'm on the fence on the convention
// Either I do "Styled{MUI Component}"
// Or Styles.{Purpose of the component}

export const Wrapper = withStyles<BoxProps>({
  display: 'flex',
  height: '100%',
  flexDirection: 'column',
})(Box)

export const ItemCard = withStyles<CardProps>({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  p: 3,
})(Card)

export const ItemCardContent = withStyles<BoxProps>({
  flexGrow: 1,
})(Box)

export const ListNumber = withStyles<AvatarProps>({
  width: 24,
  height: 24,
  fontSize: '0.75rem',
  marginRight: 2,
})(Avatar)
