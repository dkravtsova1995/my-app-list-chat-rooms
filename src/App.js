import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import RoomsList from './components/RoomsList';
import MessageList from './components/MessageList';
import User from './components/User';
import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDA03YY2qfaeV5bq9RPegkT0GmHO-JB9WQ",
    authDomain: "rooms-935de.firebaseapp.com",
    databaseURL: "https://rooms-935de.firebaseio.com",
    projectId: "rooms-935de",
    storageBucket: "rooms-935de.appspot.com",
    messagingSenderId: "578717852404"
  };
  firebase.initializeApp(config);

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      activeRoom: null,
      user: null
    };
  }

  setActiveRoom(room) {
   this.setState({activeRoom: room});
 }

  setUser(user) {
    this.setState({user: user});
  }

  render() {
    return (
      <div className="App">
        <header>
          <aside id="sidebar">
            <h1 className="App-title">Bloc Chat</h1>
            <RoomsList firebase={firebase} activeRoom={this.state.activeRoom} setActiveRoom={this.setActiveRoom.bind(this)} user={this.state.user}/>
         </aside>
          <MessageList firebase={firebase} activeRoom={this.state.activeRoom} user={this.state.user}/>
        <aside id="sidebar-bottom">
          <User firebase={firebase} setUser={this.setUser.bind(this)} user={this.state.user}/>
        </aside>
        </header>
      </div>
    );
  }
}

export default App;
