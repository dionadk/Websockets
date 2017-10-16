import React, { Component } from 'react';
import './App.css';

import openSocket from 'socket.io-client'

const socket = openSocket('http://localhost:3001')


class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      messages: []
    }
    this.submitMessage = this.submitMessage.bind(this)
  }

  componentDidMount () {
   socket.on('initial messages', (messages) => {
     this.setState({messages: messages})
   })
   socket.on('chat message', (msg) => {
     this.setState({messages: this.state.messages.concat(msg)})
   })
 }


  submitMessage (e) {
   e.preventDefault()
   let msg = document.getElementById('message').value
   this.setState(
     {messages: this.state.messages.concat(msg)}
   )
   socket.emit('chat message', msg)
   document.getElementById('message').value = ''
 }
  render() {
    let messages = this.state.messages.map((message,i) => (<li key={i}>{message}</li>))
    return (
      <div>
        <ul id='messages'>{messages}</ul>
        <form action='' onSubmit={this.submitMessage}>
          <input id='message' /><button>Send</button>
        </form>
      </div>
    );
  }
}

export default App;
