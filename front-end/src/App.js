import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import Callback from './components/Auth/Callback';
import ChatBar from './components/ChatBar/ChatBar';

function App() {
    return (
        <Router>
            <div className='App'>
				<Route path='/' component={NavBar} />
				<Route path='/' component={ChatBar} />
				<Route exact path='/' component={Home} />
				<Route exact path='/callback' component={Callback} />
				{/* <Route exact path='/events' component={Events} /> */}
				{/* <Route exact path='/login' component={LoginPage} /> */}
				{/* <Route exact path='/register' component={RegisterPage} /> */}
      		</div>
        </Router>
    );
}

export default App;
