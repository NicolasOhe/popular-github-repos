import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import StarIcon from '@material-ui/icons/Star'
import { useSelector } from 'react-redux'
import { ListItem, ListItemText, Chip, Typography } from '@material-ui/core'
import StarButton from './StarButton'

const useStyles = makeStyles((theme) => ({
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
  itemContent: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  itemDescription: {
    flexGrow: '1',
  },
}))

export default function ListEntry(props) {
  const {
    infos: {
      name,
      language,
      description,
      svn_url,
      full_name,
      stargazers_count,
    },
  } = props
  const starred = useSelector((state) => state.stars.starsList)
  const classes = useStyles()

  const Header = (
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
                {stargazers_count + (starred.includes(full_name) ? 1 : 0)}
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
  )

  const Body = (
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
      <StarButton fullName={full_name} />
    </>
  )

  return (
    <ListItem button className={classes.listItem} component="li">
      <a href={svn_url} className={classes.link}>
        <ListItemText
          primary={Header}
          secondaryTypographyProps={{ className: classes.itemContent }}
          secondary={Body}
        />
      </a>
    </ListItem>
  )
}
