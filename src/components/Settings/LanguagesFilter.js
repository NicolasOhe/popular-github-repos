import React from 'react'

import { makeStyles, useTheme } from '@material-ui/core/styles'
import {
  Input,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import {
  setSelectedLanguages,
  fetchPopularRepos,
} from '../../store/actions/repos'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2, 0, 1, 0),
    minWidth: 220,
    maxWidth: 300,
  },
}))

// TODO: fetch availble languages from some remote source
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

export default function LanguagesFilter() {
  const dispatch = useDispatch()

  const selectedLanguages = useSelector(
    (state) => state.repos.selectedLanguages
  )
  const classes = useStyles()
  const theme = useTheme()

  const handleLanguageChange = (event) => {
    dispatch(setSelectedLanguages(event.target.value))
    dispatch(fetchPopularRepos())
  }

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="languages-filter-label">Languages filter</InputLabel>
      <Select
        labelId="languages-filter-label"
        id="languages-filter"
        multiple
        value={selectedLanguages}
        onChange={handleLanguageChange}
        input={<Input />}
        color="secondary"
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
  )
}
