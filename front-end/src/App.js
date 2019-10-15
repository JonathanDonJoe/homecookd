import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import Callback from './components/Auth/Callback';
import Dashboard from './components/Dashboard/Dashboard';
import EventCreate from './components/EventCreate/EventCreate';
import EventSearch from './components/EventSearch/EventSearch';
import Event from './components/Event/Event';
import Messenger from './components/Messenger';

function App() {
	return (
		<Router>
			<div className='App'>
				<Route path='/' component={NavBar} />
				<Route exact path='/' component={Home} />
				<Route exact path='/callback' component={Callback} />
				<Route exact path='/dashboard' component={Dashboard} />
				<Route exact path='/host' component={EventCreate} />
				<Route path='/events/search' component={EventSearch} />
				<Route exact path='/Messenger' component={Messenger} />
				<Route exact path='/events/singleEvent/:eventId' component={Event} />
			</div>
		</Router>
	);
}

export default App;
