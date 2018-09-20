import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Closet from './pages/Closet';
import AddItem from './pages/AddItem';
import Secret from './pages/Secret';
import Login from './pages/Login';
import Signup from './pages/Signup';
import api from '../api';
import logo from '../logo.svg';
import './App.css';
//import { Navbar, Button } from 'reactstrap'; //<Button color="danger">Danger!</Button>

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: []
    }
    // api.loadUser();
  }

  handleLogoutClick(e) {
    api.logout()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Keep your darlings</h1>
          <Link to="/">Home/Landingpage</Link>
          <Link to="/closet">Countries</Link>
          <Link to="/add-item">Add item</Link>
          {!api.isLoggedIn() && <Link to="/signup">Signup</Link>}
          {!api.isLoggedIn() && <Link to="/login">Start</Link>}
          {api.isLoggedIn() && <Link to="/" onClick={(e) => this.handleLogoutClick(e)}>Logout</Link>}
          <Link to="/secret">Secret</Link>
        </header>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/closet" component={Closet} />
          <Route path="/add-item" component={AddItem} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/secret" component={Secret} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}

export default App;
