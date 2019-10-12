import './Compose.css';
import React, { Component } from 'react'

export class Compose extends Component {
  render() {
    return (
      <div className="compose">
        <input
          type="text"
          className="compose-input"
          placeholder="Type a message, @name"
        />
      </div>
    );
  }
}

export default Compose
