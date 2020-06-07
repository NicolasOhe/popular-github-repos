import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { List, Typography, CircularProgress } from '@material-ui/core'

import ListEntry from './ListEntry'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  noData: {
    marginTop: '2rem',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  progress: {
    display: 'block',
    margin: '3rem auto',
  },
}))

export default function RepoList(props) {
  const { data, loading, noDataMessage } = props
  const classes = useStyles()

  if (loading) {
    return <CircularProgress className={classes.progress} />
  }

  const noData = data.length === 0
  if (noData) {
    return (
      <Typography
        component="p"
        variant="p"
        className={classes.noData}
        color="textPrimary"
      >
        {noDataMessage || 'No data.'}
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
