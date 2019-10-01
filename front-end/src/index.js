import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reduxPromise from 'redux-promise';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/rootReducer';

// import * as firebase from 'firebase';
// import firebaseConfig from './components/Firebase/firebase';

// firebase.initializeApp(firebaseConfig);

const reduxMiddleware = [reduxPromise]
const store = applyMiddleware(...reduxMiddleware)(createStore)(rootReducer);

ReactDOM.render( 
    <Provider store={store}>
        <App />
    </Provider>
    , 
    document.getElementById('root')
);
