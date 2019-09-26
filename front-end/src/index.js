import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import * as firebase from 'firebase';
import firebaseConfig from './components/Firebase/firebase';

firebase.initializeApp(firebaseConfig);



ReactDOM.render( 
    <App />
    , 
    document.getElementById('root')
);
