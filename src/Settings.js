import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link, Typography, Box } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(6, 0, 3),
  },
  lightBulb: {
    verticalAlign: 'middle',
    marginRight: theme.spacing(1),
  },
}))

export default function Settings() {
  const classes = useStyles()
  return (
    <Box color="text.primary">
      <Typography className={classes.root} color="textSecondary">
        Pro tip: See more{' '}
        <Link href="https://material-ui.com/getting-started/templates/">
          templates
        </Link>{' '}
        on the Material-UI documentation.
      </Typography>
      ho la la
    </Box>
  )
}
