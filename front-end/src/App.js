import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';


// import * as firebase from 'firebase';


class App extends Component {
    constructor() {
        super()

        this.state = {
            text: '10'
        }
    }

    // componentDidMount() {

    //     const rootRef = firebase.database().ref().child('react').child('data').child('user').child('user2');
    //     console.log(rootRef)
    //     rootRef.on('value', snap => {
    //         console.log(snap.toJSON())
    //         this.setState({
    //             text: snap.val()
    //         })
    //     })
    // }

    render() {
        return (
            <Router>
                <div className="App">
                    <h1>{this.state.text}</h1>
                </div>
            </Router>
        );
    }
}

export default App;
