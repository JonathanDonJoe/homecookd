import shave from 'shave';
import './ConversationListItem.css';
import React, { Component } from 'react'

export class ConversationListItem extends Component {
  // useEffect(() => {
  //   shave('.conversation-snippet', 20);
  // })
  render() {
    let imageSrc = `${window.apiHost}/${this.props.data.picture}`
    return (
      <div className="conversation-list-item">
        <img className="conversation-photo" src={imageSrc} alt="conversation" />
        <div className="conversation-info">
          <h1 className="conversation-title">{this.props.data.title}</h1>
          <p className="conversation-snippet">Snippet</p>
        </div>
      </div>
    )
  }
}

export default ConversationListItem