import React, { Component } from 'react';
import api from '../../api';
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';

class Signin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSignup = this.handleSignup.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSignup(e) {
    console.log("why")
    e.preventDefault()
    api.signup(this.state.email, this.state.password)
      .then(result => {
        console.log('SUCCESS!')
        this.props.history.push("/login") // Redirect to the login page
      })
      .catch(err => {
        console.log('ERROR')
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

  render() {
    return (
      <div className="Signin">
        <div className="Signup">
          <h2>Signup</h2>
          <form>
            Email: <input type="text" name="email" value={this.state.email} onChange={this.handleInputChange} /> <br />
            Password: <input type="password" name="password" value={this.state.password} onChange={this.handleInputChange} /> <br />
            <button onClick={this.handleSignup}>Signup</button>
          </form>
        </div>

        <div className="Login">
          <h2>Login</h2>
          <form>
            Email: <input type="text" name="email" value={this.state.email} onChange={this.handleInputChange} /> <br />
            Password: <input type="password"  name="password" value={this.state.password} onChange={this.handleInputChange} /> <br />
            <button onClick={this.handleLogin}>Login</button>
          </form>
        </div>
      </div>
    )
  }
}

export default Signin;
