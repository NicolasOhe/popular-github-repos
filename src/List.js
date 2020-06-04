import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  List,
  ListItem,
  ListItemText,
  Chip,
  Typography,
  CircularProgress,
} from '@material-ui/core'
import StarIcon from '@material-ui/icons/Star'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '1200px',
    backgroundColor: theme.palette.background.paper,
  },
  listItem: {
    border: '1px solid lightgrey',
    marginBottom: '1rem',
  },
  link: {
    textDecoration: 'none',
  },
  title: {
    marginBottom: '1rem',
  },
  chip: {
    marginLeft: '1rem',
    pointerEvents: 'none',
  },
  star: {
    verticalAlign: 'middle',
    width: '1rem',
    transform: 'translateY(-2px)',
  },
  progress: {
    display: 'block',
    margin: '3rem auto',
  },
}))

function ListItemLink(props) {
  const classes = useStyles()
  return (
    <ListItem button className={classes.listItem} component="li">
      <a href={props.href} className={classes.link}>
        {props.children}
      </a>
    </ListItem>
  )
}

export default function FolderList(props) {
  const { data, loading } = props
  const classes = useStyles()

  if (loading) {
    return <CircularProgress className={classes.progress} />
  }

  return (
    <List className={classes.root}>
      {data.length === 0 && (
        <div>No data was found with your selected options</div>
      )}
      {data.map(
        ({ name, stargazers_count, description, svn_url, language }, i) => (
          <ListItemLink href={svn_url} key={i}>
            <ListItemText
              primary={
                <>
                  <Typography
                    component="h5"
                    variant="h5"
                    className={classes.title}
                    color="textPrimary"
                  >
                    <span>{name}</span>
                    <Chip
                      className={classes.chip}
                      label={
                        <>
                          <span>{stargazers_count}</span>
                          <StarIcon color="error" className={classes.star} />
                        </>
                      }
                    />
                  </Typography>
                </>
              }
              secondary={
                <>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {description || 'No description.'}
                  </Typography>
                  {language && (
                    <Chip
                      className={classes.chip}
                      label={<span>{language}</span>}
                    />
                  )}
                </>
              }
            />
          </ListItemLink>
        )
      )}
    </List>
  )
}
