import { combineReducers } from 'redux'
import stars from './stars'
import repos from './repos'

export default combineReducers({
  repos,
  stars,
})
