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
import ItemDetail from './pages/ItemDetail';

import { library } from '@fortawesome/fontawesome-svg-core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


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
          <i class="far fa-arrow-alt-circle-right"></i>
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
          <Route path="/item/:id" component={ItemDetail} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}

export default App;


/*

import { Redirect } from 'react-router'

<Route exact path="/" render={() => (
  loggedIn ? (
    <Redirect to="/closet"/>
  ) : (
    <Home/>
  )
)}/>

*/