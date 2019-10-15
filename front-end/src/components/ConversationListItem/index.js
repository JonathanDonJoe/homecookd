import './ConversationListItem.css';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import changeConversation from '../../actions/changeConversationAction'

export class ConversationListItem extends Component {

  changeConversation = ()=> {
    this.props.changeConversation(this.props.data)
  }
  render() {
    let relevantMessages = this.props.messages.filter((message)=>{
      return message.event_id === this.props.data.id
    })
    let string = ''
    if(relevantMessages.slice(-1)[0]){
      string = relevantMessages.slice(-1)[0].content
      if(string.length> 25){
        string=`${string.substring(0,25)}...`
      } 
    }else{string = "Send the first message!"}
    let imageSrc = `${window.apiHost}/${this.props.data.picture}`
    return (
      <div className="conversation-list-item"
      onClick={this.changeConversation}>
        <img className="conversation-photo" src={imageSrc} alt="conversation" />
        <div className="conversation-info">
          <h1 className="conversation-title">{this.props.data.title}</h1>
          <p className="conversation-snippet">{string}</p>
        </div>
      </div>
    )
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
      changeConversation: changeConversation
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(ConversationListItem);