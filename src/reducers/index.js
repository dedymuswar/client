import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'
import authReducer from './authReducer'

export default combineReducers({
//    replaceSaya : () => 'okeoke'
    auth: authReducer,
    form: formReducer
})