import React, { Component } from 'react'
import { Link } from "react-router-dom"
class Home extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //   }
  // }
  render() {
    return (
      <div className="Home">
        <h2>Keep Your Darlings</h2>
        <p>We want to help you get organized and save money and stuff</p>
        <p>Not yet a member?</p>
        <Link to="/Signup">Signup</Link>
      </div>
    );
  }
}

export default Home;
