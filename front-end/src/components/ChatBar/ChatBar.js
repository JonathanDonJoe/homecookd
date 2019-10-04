import React, { Component } from 'react'
import './ChatBar.css'

export class ChatBar extends Component {
    render() {
        return (
            <div className='container-fluid chat-bar'>
                <div className='row chat-bar-row green'>
                    <div className='col s12 m8 l8'>
                        Contact you events with chat
                    </div>
                    <a className='chat-window-link' href='#openChatWindow'>
                        <div className='col s12 m4 l4'>
                            Chat Pop Up Area
                        </div>
                    </a>
                </div>   
            </div>
        )
    }
}
export default ChatBar