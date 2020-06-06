import * as actions from '../actions/actionTypes'

const initialState = {
  starsList: [],
  starsInfoList: [],
  loading: false,
  error: false,
}

const starsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.STARS_SET:
      return { ...state, starsList: [...action.data] }
    case actions.STARS_ADD:
      return { ...state, starsList: [...state.starsList, action.fullName] }
    case actions.STARS_REMOVE:
      return {
        ...state,
        starsList: state.starsList.filter((el) => el !== action.fullName),
      }

    case actions.STARS_SET_INFOS:
      return {
        ...state,
        starsInfoList: [...action.data],
      }
    case actions.STARS_ADD_INFO:
      return { ...state, starsInfoList: [...state.starsInfoList, action.info] }
    case actions.STARS_REMOVE_INFO:
      return {
        ...state,
        starsInfoList: state.starsInfoList.filter(
          (el) => el.full_name !== action.fullName
        ),
      }
    case actions.STARS_SET_LOADING:
      return { ...state, loading: action.value }
    case actions.STARS_SET_ERROR:
      return { ...state, error: action.value }
    default:
      return state
  }
}

export default starsReducer
