import { combineReducers } from 'redux';
import authReducer from './authReducer';
import searchReducer from './searchReducer';
import conversationReducer from './conversationReducer';
import messageReducer from './messageReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    search: searchReducer,
    conversation: conversationReducer,
    refresh: messageReducer
})

export default rootReducer;