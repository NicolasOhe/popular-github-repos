import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { List, Typography, CircularProgress } from '@material-ui/core'

import ListEntry from './ListEntry'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    marginBottom: '1rem',
  },
  progress: {
    display: 'block',
    margin: '3rem auto',
  },
}))

export default function RepoList(props) {
  const { data, loading } = props
  const classes = useStyles()

  if (loading) {
    return <CircularProgress className={classes.progress} />
  }

  const noData = data.length === 0
  if (noData) {
    return (
      <Typography
        component="h5"
        variant="h5"
        className={classes.title}
        color="textPrimary"
      >
        No data.
      </Typography>
    )
  }

  return (
    <List className={classes.root}>
      {data.map((repoInfos) => (
        <ListEntry infos={repoInfos} />
      ))}
    </List>
  )
}
