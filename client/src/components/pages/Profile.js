import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import api from '../../api';

class Profile extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //   }
  // }

  render() {                
    return (
      <div className="Profile onepage">
        <h1>Profile</h1>
        <p>Neat welcome message</p>
        <p>Statistics</p>
        <Link to="/ootd">OOTD</Link> <br/>
        <Link to="/closet">Closet</Link>
      </div>
    );
  }
}

export default Profile;
