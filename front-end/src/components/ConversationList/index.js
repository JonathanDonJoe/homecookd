import ConversationSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import axios from 'axios';
import './ConversationList.css';

import React, { Component } from 'react'

export class ConversationList extends Component {
  // [conversations, setConversations] = useState([]);
  // useEffect(() => {
  //   getConversations()
  // },[])

 getConversations = () => {
    axios.get('https://randomuser.me/api/?results=20').then(response => {
        let newConversations = response.data.results.map(result => {
          return {
            photo: result.picture.large,
            name: `${result.name.first} ${result.name.last}`,
            text: 'Hello world! This is a long message that needs to be truncated.'
          };
        });
        // setConversations([...conversations, ...newConversations])
    });
  }
  render(){
    console.log(this.props);
    return (
      <div className="conversation-list">
        <Toolbar
          title="Messenger"
        />
        {
          this.props.conversations.map(conversation =>
            <ConversationListItem
              key={conversation.title}
              data={conversation}
            />
          )
        }
      </div>
    );
  }
}

export default ConversationList
