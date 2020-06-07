import React from 'react'
import { Box, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import DateFilter from './DateFilter'
import LanguagesFilter from './LanguagesFilter'

const useStyles = makeStyles((theme) => ({
  grid: {
    justifyContent: 'space-between',

    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
    },
  },
}))

export default function Settings() {
  const classes = useStyles()
  return (
    <Box color="text.primary">
      <Grid container className={classes.grid}>
        <DateFilter />
        <LanguagesFilter />
      </Grid>
    </Box>
  )
}
