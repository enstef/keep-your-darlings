import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Closet from './pages/Closet';
import AddItem from './pages/AddItem';
import Signin from './pages/Signin';
import Profile from "./pages/Profile"
import api from '../api';
import logo from '../logo.svg';

import './App.css';

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
          <Link to="/profile">Profile</Link>
          <Link to="/closet">Closet</Link>
          <Link to="/add-item">Add item</Link>
          {!api.isLoggedIn() && <Link to="/signin">Signin</Link>}
          {api.isLoggedIn() && <Link to="/" onClick={(e) => this.handleLogoutClick(e)}>Logout</Link>}
          <Link to="/secret">Secret</Link>
        </header>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/profile" component={Profile} />
          <Route path="/closet" component={Closet} />
          <Route path="/add-item" component={AddItem} />
          <Route path="/signin" component={Signin} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}

export default App;
