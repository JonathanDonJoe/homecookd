import { combineReducers } from 'redux';
import authReducer from './authReducer';
import searchReducer from './searchReducer';
import conversationReducer from './conversationReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    search: searchReducer,
    conversation: conversationReducer
})

export default rootReducer;