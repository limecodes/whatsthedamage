import { SxProps } from '@mui/system'
import { Theme } from '@mui/material'

export const withStyles =
  <P extends {}>(styles: SxProps<Theme>) =>
  (Component: React.FC<P>) => {
    return (props: P) => <Component {...props} sx={styles} />
  }
