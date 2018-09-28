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
          <p className="welcome">
            To all the fashionistas out there, now you can carry around your closet in your pocket and can plan your outfit for the night up front. You can see what outfit you wore on a specific date & how many times you have worn your favorite leather jacket!
          </p>
          <Link className="standard-link" to="/signin">Start</Link>
        </div>
      );
    }
  }
}


export default Start;
