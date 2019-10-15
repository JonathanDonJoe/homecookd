import ConversationListItem from '../ConversationListItem';
import Toolbar from '../Toolbar';
import './ConversationList.css';

import React, { Component } from 'react'

export class ConversationList extends Component {

  render(){

    console.log(this.props);
    return (
      <div className="conversation-list">
        <Toolbar
          title="Messenger"
        />
        {
          this.props.info.conversations.map(conversation =>
            <ConversationListItem
              key={conversation.id}
              data={conversation}
              messages={this.props.info.messages}
            />
          )
        }
      </div>
    );
  }
}

export default ConversationList
