import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import Callback from './components/Auth/Callback';
import ChatBar from './components/ChatBar/ChatBar';
import Dashboard from './components/Dashboard/Dashboard';
import EventCreate from './components/EventCreate/EventCreate';
import Event from './components/Event/Event';

function App() {
    return (
        <Router>
            <div className='App'>
				<Route path='/' component={NavBar} />
				<Route path='/users' component={ChatBar} />
				<Route exact path='/' component={Home} />
				<Route exact path='/callback' component={Callback} />
				<Route exact path='/dashboard' component={Dashboard} />		
				<Route exact path='/host' component={EventCreate} />
				{/* <Route exact path='/events' component={Events} /> */}
				<Route exact path='/events/event' component={Event} />
      		</div>
        </Router>
    );
}

export default App;
