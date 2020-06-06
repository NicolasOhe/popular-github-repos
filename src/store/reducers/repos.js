import * as actions from '../actions/actionTypes'

const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

const initialState = {
  list: [],
  register: {},
  loading: false,
  error: false,
  selectedDate: oneWeekAgo,
  selectedLanguages: [],
}

const popularRepos = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_REPOS:
      return { ...state, list: [...state.list, ...action.data] }
    case actions.SET_REPOS:
      return {
        ...state,
        list: [...action.data],
        register: action.data.reduce((acc, cur) => {
          acc[cur.full_name] = cur
          return acc
        }, {}),
      }
    case actions.SET_LOADING:
      return { ...state, loading: action.value }
    case actions.SET_ERROR:
      return { ...state, error: action.value }
    case actions.SET_SELECTED_DATE:
      return { ...state, selectedDate: action.value }
    case actions.SET_SELECTED_LANGUAGES:
      return { ...state, selectedLanguages: action.value }
    default:
      return state
  }
}

export default popularRepos
