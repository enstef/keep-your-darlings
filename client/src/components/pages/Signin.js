import React, { Component } from 'react';
import api from '../../api';
import arrowR from "./../../images/arrow-right.svg"
import arrowL from "./../../images/arrow-left.svg"

// import {
//   Container, Col, Form,
//   FormGroup, Label, Input,
//   Button,
// } from 'reactstrap';

class Signin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      username: "",
      password: "",
      //
      login: false,
      signup: "",
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSignup = this.handleSignup.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.slideRight = this.slideRight.bind(this)
    this.slideLeft = this.slideLeft.bind(this)
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSignup(e) {
    e.preventDefault()
    api.signup(this.state.email, this.state.username, this.state.password)
      .then(result => {
        console.log('SUCCESS!')
      })
      .catch(err => {
        console.log('ERROR')
      })
      .then(result => {
        api.login(this.state.email, this.state.password)
          .then(result => {
            console.log('SUCCESS!')
            this.props.history.push("/profile")
          })
          .catch(err => {
            console.log('ERROR')
          })
      })
  }
  handleLogin(e) {
    e.preventDefault()
    api.login(this.state.email, this.state.password)
      .then(result => {
        console.log('SUCCESS!')
        this.props.history.push("/profile")
      })
      .catch(err => {
        console.log('ERROR')
      })
  }

  slideRight(e) {
    this.setState({
      login: true,
      signup: false
    })
  }
  slideLeft(e) {
    this.setState({
      login: false,
      signup: true,
    })
  }

  render() {
    return (
      <div className="onepage">
        <div className={this.state.login ? "Signin slideRight" : "Signin" && this.state.signup ? "Signin slideLeft" : "Signin"}>

          <div className="Signup">
            <h1>Signup</h1>
            <form>
              Email <input type="text" name="email" value={this.state.email} onChange={this.handleInputChange} />
              Name <input type="text" name="username" value={this.state.username} onChange={this.handleInputChange} />
              Password <input type="password" name="password" value={this.state.password} onChange={this.handleInputChange} />
              <button className="butt" onClick={this.handleSignup}>Signup</button>
            </form>

            <div className="slider">
              <p>Do you already have an acount? <strong>Login</strong> instead!</p>
              <a onClick={this.slideRight}>
                <img className="arrow" src={arrowR} alt="arrow" />
              </a>
            </div>

          </div>

          <div className="Login">
            <h1>Login</h1>
            <form>
              Email <input type="text" name="email" value={this.state.email} onChange={this.handleInputChange} />
              Password <input type="password" name="password" value={this.state.password} onChange={this.handleInputChange} />
              <button className="butt" onClick={this.handleLogin}>Login</button>
            </form>

            <div className="slider">
              <a onClick={this.slideLeft}>
                <img className="arrow" src={arrowL} alt="arrow" />
              </a>
              <p>Back to <strong>Signup</strong>.</p>
            </div>

          </div>

        </div>
      </div>
    )
  }
}

export default Signin;
