import React, { Component } from 'react';
import '.././styles/RoomList.css';

class RoomsList extends Component {
  constructor(props){
    super(props);

    this.state = {
      rooms: [],
      newRoomName: ''
    }

    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
     this.roomsRef.on('child_added', snapshot => {
          const room = snapshot.val();
          room.key = snapshot.key;
          this.setState({ rooms: this.state.rooms.concat( room ) })
          if (this.state.rooms.length === 1) { this.props.setActiveRoom(room) }
        });
          this.roomsRef.on('child_removed', snapshot => {
	          this.setState({ rooms: this.state.rooms.filter( room => room.key !== snapshot.key) })
       });
  }

  createRoom(newRoomName) {
    this.roomsRef.push({
      name: newRoomName,
      createdAt: Date.now(),
    });
    this.setState({ newRoomName: '' });
  }

  handleChange(e) {
    this.setState({newRoomName: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.createRoom(this.state.newRoomName);
  }

  render() {
    return (
      <section className="rooms-list">
        {
          this.state.rooms.map(room => {
            return (
              <div key={room.key}>
                <button className="room-name" onClick={ () => this.props.setActiveRoom(room) }>{ room.name }</button>
              </div>
            )
          })
        }
          <form id="create-room" onSubmit={ (e) => { this.handleSubmit(e)} }>
              <input type="text" value={ this.state.newRoomName } onChange={ this.handleChange.bind(this) } name="newRoomName" placeholder="New Room" />
              <input type="submit" value="Submit" />
           </form>
      </section>
    )
  }
}

export default RoomsList;
