import LoginReducer from './Login'
import LogoutReducer from './Logout'
import { combineReducers } from 'redux'

const allReducers = combineReducers({
    LoginReducer
})

export default allReducers;