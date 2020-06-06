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

const popularReposReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.REPOS_ADD:
      return { ...state, list: [...state.list, ...action.data] }
    case actions.REPOS_SET:
      return {
        ...state,
        list: [...action.data],
        register: action.data.reduce((acc, cur) => {
          acc[cur.full_name] = cur
          return acc
        }, {}),
      }
    case actions.REPOS_SET_LOADING:
      return { ...state, loading: action.value }
    case actions.REPOS_SET_ERROR:
      return { ...state, error: action.value }
    case actions.REPOS_SET_SELECTED_DATE:
      return { ...state, selectedDate: action.value }
    case actions.REPOS_SET_SELECTED_LANGUAGES:
      return { ...state, selectedLanguages: action.value }
    default:
      return state
  }
}

export default popularReposReducer
