import React, { Component } from 'react';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import api from '../api';

import Start from './pages/Start';
import Closet from './pages/Closet';
import AddItem from './pages/AddItem';
import Signin from './pages/Signin';
import Profile from './pages/Profile';
import ItemDetail from './pages/ItemDetail';
import Ootd from './pages/Ootd';

import menu from "../images/menu.svg"

// import { library } from '@fortawesome/fontawesome-svg-core';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstLoad: true,
      visible: false
    }
    this.showNav = this.showNav.bind(this)
    this.handleNavLinkClick = this.handleNavLinkClick.bind(this)
  }

  showNav(e) {
    this.setState(prev => ({
      firstLoad: false,
      visible: !prev.visible
    }))
  }

  handleLogoutClick(e) {
    this.setState({
      visible: !this.state.visible
    })
    api.logout()
    .then(result => {
      window.location.reload()
    })
  }

  handleNavLinkClick() {
    this.setState({
      visible: !this.state.visible
    })
  }

  render() {
    if (!api.isLoggedIn()) {
      return (
        <div className="App">
          <Switch>
            <Route exact path="/" component={Start} />
            <Route path="/signin" component={Signin} />
            <Route render={() => <Redirect to="/" />} />
          </Switch>
        </div>
      )
    }
    else {
      return (
        <div className="App">
          <a onClick={this.showNav}>
            <img className="navtoggler" src={menu} alt="menu"/>
          </a>
          <nav className={this.state.firstLoad ? "navbar" : (this.state.visible ? "navbar slideOut" : "navbar slideIn")}>
            <Link to="/profile" onClick={this.handleNavLinkClick}>Start</Link>
            <Link to="/closet" onClick={this.handleNavLinkClick}>Closet</Link>
            <Link to="/ootd" onClick={this.handleNavLinkClick}>OOTD</Link>
            <Link className="logout" to="/" onClick={(e) => this.handleLogoutClick(e)}>Logout</Link>
          </nav>
          <Switch>
            <Route exact path="/" component={Start} />
            <Route path="/profile" component={Profile} />
            <Route exact path="/closet" component={Closet} />
            <Route exact path="/closet/item/:_id" component={ItemDetail} />
            <Route path="/add-item" component={AddItem} />
            <Route path="/ootd" component={Ootd} />
            <Route render={() => <Redirect to="/" />} />
          </Switch>
        </div>
      );
    }
  }
}

export default App;
