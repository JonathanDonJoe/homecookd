import shave from 'shave';
import './ConversationListItem.css';
import React, { Component } from 'react'

export class ConversationListItem extends Component {
  // useEffect(() => {
  //   shave('.conversation-snippet', 20);
  // })
  render() {
    return (
      <div className="conversation-list-item">
        <img className="conversation-photo" src='' alt="conversation" />
        <div className="conversation-info">
          <h1 className="conversation-title">Convo Title</h1>
          <p className="conversation-snippet">Snippet</p>
        </div>
      </div>
    )
  }
}

export default ConversationListItem