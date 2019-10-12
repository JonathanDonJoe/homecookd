import shave from 'shave';
import './ConversationListItem.css';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import changeConversation from '../../actions/changeConversationAction'

export class ConversationListItem extends Component {
  // useEffect(() => {
  //   shave('.conversation-snippet', 20);
  // })

  changeConversation = ()=> {
    console.log('hello');
    this.props.changeConversation(this.props.data.id)
  }
  render() {
    let imageSrc = `${window.apiHost}/${this.props.data.picture}`
    return (
      <div className="conversation-list-item"
      onClick={this.changeConversation}>
        <img className="conversation-photo" src={imageSrc} alt="conversation" />
        <div className="conversation-info">
          <h1 className="conversation-title">{this.props.data.title}</h1>
          <p className="conversation-snippet">Snippet</p>
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