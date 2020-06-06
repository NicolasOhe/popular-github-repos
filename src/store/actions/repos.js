import * as actions from './actionTypes'

export const setPopularRepos = (data) => {
  return {
    type: actions.SET_REPOS,
    data,
  }
}

export const setLoading = (value) => {
  return {
    type: actions.SET_LOADING,
    value,
  }
}

export const setError = (value) => {
  return {
    type: actions.SET_ERROR,
    value,
  }
}

export const setSelectedDate = (value) => {
  return {
    type: actions.SET_SELECTED_DATE,
    value,
  }
}

export const setSelectedLanguages = (value) => {
  return {
    type: actions.SET_SELECTED_LANGUAGES,
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
