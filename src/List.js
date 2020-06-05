import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import StarIcon from '@material-ui/icons/Star'
import {
  List,
  ListItem,
  ListItemText,
  Chip,
  Typography,
  CircularProgress,
  Button,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '1200px',
    backgroundColor: theme.palette.background.paper,
  },
  listItem: {
    border: '1px solid lightgrey',
    marginBottom: '1.5rem',
  },
  link: {
    textDecoration: 'none',
    width: '100%',
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
  starButton: {
    marginLeft: '1rem',
    width: '8rem',
    flexShrink: '0',
  },
  itemContent: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  itemDescription: {
    flexGrow: '1',
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
  const { data, loading, onStarClick, starred } = props
  const classes = useStyles()
  console.log(data)
  if (loading) {
    return <CircularProgress className={classes.progress} />
  }

  return (
    <List className={classes.root}>
      {data.length === 0 && (
        <div>No data was found with your selected options</div>
      )}
      {data.map(
        ({
          name,
          stargazers_count,
          description,
          svn_url,
          language,
          id,
          full_name,
        }) => (
          <ListItemLink href={svn_url} key={id}>
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
                          <span>
                            {stargazers_count +
                              (starred.includes(full_name) ? 1 : 0)}
                          </span>
                          <StarIcon color="error" className={classes.star} />
                        </>
                      }
                    />
                    {language && (
                      <Chip
                        component="span"
                        className={classes.chip}
                        label={<span>{language}</span>}
                      />
                    )}
                  </Typography>
                </>
              }
              secondaryTypographyProps={{ className: classes.itemContent }}
              secondary={
                <>
                  <span className={classes.itemDescription}>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {description || 'No description.'}
                    </Typography>
                  </span>
                  <Button
                    className={classes.starButton}
                    variant="contained"
                    color="primary"
                    onClick={(e) => {
                      e.preventDefault()
                      onStarClick(full_name)
                    }}
                  >
                    {starred.includes(full_name) ? 'Starred' : 'Star'}
                  </Button>
                </>
              }
            />
          </ListItemLink>
        )
      )}
    </List>
  )
}
