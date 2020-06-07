import React from 'react'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import 'date-fns'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

import { setSelectedDate, fetchPopularRepos } from '../../store/actions/repos'

const useStyles = makeStyles(() => ({
  root: {
    margin: 0,
  },
}))

export default function LanguagesFilter() {
  const dispatch = useDispatch()
  const classes = useStyles()
  const selectedDate = useSelector((state) => state.repos.selectedDate)

  const handleDateChange = (date) => {
    dispatch(setSelectedDate(date))
    dispatch(fetchPopularRepos())
  }

  return (
    <MuiPickersUtilsProvider className={classes.root} utils={DateFnsUtils}>
      <KeyboardDatePicker
        margin="normal"
        id="date-picker-dialog"
        label="Show most popular since:"
        format="MM/dd/yyyy"
        value={selectedDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
    </MuiPickersUtilsProvider>
  )
}
