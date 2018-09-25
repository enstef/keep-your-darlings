import React, { Component } from 'react'
import { Redirect, Link } from "react-router-dom"
import api from "../../api"

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
          <div className="">
            <h1>Keep Your Darlings</h1>
            <p>We want to help you get organized and save money and stuff</p>
            <p>Not yet a member?</p>
            <Link to="/signin">Start</Link>
          </div>
        </div>
      );
    }
  }
}


export default Start;
