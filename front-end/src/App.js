import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import Callback from './components/Auth/Callback';

function App() {
    return (
        <Router>
            <div className='App'>
				<Route path='/' component={NavBar} />
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
