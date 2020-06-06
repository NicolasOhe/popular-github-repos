import * as actions from './actionTypes'

const setPopularRepos = (data) => {
  return {
    type: actions.REPOS_SET,
    data,
  }
}

const setLoading = (value) => {
  return {
    type: actions.REPOS_SET_LOADING,
    value,
  }
}

const setError = (value) => {
  return {
    type: actions.REPOS_SET_ERROR,
    value,
  }
}

export const setSelectedDate = (value) => {
  return {
    type: actions.REPOS_SET_SELECTED_DATE,
    value,
  }
}

export const setSelectedLanguages = (value) => {
  return {
    type: actions.REPOS_SET_SELECTED_LANGUAGES,
    value,
  }
}

export function fetchPopularRepos() {
  return (dispatch, getState) => {
    dispatch(setLoading(true))
    const { selectedLanguages, selectedDate } = getState().repos
    // YYYY-MM-DD
    const formattedDate = new Date(selectedDate).toISOString().split('T')[0]
    const dateQuery = `created:>${formattedDate}`
    const languagesQuery = selectedLanguages.length
      ? selectedLanguages
          .map((l) => `+language:${encodeURIComponent(l)}`)
          .join('')
      : ''
    const composedURL = `https://api.github.com/search/repositories?q=${dateQuery}${languagesQuery}&sort=stars&order=desc&per_page=20 `

    fetch(composedURL)
      .then((res) => res.json())
      .then((data) => {
        dispatch(setPopularRepos(data.items))
      })
      .catch((e) => dispatch(setError(true)))
      .finally(() => dispatch(setLoading(false)))
  }
}
