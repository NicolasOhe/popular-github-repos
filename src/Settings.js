import React from 'react'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import 'date-fns'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import {
  Input,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Box,
  Grid,
} from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import {
  setSelectedDate,
  setSelectedLanguages,
  fetchPopularRepos,
} from './store/actions/repos'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(6, 0, 3),
  },
  lightBulb: {
    verticalAlign: 'middle',
    marginRight: theme.spacing(1),
  },
  formControl: {
    //margin: theme.spacing(1),
    minWidth: 220,
    maxWidth: 300,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}))

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const languages = [
  'TypeScript',
  'JavaScript',
  'C',
  'C++',
  'Python',
  'Go',
  'Rust',
  'Kotlin',
].sort()

function getStyles(name, selectedLanguages, theme) {
  return {
    fontWeight:
      selectedLanguages.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  }
}

export default function Settings(props) {
  const dispatch = useDispatch()
  const selectedDate = useSelector((state) => state.repos.selectedDate)
  const selectedLanguages = useSelector(
    (state) => state.repos.selectedLanguages
  )
  const classes = useStyles()
  const theme = useTheme()

  const handleLanguageChange = (event) => {
    dispatch(setSelectedLanguages(event.target.value))
    dispatch(fetchPopularRepos())
  }

  const handleDateChange = (date) => {
    dispatch(setSelectedDate(date))
    dispatch(fetchPopularRepos())
  }

  return (
    <Box color="text.primary">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-between">
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
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-name-label">
              Languages filter
            </InputLabel>
            <Select
              labelId="demo-mutiple-name-label"
              id="demo-mutiple-name"
              multiple
              value={selectedLanguages}
              onChange={handleLanguageChange}
              input={<Input />}
              MenuProps={MenuProps}
            >
              {languages.map((language) => (
                <MenuItem
                  key={language}
                  value={language}
                  style={getStyles(language, selectedLanguages, theme)}
                >
                  {language}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </MuiPickersUtilsProvider>
    </Box>
  )
}
