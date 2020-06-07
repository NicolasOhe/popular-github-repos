import React from 'react'
import { Box, Grid } from '@material-ui/core'

import DateFilter from './DateFilter'
import LanguagesFilter from './LanguagesFilter'

export default function Settings() {
  return (
    <Box color="text.primary">
      <Grid container justify="space-between">
        <DateFilter />
        <LanguagesFilter />
      </Grid>
    </Box>
  )
}
