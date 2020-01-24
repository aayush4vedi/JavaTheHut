import authReducer from './authReducer'
import adventureReducer from './adventureReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: authReducer,
  adventure: adventureReducer
});

export default rootReducer
