import { combineReducers } from 'redux'
import todos from './todos'
import repos from './repos'

export default combineReducers({
  repos,
  todos,
})
