import React, { Component } from 'react';
import './App.css';

import * as firebase from 'firebase';


class App extends Component {
    constructor() {
        super()

        this.state = {
            text: '10'
        }
    }

    componentDidMount() {

        const rootRef = firebase.database().ref().child('react').child('data').child('user').child('user1');
        rootRef.on('value', snap => {
            console.log(snap)
            this.setState({
                text: snap.val()
            })
        })
    }

    render() {
        return (
            <div className="App">
                <h1>{this.state.text}</h1>
            </div>
        );
    }
}

export default App;
