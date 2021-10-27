import userReducer from './user'
import tokenReducer from './token'

import { combineReducers } from 'redux'

const allReducers = combineReducers({
    user:userReducer,
    token:tokenReducer
})

export default allReducers