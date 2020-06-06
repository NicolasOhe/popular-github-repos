import * as actions from './actionTypes'

const setStarred = (data) => {
  return {
    type: actions.STARS_SET,
    data,
  }
}

const setStarredInfos = (data) => {
  return {
    type: actions.STARS_SET_INFOS,
    data,
  }
}

const addStar = (fullName) => {
  return {
    type: actions.STARS_ADD,
    fullName,
  }
}

const removeStar = (fullName) => {
  return {
    type: actions.STARS_REMOVE,
    fullName,
  }
}

const addStarInfo = (info) => {
  return {
    type: actions.STARS_ADD_INFO,
    info,
  }
}

const removeStarInfo = (fullName) => {
  return {
    type: actions.STARS_REMOVE_INFO,
    fullName,
  }
}

const setLoading = (value) => {
  return {
    type: actions.STARS_SET_LOADING,
    value,
  }
}

const setError = (value) => {
  return {
    type: actions.STARS_SET_ERROR,
    value,
  }
}

export function initStars() {
  return async (dispatch) => {
    let savedStars
    try {
      const savedStarsString = window.localStorage.getItem('starred')
      savedStars = JSON.parse(savedStarsString)
      dispatch(setStarred(savedStars))
    } catch (e) {
      console.error(
        'Error parsing the starred repos saved in local storage:',
        e
      )
      dispatch(setError(true))
      return
    }

    dispatch(setLoading(true))
    const requests = savedStars.map((fullName) =>
      fetch(`https://api.github.com/repos/${fullName}`)
    )
    try {
      const rawResponseArray = await Promise.all(requests)
      const pendingResults = rawResponseArray.map((result) => result.json())
      const results = await Promise.all(pendingResults)
      dispatch(setStarredInfos(results))
      dispatch(setLoading(false))
    } catch (e) {
      console.error(e)
      dispatch(setLoading(false))
      dispatch(setError(true))
    }
  }
}

export const toggleStar = (fullName) => {
  return (dispatch, getState) => {
    const { starsList } = getState().stars
    const isRemove = starsList.includes(fullName)

    if (isRemove) {
      dispatch(removeStar(fullName))
      dispatch(removeStarInfo(fullName))
    } else {
      dispatch(addStar(fullName))
      const { register } = getState().repos
      const data = register[fullName]
      dispatch(addStarInfo(data))
    }
    // getState() seems to make a snapshot of the state:
    // starsList is outdated at this point.
    const updatedStarList = getState().stars.starsList
    window.localStorage.setItem('starred', JSON.stringify(updatedStarList))
  }
}
