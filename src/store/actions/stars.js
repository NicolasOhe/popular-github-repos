import * as actions from './actionTypes'

const setStarred = (data) => ({ type: actions.STARS_SET, data })
const addStar = (fullName) => ({ type: actions.STARS_ADD, fullName })
const removeStar = (fullName) => ({ type: actions.STARS_REMOVE, fullName })

const setStarredInfos = (data) => ({ type: actions.STARS_SET_INFOS, data })
const addStarInfo = (info) => ({ type: actions.STARS_ADD_INFO, info })
const removeStarInfo = (fullName) => ({
  type: actions.STARS_REMOVE_INFO,
  fullName,
})

const setLoading = (value) => ({ type: actions.STARS_SET_LOADING, value })
const setError = (value) => ({ type: actions.STARS_SET_ERROR, value })

export function initStars() {
  return async (dispatch) => {
    let savedStars
    try {
      const savedStarsString = window.localStorage.getItem('starred')
      savedStars = JSON.parse(savedStarsString)
      dispatch(setStarred(savedStars))
    } catch (err) {
      console.error(
        'Error parsing the starred repos saved in local storage:',
        err
      )
      dispatch(setError(true))
    }

    if (!savedStars) {
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
    } catch (e) {
      console.error(e)
      dispatch(setError(true))
    }
    dispatch(setLoading(false))
  }
}

export const toggleStar = (fullName) => {
  return (dispatch, getState) => {
    const isRemove = getState().stars.starsList.includes(fullName)

    if (isRemove) {
      dispatch(removeStar(fullName))
      dispatch(removeStarInfo(fullName))
    } else {
      dispatch(addStar(fullName))
      const data = getState().repos.register[fullName]
      dispatch(addStarInfo(data))
    }
    const updatedStarList = getState().stars.starsList
    window.localStorage.setItem('starred', JSON.stringify(updatedStarList))
  }
}
