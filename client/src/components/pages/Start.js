import React, { Component } from 'react'
import { Redirect, Link } from "react-router-dom"
import api from "../../api"
import logo from "../../images/logo-plain.svg"

class Start extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //   }
  // }
  render() {
    if (api.isLoggedIn()) {
      return <Redirect to="/profile" />;
    }
    else {
      return (
        <div className="Start onepage">
          <img className="logo" src={logo} alt="logo" />
          <p className="welcome">We want to help you get organized and save money and stuff. Also we want to help you get organized and save money and stuff. Also we want to help you get organized and save money and stuff.</p>
          <Link className="standard-link" to="/signin">Start</Link>
        </div>
      );
    }
  }
}


export default Start;
