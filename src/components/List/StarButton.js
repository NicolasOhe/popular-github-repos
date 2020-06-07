import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { useSelector, useDispatch } from 'react-redux'
import { Button } from '@material-ui/core'
import StarIcon from '@material-ui/icons/Star'
import { toggleStar } from '../../store/actions/stars'

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: '1rem',
    marginTop: '1rem',
    width: '8rem',
    flexShrink: '0',
    display: 'flex',
    justifyContent: 'space-evenly',

    [theme.breakpoints.down('xs')]: {
      marginLeft: '0',
    },
  },
}))

export default function StarButton({ fullName }) {
  const dispatch = useDispatch()
  const starred = useSelector((state) => state.stars.starsList)
  const classes = useStyles()

  const handleClick = (event) => {
    event.preventDefault()
    dispatch(toggleStar(fullName))
  }

  return (
    <Button
      className={classes.root}
      variant="outlined"
      onClick={handleClick}
      outlined
    >
      {starred.includes(fullName) ? 'Remove  ' : 'Add  '}
      <StarIcon color="secondary" className={classes.star} />
    </Button>
  )
}
